import { Visitor } from "../models/index.js";
import { sendSuccess } from "../helpers/response.js";
import { HTTP_STATUS } from "../constants/index.js";
import { AppError } from "../middlewares/error.middleware.js";

const toDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const detectDevice = (req, isMobile) => {
  if (isMobile === true || isMobile === "true") return "mobile";
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  if (/ipad|tablet/.test(ua) && !/mobile/.test(ua)) return "tablet";
  if (/mobi|android|iphone|ipod/.test(ua)) return "mobile";
  return "desktop";
};

const cleanCode = (code) => {
  if (!code) return "XX";
  return String(code).toUpperCase().trim().slice(0, 2);
};

export const trackVisit = async (req, res, next) => {
  try {
    const { path = "/", country, countryCode, referrer = "", screenWidth, isMobile } = req.body || {};

    if (typeof path !== "string" || path.startsWith("/admin")) {
      return sendSuccess(res, { message: "Tracked" });
    }

    const code = cleanCode(countryCode);
    const name = typeof country === "string" && country.trim() ? country.trim() : "Unknown";

    const visitor = await Visitor.create({
      path,
      country: name,
      countryCode: code,
      ip: req.ip || req.headers["x-forwarded-for"] || "",
      referrer: typeof referrer === "string" ? referrer.slice(0, 500) : "",
      userAgent: (req.headers["user-agent"] || "").slice(0, 500),
      device: detectDevice(req, isMobile),
      screenWidth: Number.isFinite(Number(screenWidth)) ? Number(screenWidth) : undefined,
    });

    return sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: "Visit tracked", data: { id: visitor._id } });
  } catch (error) {
    return next(error);
  }
};

const buildWindow = (range, from, to) => {
  const now = new Date();
  const dayStart = startOfDay();

  switch (range) {
    case "today":
      return { start: dayStart, end: now, label: "Today" };
    case "7d":
      return { start: new Date(dayStart.getTime() - 6 * 86400000), end: now, label: "Last 7 days" };
    case "30d":
      return { start: new Date(dayStart.getTime() - 29 * 86400000), end: now, label: "Last 30 days" };
    case "year": {
      const start = new Date(now.getFullYear(), 0, 1);
      return { start, end: now, label: "This year" };
    }
    case "custom": {
      const start = toDate(from);
      const endRaw = toDate(to);
      if (!start || !endRaw) {
        throw new AppError("Both 'from' and 'to' are required for a custom range.", HTTP_STATUS.BAD_REQUEST);
      }
      if (start > endRaw) {
        throw new AppError("'from' must be before 'to'.", HTTP_STATUS.BAD_REQUEST);
      }
      const end = new Date(endRaw);
      if (/^\d{4}-\d{2}-\d{2}$/.test(to)) {
        end.setUTCHours(23, 59, 59, 999);
      }
      return { start, end, label: "Custom range" };
    }
    default:
      return { start: dayStart, end: now, label: "Today" };
  }
};

const fillDays = (map, start, end) => {
  const days = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const key = cursor.toISOString().slice(0, 10);
    days.push({ date: key, label: key, count: map.get(key) || 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
};

const fillMonths = (map, start, end) => {
  const months = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  while (cursor <= end) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
    const label = cursor.toLocaleString("en-US", { month: "short", year: "numeric" });
    months.push({ month: key, label, count: map.get(key) || 0 });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return months;
};

export const getAnalytics = async (req, res, next) => {
  try {
    const { range = "30d", from, to } = req.query;
    const { start, end } = buildWindow(range, from, to);

    const match = { visitedAt: { $gte: start, $lte: end } };

    const [total, today, last7, month, year, daily, monthly, countries] = await Promise.all([
      Visitor.countDocuments(match),
      Visitor.countDocuments({ visitedAt: { $gte: startOfDay() } }),
      Visitor.countDocuments({ visitedAt: { $gte: new Date(Date.now() - 6 * 86400000) } }),
      Visitor.countDocuments({ visitedAt: { $gte: startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1)) } }),
      Visitor.countDocuments({ visitedAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } }),
      Visitor.aggregate([
        { $match: match },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitedAt", timezone: "UTC" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Visitor.aggregate([
        {
          $match: { visitedAt: { $gte: new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1) } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$visitedAt", timezone: "UTC" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Visitor.aggregate([
        { $match: match },
        {
          $group: {
            _id: "$countryCode",
            count: { $sum: 1 },
            name: { $first: "$country" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    const dayMap = new Map(daily.map((d) => [d._id, d.count]));
    const monthMap = new Map(monthly.map((m) => [m._id, m.count]));

    const dailyTraffic = fillDays(dayMap, start, end);
    const monthlyTraffic = fillMonths(
      monthMap,
      new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1),
      new Date()
    );

    const countryStats = countries
      .filter((c) => c._id && c._id !== "XX")
      .map((c) => ({
        code: c._id,
        name: c.name && c.name !== "Unknown" ? c.name : c._id,
        count: c.count,
        percentage: total > 0 ? Number(((c.count / total) * 100).toFixed(1)) : 0,
      }));

    return sendSuccess(res, {
      message: "Analytics fetched successfully",
      data: {
        range,
        period: { start, end, label: `${range === "custom" ? "Custom" : "Selected"} range` },
        summary: {
          total,
          today,
          last7,
          monthly: month,
          yearly: year,
        },
        dailyTraffic,
        monthlyTraffic,
        countries: countryStats,
      },
      meta: { range },
    });
  } catch (error) {
    return next(error);
  }
};

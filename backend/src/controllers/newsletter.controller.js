import Newsletter from "../models/Newsletter.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new AppError("Email is required", HTTP_STATUS.BAD_REQUEST);

    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.isSubscribed) {
        return sendSuccess(res, { message: "Already subscribed" });
      }
      subscriber.isSubscribed = true;
      subscriber.subscribedAt = new Date();
      subscriber.unsubscribedAt = undefined;
      await subscriber.save();
      return sendSuccess(res, { message: "Re-subscribed successfully", data: subscriber });
    }

    subscriber = await Newsletter.create({ email });
    return sendSuccess(res, { message: "Subscribed successfully", data: subscriber, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new AppError("Email is required", HTTP_STATUS.BAD_REQUEST);

    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber || !subscriber.isSubscribed) {
      return sendSuccess(res, { message: "Not subscribed" });
    }

    subscriber.isSubscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return sendSuccess(res, { message: "Unsubscribed successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "-createdAt", subscribed } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const query = {};
    if (subscribed !== undefined) query.isSubscribed = subscribed === "true";

    const [subscribers, total] = await Promise.all([
      Newsletter.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Newsletter.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: subscribers,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscriber = async (req, res, next) => {
  try {
    const sub = await Newsletter.findByIdAndDelete(req.params.id);
    if (!sub) throw new AppError("Subscriber not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Subscriber deleted" });
  } catch (error) {
    next(error);
  }
};

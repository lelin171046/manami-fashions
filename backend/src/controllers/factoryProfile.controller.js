import FactoryProfile from "../models/FactoryProfile.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicProfile = async (req, res, next) => {
  try {
    const profile = await FactoryProfile.findOne().sort("-createdAt");
    return sendSuccess(res, { data: profile || null });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const profile = await FactoryProfile.findOne().sort("-createdAt");
    return sendSuccess(res, { data: profile || null });
  } catch (error) {
    next(error);
  }
};

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    let profile = await FactoryProfile.findOne().sort("-createdAt");

    if (profile) {
      const allowed = [
        "companyName", "businessType", "legalStatus", "yearEstablished",
        "incorporationNumber", "binNumber", "tinNumber", "bgmeaRegistration",
        "directors", "addresses", "contact", "bankInformation",
        "productionCapacity", "machinery", "annualTurnover",
        "certifications", "tags", "factoryImage",
      ];
      allowed.forEach((f) => { if (req.body[f] !== undefined) profile[f] = req.body[f]; });
      await profile.save();
      return sendSuccess(res, { message: "Profile updated", data: profile });
    }

    profile = await FactoryProfile.create(req.body);
    return sendSuccess(res, { message: "Profile created", data: profile, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await FactoryProfile.findOne().sort("-createdAt");
    if (!profile) throw new AppError("No profile found. Create one first.", HTTP_STATUS.NOT_FOUND);

    const allowed = [
      "companyName", "businessType", "legalStatus", "yearEstablished",
      "incorporationNumber", "binNumber", "tinNumber", "bgmeaRegistration",
      "directors", "addresses", "contact", "bankInformation",
      "productionCapacity", "machinery", "annualTurnover",
      "certifications", "tags", "factoryImage",
    ];
    allowed.forEach((f) => { if (req.body[f] !== undefined) profile[f] = req.body[f]; });
    await profile.save();

    return sendSuccess(res, { message: "Profile updated", data: profile });
  } catch (error) {
    next(error);
  }
};

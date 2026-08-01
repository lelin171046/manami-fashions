import mongoose from "mongoose";

const factoryProfileSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      default: "Manami Fashions Ltd.",
    },
    businessType: {
      type: String,
      default: "Garments Manufacturer & Exporter",
    },
    legalStatus: {
      type: String,
      default: "Private Limited Company",
    },
    yearEstablished: {
      type: Number,
      default: 2010,
    },
    incorporationNumber: {
      type: String,
      default: "",
    },
    binNumber: {
      type: String,
      default: "",
    },
    tinNumber: {
      type: String,
      default: "",
    },
    bgmeaRegistration: {
      type: String,
      default: "",
    },
    directors: [
      {
        name: String,
        title: String,
        email: String,
        phone: String,
      },
    ],
    addresses: {
      operational: {
        street: String,
        area: String,
        city: String,
        postalCode: String,
        country: { type: String, default: "Bangladesh" },
      },
      headquarters: {
        street: String,
        area: String,
        city: String,
        postalCode: String,
        country: { type: String, default: "Bangladesh" },
      },
    },
    contact: {
      emails: [String],
      phones: [String],
      website: String,
    },
    bankInformation: {
      bankName: String,
      swiftCode: String,
      accountNumber: String,
      branch: String,
    },
    productionCapacity: {
      dailyOutput: String,
      sewingLines: Number,
      totalEmployees: Number,
      facilitySize: String,
    },
    machinery: {
      totalMachines: Number,
      cuttingTables: Number,
      specialMachines: String,
    },
    annualTurnover: {
      type: String,
      default: "",
    },
    certifications: [String],
    tags: [String],
    factoryImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

factoryProfileSchema.index({ companyName: 1 });

const FactoryProfile = mongoose.model("FactoryProfile", factoryProfileSchema);
export default FactoryProfile;

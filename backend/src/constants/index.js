export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
};

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EDITOR: "editor",
};

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  ARCHIVED: "archived",
};

export const MESSAGE_STATUS = {
  PENDING: "pending",
  READ: "read",
  REPLIED: "replied",
  ARCHIVED: "archived",
};

export const APPLICATION_STATUS = {
  PENDING: "pending",
  REVIEWED: "reviewed",
  SHORTLISTED: "shortlisted",
  HIRED: "hired",
  REJECTED: "rejected",
};

export const CERTIFICATION_TYPES = {
  COMPLIANCE: "compliance",
  QUALITY: "quality",
  SUSTAINABILITY: "sustainability",
};

export const GALLERY_CATEGORIES = {
  FACTORY: "factory",
  TEAM: "team",
  EVENTS: "events",
  PRODUCTION: "production",
};

export const PRODUCT_CATEGORIES = {
  MENSWEAR: "menswear",
  WOMENSWEAR: "womenswear",
  KIDS: "kids",
  ACTIVE_INNERWEAR: "active_innerwear",
};

export const PRODUCT_AUDIENCE = {
  MEN: "men",
  WOMEN: "women",
  KIDS: "kids",
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
};

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_RESUME_SIZE = 50 * 1024 * 1024; // 50MB

export const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

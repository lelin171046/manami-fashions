export const loginValidation = {
  email: {
    required: true,
    type: "email",
    trim: true,
    minLength: 5,
    maxLength: 150,
  },
  password: {
    required: true,
    type: "string",
    minLength: 8,
    maxLength: 128,
  },
};

export const updatePasswordValidation = {
  currentPassword: {
    required: true,
    type: "string",
    minLength: 8,
    maxLength: 128,
  },
  newPassword: {
    required: true,
    type: "string",
    minLength: 8,
    maxLength: 128,
  },
};

const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailRegex =
  /^[^-][a-zA-Z0-9.!#$%&'*+=?^_`{|}~-][^-]{0,}\@[a-zA-Z0-9-]+((\.[a-zA-Z]{2,4})|(\.[a-zA-Z]{2,4}\.[a-zA-Z]{2,3}))$/;

const passwordRegex = /^(?!.*[<>])(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,12}$/;

const nameRegex =
  /^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+(([' -][a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ ])?[a-zA-Zа-яА-Я]*)*$/;

const emailJoiSchema = Joi.string()
  .pattern(emailRegex)
  .min(6)
  .max(63)
  .required()
  .email({
    tlds: {
      deny: ["ru", "su", "рус", "рф"],
    },
  })
  .messages({
    "string.domain": `"wallet not for terrorists: .ru, .su, .рус, .рф, etc`,
  });

const passwordJoiSchema = Joi.string()
  .min(6)
  .max(16)
  .pattern(passwordRegex)
  .required();

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Name is required"],
      maxLength: 12,
    },

    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
      minlength: 10,
      maxLength: 63,
    },
    password: {
      type: String,
      match: passwordRegex,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    balance: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: nameRegex,
  password: passwordJoiSchema,
  email: emailJoiSchema,
});

const verifyEmailSchema = Joi.object({
  email: emailJoiSchema,
});

const loginSchema = Joi.object({
  password: passwordJoiSchema,
  email: emailJoiSchema,
});

const schemas = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
};

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

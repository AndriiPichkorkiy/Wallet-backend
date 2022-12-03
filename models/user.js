const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
      minlength: 6,
      maxLength: 63,
    },
    password: {
      type: String,
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
  name: Joi.string().required(),
  password: Joi.string().min(6).max(16).required(),
  email: Joi.string()
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
    }),
});

const schemas = {
  registerSchema,
  //   loginSchema,
};

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
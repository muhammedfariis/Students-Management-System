import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9.%+_-]+@gmail\.com$/, "only gmail allowed"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 15,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Role",

      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model(
  "authentications",

  registerSchema,
);

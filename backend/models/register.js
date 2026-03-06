import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
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
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Role",

    },
  },
  { timestamps: true },
);

 const Register = mongoose.model("authentications",registerSchema,);
 export default Register
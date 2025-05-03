import mongoose from "mongoose";

const { Schema, model } = mongoose;

const complaineSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentAuth",
      required: true,
    },
    complineType: {
      type: String,
      required: true,
      trim: true,
    },
    ComplaineDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default model("Complaine", complaineSchema);

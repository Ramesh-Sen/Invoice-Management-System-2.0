import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Please provide a customer name"],
    },
    customerNo: {
      type: String,
      required: [true, "Please provide a customer number"],
      unique: true,
    },
    invoiceNo: {
      type: String,
      required: [true, "Please provide a Invoice number"],
      unique: true,
      index: true,
    },
    invoiceAmount: {
      type: Number,
      required: [true, "Please provide a Invoice amount"],
    },
    invoiceDate: {
      type: Date,
      default: new Date("<YYYY-mm-ddTHH:MM:ssZ>"),
      // required: [true, "Please provide a Invoice Date"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please provide a Invoice Due Date"],
    },
    notes: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;

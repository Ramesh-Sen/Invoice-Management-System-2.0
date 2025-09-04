import csv from "csvtojson";
import Invoice from "../models/invoiceModel";
import { connect } from "@/dbConfig/dbconfig";

export default async function invoiceParse(file: string, owner: string) {
  let db: any;
  try {
    console.log(1, file);
    db = await connect();
    const data = await csv().fromFile(file);
    data.map(async (obj) => {
      const invoiceData = await Invoice.create({
        customerName: obj["name_customer"],
        customerNo: obj["cust_number"],
        invoiceNo: Math.round(obj["invoice_id"]),
        invoiceAmount: obj["total_open_amount"],
        invoiceDate: obj["document_create_date"],
        dueDate: obj["due_in_date"],
        owner: owner,
      });
      invoiceData.save();
    });
    return { message: "Data Added in Mongo Db go to /invoice to view" };
  } catch (err: any) {
    return { err: err.message };
  } finally {
    // await db.disconnect();
  }
}

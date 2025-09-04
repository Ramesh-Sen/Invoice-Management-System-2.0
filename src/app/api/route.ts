import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Invoice from "@/models/invoiceModel";
import invoiceParse from "@/util/invoiceParse";

// let db:any;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({ message: "Success" }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Added file");
    console.log(req.headers.get("x-user-id"));
    const OWNER = req.headers.get("x-user-id") || "";
    const file = "public/1806597.csv";
    const res = await invoiceParse(file, OWNER);
    console.log(res);
    return NextResponse.json({ message: res.message }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

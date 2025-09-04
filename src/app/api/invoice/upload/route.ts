import { NextRequest, NextResponse } from "next/server";
import invoiceParse from "@/util/invoiceParse";

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
    const OWNER = req.headers.get("x-user-id") || "";
    console.log(OWNER);
    const file = "public/1806597.csv";
    const res = await invoiceParse(file, OWNER);
    console.log(res);
    return NextResponse.json({ message: res.message }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

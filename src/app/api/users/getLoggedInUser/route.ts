import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

const db = connect();

export async function GET(req: NextRequest) {
  try {
    console.log("Get Logged In User");
    const _id = req.headers.get("x-user-id");
    const loggedInUser = await User.findById(_id).select(
      "-password -refreshToken",
    );

    if (!loggedInUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Logged In User", data: loggedInUser },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

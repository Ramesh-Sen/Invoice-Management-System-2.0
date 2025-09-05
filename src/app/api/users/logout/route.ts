import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { cookies } from "next/headers";

const db = connect();

export async function GET(req: NextRequest) {
  try {
    console.log("Logout User");
    cookies().set({
      name: "accessToken",
      value: "",
      httpOnly: true,
      secure: true,
    });

    cookies().set({
      name: "refreshToken",
      value: "",
      httpOnly: true,
      secure: true,
    });
    const _id = req.headers.get("x-user-id");

    const user = await User.findByIdAndUpdate(
      _id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      },
    ).select("-password -refreshToken");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User Logged Out" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

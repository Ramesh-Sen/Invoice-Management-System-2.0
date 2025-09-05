import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { cookies } from "next/headers";

const db = connect();

export async function POST(req: NextRequest) {
  try {
    console.log("Login User");
    const reqBody = await req.json();

    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await user.isPasswordCorrect(reqBody.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid user credentials" }, { status: 401 });
    }

    const { accessToken, refreshToken } = await user.generateAccessAndRefereshTokens();

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    if (!loggedInUser) {
      return NextResponse.json(
        { message: "User Logged In | Something went wrong while Sending Data" },
        { status: 500 },
      );
    }

    cookies().set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
    });

    cookies().set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
    });

    return NextResponse.json({ message: "User Logged In", data: loggedInUser }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

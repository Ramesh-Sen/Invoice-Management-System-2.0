import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";

const db = connect();

export async function POST(req: NextRequest) {
  try {
    console.log("Sign Up User");
    const reqBody = await req.json();

    const existedUser = await User.findOne({ email: reqBody.email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const newUser = await User.create({ ...reqBody });

    if (!newUser) {
      return NextResponse.json(
        { error: "Something went wrong while registering the user" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "User registered Successfully" },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

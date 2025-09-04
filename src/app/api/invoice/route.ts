import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Invoice from "@/models/invoiceModel";

const db = connect();

export async function GET(req: NextRequest) {
  try {
    console.log("Get Data");
    const _id = req.headers.get("x-user-id");
    console.log(_id);
    const search = req.nextUrl.searchParams.get("id");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    console.log(search);
    if (search) {
      console.log("invoice 1");
      const data = await Invoice.find({
        owner: _id,
        invoiceNo: { $regex: search, $options: "i" },
      })
        .skip(skip)
        .limit(limit)
        .exec();
      const count = await Invoice.countDocuments();
      return NextResponse.json(
        { mssg: "Success", data: data },
        { status: 200 },
      );
    }
    console.log("invoice 2");

    const data = await Invoice.find({ owner: _id }).skip(skip).limit(limit);
    const count = await Invoice.countDocuments();
    return NextResponse.json(
      { mssg: "Success", data: data, totalPages: Math.ceil(count / limit) },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Added Data");
    const reqBody = await req.json();
    const _id = req.headers.get("x-user-id");
    console.log(_id);
    console.log(1, reqBody);
    // const newInvoice = new Invoice({...reqBody ,invoiceDate: new Date("<YYYY-mm-ddTHH:MM:ssZ>")});
    const newInvoice = new Invoice({
      ...reqBody,
      invoiceDate: new Date().toUTCString(),
      owner: _id,
    });
    const savedInvoice = await newInvoice.save();
    return NextResponse.json(
      { message: "Success", data: savedInvoice },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    console.log("Modify Data");
    const reqBody = await req.json();
    console.log(1, reqBody);
    // const newInvoice = new Invoice({...reqBody ,invoiceDate: new Date("<YYYY-mm-ddTHH:MM:ssZ>")});
    // const newInvoice = new Invoice({...reqBody});
    const savedInvoice = await Invoice.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    });
    console.log(2, savedInvoice);
    return NextResponse.json(
      { message: "Success", data: savedInvoice },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("Delete Data");
    const reqBody = await req.json();
    console.log(1, reqBody);
    const deleteInvoice = await Invoice.deleteMany({
      _id: { $in: reqBody._id },
    });
    console.log(deleteInvoice);
    return NextResponse.json(
      { message: "Success", data: deleteInvoice },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import { formatAmount, formatDate } from "@/util/formatUtil";

export async function POST(req: NextRequest) {
  try {
    const { customerName, invoiceNo, dueDate, invoiceAmount } = await req.json();
    const filePath = path.join(process.cwd(), "public", "pdf-template.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const finalHtmlContent = htmlContent
      .replaceAll("[customerName]", customerName)
      .replaceAll("[invoiceNo]", invoiceNo)
      .replaceAll("[dueDate]", formatDate(dueDate))
      .replaceAll("[invoiceAmount]", formatAmount(invoiceAmount));

    const page = await browser.newPage();
    await page.setContent(finalHtmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(new Uint8Array(pdfBuffer).buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${invoiceNo}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("PDF generation failed:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}

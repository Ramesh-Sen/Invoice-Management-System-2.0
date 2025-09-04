import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function verifyAccessToken(
  req: NextRequest,
): Promise<NextResponse> {
  try {
    const accessToken =
      req.cookies.get("accessToken")?.value ||
      req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { _id } = (
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET as string),
      )
    ).payload;

    const res = NextResponse.next();
    res.headers.set("X-User-Id", _id as string);
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { err: err.message || "Invalid access token" },
      { status: 401 },
    );
  }
}

export function middleware(
  req: NextRequest,
): NextResponse | Promise<NextResponse> | void {
  const path = req.nextUrl.pathname;
  const accessToken =
    req.cookies.get("accessToken")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  const isPublicPath =
    path === "/users/login" || path === "/users/signup" || path === "/";

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/invoice", req.nextUrl));
  }

  if (!isPublicPath && !accessToken && !path.includes("/api")) {
    return NextResponse.redirect(new URL("/users/login", req.nextUrl));
  }

  if (
    path.includes("/api/invoice") ||
    path.includes("/api/users/getLoggedInUser")
  ) {
    try {
      return verifyAccessToken(req);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

export const config = {
  matcher: ["/", "/users/login", "/users/signup", "/invoice", "/api/:path*"],
};

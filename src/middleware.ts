import { NextResponse, NextRequest } from "next/server";

const PRIMARY_HOST = "myfuturelinks.com"; // <-- your primary

export function middleware(req: NextRequest) {
  // Only enforce on the production deployment
  if (process.env.VERCEL_ENV !== "production") return NextResponse.next();

  const host = req.headers.get("host") || "";
  // Allow primary + www to pass through; redirect everything else (e.g. *.vercel.app)
  if (host !== PRIMARY_HOST && host !== `www.${PRIMARY_HOST}`) {
    const url = new URL(req.url);
    url.host = PRIMARY_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Skip static assets for performance
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|site.webmanifest).*)"],
};

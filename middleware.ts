import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const Admin = process.env.NEXT_AUTH_ADMIN;

// Admin restriction middleware
export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.email === Admin,
    },
  }
);

export const config = { matcher: ["/admin"] };

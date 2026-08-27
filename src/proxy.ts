import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/sk-portal-secret-994/login",
    },
  }
);

export const config = {
  matcher: ["/sk-portal-secret-994/((?!login).*)"],
};

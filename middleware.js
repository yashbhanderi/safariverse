import { auth } from "@/app/_lib/auth";

export const middleware = auth;

// Only match below routes
export const config = {
  matcher: ["/account"],
};

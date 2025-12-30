import { clerkMiddleware } from "@clerk/nextjs";

// Middleware Clerk requis pour que auth()/useUser fonctionnent correctement.
export default clerkMiddleware();

export const config = {
  // Matcher recommandé par Clerk pour App Router
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};

import { auth, authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
 
export default authMiddleware({
  publicRoutes : ["/api/uploadthing","/api/webhook"],
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
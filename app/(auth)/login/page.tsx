import { LoginForm } from "@/components/dashboard/login-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sign In",
  description: "Sign in to ERP Software to manage projects, inventory, and site operations.",
  path: "/login",
});

export default function LoginPage() {
  return <LoginForm />;
}

import { LoginForm } from "@/components/dashboard/login-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sign In",
  description: "Sign in to Castle Cloud Builders ERP to manage projects, inventory, and site operations.",
  path: "/login",
});

export default function LoginPage() {
  return <LoginForm />;
}

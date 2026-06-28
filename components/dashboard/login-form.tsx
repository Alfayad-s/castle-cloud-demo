"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SignInPage } from "@/components/ui/sign-in";
import { useAuth } from "@/hooks/use-auth";
import { clientTestimonials } from "@/data/testimonials";
import { APP_TAGLINE, DEMO_CREDENTIALS } from "@/lib/constants";
import { COMPANY_NAME } from "@/lib/site-config";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2160&q=80";

export function LoginForm() {
  const router = useRouter();
  const { login, user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const remember = formData.get("rememberMe") === "on";

    const success = await login(email, password, remember);

    if (success) {
      toast.success("Welcome back!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }

    setIsSubmitting(false);
  }

  function handleGoogleSignIn() {
    toast.info("Google sign-in is not enabled in demo mode.");
  }

  function handleResetPassword() {
    toast.info("Password reset is not available in demo mode.");
  }

  function handleCreateAccount() {
    toast.info("Account creation is not available in demo mode.");
  }

  if (authLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading {COMPANY_NAME}...</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <SignInPage
        logo={
          <Image
            src="/logo.svg"
            alt={COMPANY_NAME}
            width={48}
            height={48}
            className="size-12 object-contain"
            priority
          />
        }
        title={
          <span className="font-semibold tracking-tight text-foreground">{COMPANY_NAME}</span>
        }
        description={APP_TAGLINE}
        heroImageSrc={HERO_IMAGE}
        testimonials={clientTestimonials}
        defaultEmail={DEMO_CREDENTIALS.email}
        defaultPassword={DEMO_CREDENTIALS.password}
        isSubmitting={isSubmitting}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
}

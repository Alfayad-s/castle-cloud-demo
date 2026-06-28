"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export type Testimonial = {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
};

export type SignInPageProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  logo?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  defaultEmail?: string;
  defaultPassword?: string;
  isSubmitting?: boolean;
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
};

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z"
      />
    </svg>
  );
}

function GlassInputWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-[#BB913D]/70 focus-within:bg-[#BB913D]/10">
      {children}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-[13.5rem] shrink-0 items-start gap-2.5 rounded-3xl border border-white/20 bg-white/10 p-3.5 shadow-lg backdrop-blur-2xl supports-[backdrop-filter]:bg-white/15">
      <Image
        src={testimonial.avatarSrc}
        alt={testimonial.name}
        width={36}
        height={36}
        className="size-9 shrink-0 rounded-full object-cover ring-1 ring-white/20"
      />
      <div className="min-w-0 text-xs leading-snug">
        <p className="truncate font-semibold text-white">{testimonial.name}</p>
        <p className="truncate text-[10px] text-white/70">{testimonial.handle}</p>
        <p className="mt-1 line-clamp-2 text-[11px] text-white/85">{testimonial.text}</p>
      </div>
    </div>
  );
}

function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  const track = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      <div className="animate-testimonial-marquee flex w-max gap-3 px-4 hover:[animation-play-state:paused]">
        {track.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export function SignInPage({
  title = <span className="font-light tracking-tighter text-foreground">Welcome</span>,
  description = "Access your account and continue your journey with us",
  logo,
  heroImageSrc,
  testimonials = [],
  defaultEmail = "",
  defaultPassword = "",
  isSubmitting = false,
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
}: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-dvh w-dvw flex-col font-sans md:flex-row">
      <section className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {logo ? <div className="animate-element animate-delay-100">{logo}</div> : null}

            <h1 className="animate-element animate-delay-100 text-4xl leading-tight font-semibold md:text-5xl">
              {title}
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">{description}</p>

            <form className="space-y-5" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    defaultValue={defaultEmail}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      defaultValue={defaultPassword}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-2xl bg-transparent p-4 pr-12 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-3 flex items-center"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
                      ) : (
                        <Eye className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    defaultChecked
                    className="custom-checkbox"
                  />
                  <span className="text-foreground/90">Keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={onResetPassword}
                  className="text-[#BB913D] transition-colors hover:underline"
                >
                  Reset password
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="animate-element animate-delay-600 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="animate-element animate-delay-700 relative flex items-center justify-center">
              <span className="w-full border-t border-border" />
              <span className="absolute bg-background px-4 text-sm text-muted-foreground">
                Or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={onGoogleSignIn}
              className="animate-element animate-delay-800 flex w-full items-center justify-center gap-3 rounded-2xl border border-border py-4 transition-colors hover:bg-secondary"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              New to our platform?{" "}
              <button
                type="button"
                onClick={onCreateAccount}
                className="text-[#BB913D] transition-colors hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </section>

      {heroImageSrc ? (
        <section className="relative hidden flex-1 p-4 md:block">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImageSrc})` }}
              role="img"
              aria-label="Construction site"
            />
            {testimonials.length > 0 ? (
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 via-black/25 to-transparent pb-4 pt-10">
                <TestimonialCarousel testimonials={testimonials} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

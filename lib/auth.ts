import type { User } from "@/types";

export const AUTH_COOKIE = "buildmaster-auth";

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Admin User",
    email: "admin@buildmaster.com",
    role: "admin",
    designation: "System Administrator",
  },
  {
    id: "user-002",
    name: "Rajesh Kumar",
    email: "rajesh@buildmaster.com",
    role: "manager",
    designation: "Project Manager",
  },
  {
    id: "user-003",
    name: "Anita Sharma",
    email: "anita@buildmaster.com",
    role: "engineer",
    designation: "Site Engineer",
  },
];

export function authenticate(email: string, password: string): User | null {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "admin@buildmaster.com" && password === "demo123") {
    return mockUsers[0];
  }

  const user = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail);
  if (user && password === "demo123") {
    return user;
  }

  return null;
}

export function serializeUser(user: User): string {
  return JSON.stringify(user);
}

export function parseUser(value: string | undefined): User | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
}

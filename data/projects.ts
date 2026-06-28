import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Luxury Villa",
    location: "Whitefield, Bangalore",
    status: "in-progress",
    budget: 8500000,
    spent: 5120000,
    progress: 62,
    manager: "Rajesh Kumar",
    deadline: "2026-09-15",
    startDate: "2025-11-01",
    description: "Premium 4BHK villa with landscaped garden and smart home integration.",
    engineers: ["Anita Sharma", "Vikram Patel"],
    milestones: [
      { id: "ms-1", name: "Foundation", status: "completed", dueDate: "2025-12-20" },
      { id: "ms-2", name: "Columns", status: "completed", dueDate: "2026-02-10" },
      { id: "ms-3", name: "Roof", status: "in-progress", dueDate: "2026-05-30" },
      { id: "ms-4", name: "Finishing", status: "pending", dueDate: "2026-08-20" },
    ],
  },
  {
    id: "proj-002",
    name: "Commercial Complex",
    location: "HITEC City, Hyderabad",
    status: "in-progress",
    budget: 42000000,
    spent: 18900000,
    progress: 45,
    manager: "Priya Menon",
    deadline: "2027-03-01",
    startDate: "2025-08-15",
    description: "G+8 commercial tower with retail and office spaces.",
    engineers: ["Suresh Reddy", "Meera Iyer"],
    milestones: [
      { id: "ms-5", name: "Foundation", status: "completed", dueDate: "2025-10-30" },
      { id: "ms-6", name: "Structure", status: "in-progress", dueDate: "2026-08-15" },
      { id: "ms-7", name: "MEP", status: "pending", dueDate: "2026-12-01" },
      { id: "ms-8", name: "Handover", status: "pending", dueDate: "2027-02-15" },
    ],
  },
  {
    id: "proj-003",
    name: "Apartment Tower",
    location: "Powai, Mumbai",
    status: "planning",
    budget: 68000000,
    spent: 4200000,
    progress: 8,
    manager: "Arjun Desai",
    deadline: "2028-01-10",
    startDate: "2026-01-05",
    description: "Twin tower residential project with 240 units.",
    engineers: ["Kavita Nair"],
    milestones: [
      { id: "ms-9", name: "Approvals", status: "in-progress", dueDate: "2026-04-01" },
      { id: "ms-10", name: "Foundation", status: "pending", dueDate: "2026-07-15" },
    ],
  },
  {
    id: "proj-004",
    name: "Warehouse Project",
    location: "Sriperumbudur, Chennai",
    status: "completed",
    budget: 12000000,
    spent: 11850000,
    progress: 100,
    manager: "Deepak Singh",
    deadline: "2025-12-01",
    startDate: "2024-06-01",
    description: "50,000 sq.ft logistics warehouse with cold storage zone.",
    engineers: ["Rahul Verma"],
    milestones: [
      { id: "ms-11", name: "Civil Works", status: "completed", dueDate: "2025-03-01" },
      { id: "ms-12", name: "Handover", status: "completed", dueDate: "2025-11-20" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

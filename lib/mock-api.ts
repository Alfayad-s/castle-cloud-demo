export async function mockDelay(ms = 400): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockFetch<T>(data: T, ms = 400): Promise<T> {
  await mockDelay(ms);
  return structuredClone(data);
}

export function mockPaginate<T>(
  items: T[],
  page = 1,
  pageSize = 10,
): { data: T[]; total: number; page: number; pageSize: number; totalPages: number } {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;

  return {
    data: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}

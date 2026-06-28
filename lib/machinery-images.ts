export function getMachineImageSrc(image: string): string {
  return `/images/machinery/${image}`;
}

export function getMachineImageAlt(machine: { name: string; type: string }): string {
  return `${machine.name} — ${machine.type}`;
}

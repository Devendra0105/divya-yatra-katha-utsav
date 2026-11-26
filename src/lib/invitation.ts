export function sanitizeInviteeName(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const cleaned = value
    .normalize("NFC")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const limited = [...cleaned].slice(0, 80).join("");

  return limited || undefined;
}

export function createInvitationLink(name: unknown, baseUrl: string): string | undefined {
  const safeName = sanitizeInviteeName(name);
  if (!safeName) return undefined;

  const base = new URL(baseUrl);
  if (base.protocol !== "http:" && base.protocol !== "https:") {
    throw new Error("Invitation links require an HTTP or HTTPS site address.");
  }

  const inviteUrl = new URL("/invite", base);
  inviteUrl.searchParams.set("to", safeName);
  return inviteUrl.toString();
}

export function createInvitationLinks(names: readonly string[], baseUrl: string): string[] {
  return names.flatMap((name) => {
    const link = createInvitationLink(name, baseUrl);
    return link ? [link] : [];
  });
}
import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/invitation-page";

// Personalised link: /invite?to=GuestName (same single-page invitation as "/").
export const Route = createFileRoute("/invite")({
  component: InvitationPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/invitation-page";

export const Route = createFileRoute("/")({
  component: InvitationPage,
});

import { notFound } from "next/navigation";
import PortalSetupCard from "@/components/tickets/PortalSetupCard";
import TicketDetailShell from "@/components/tickets/TicketDetailShell";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { getTicketById, getTicketWorkspaceData } from "@/lib/tickets/service";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TicketDetailPage({ params }: PageProps) {
  if (!isDatabaseConfigured()) {
    return (
      <PortalSetupCard
        title="Database configuration is still required."
        description="The detail page is ready, including comments, attachments, and execution controls, but it needs a connected Prisma database before tickets can be resolved."
      />
    );
  }

  const { id } = await params;
  const [ticket, workspace] = await Promise.all([
    getTicketById(id),
    getTicketWorkspaceData(),
  ]);

  if (!ticket) {
    notFound();
  }

  return <TicketDetailShell initialTicket={ticket} assignees={workspace.assignees} />;
}

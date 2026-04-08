import PortalSetupCard from "@/components/tickets/PortalSetupCard";
import TicketWorkspace from "@/components/tickets/TicketWorkspace";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { getTicketWorkspaceData } from "@/lib/tickets/service";

export const dynamic = "force-dynamic";

export default async function PortalBoardPage() {
  if (!isDatabaseConfigured()) {
    return (
      <PortalSetupCard
        title="Connect Prisma to unlock the execution board."
        description="The board, filters, comments, and ticket controls are wired to the API layer, but this environment still needs a live database to list and update tickets."
      />
    );
  }

  const workspace = await getTicketWorkspaceData();

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bark">
          Internal dashboard
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-charcoal">
          Simplified execution board for fast-moving teams.
        </h2>
        <p className="mt-4 text-base leading-8 text-stone">
          Review AI-structured requests, assign work, update status, and keep delivery visible without dragging the team into a heavyweight PM tool.
        </p>
      </div>

      <TicketWorkspace initialData={workspace} />
    </div>
  );
}

import TicketCard from "@/components/tickets/TicketCard";
import TicketForm from "@/components/tickets/TicketForm";
import PortalSetupCard from "@/components/tickets/PortalSetupCard";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { getPortalHomeData } from "@/lib/tickets/service";

export const dynamic = "force-dynamic";

const highlights = [
  "Minimal client friction with progressive disclosure",
  "AI-assisted structuring, prioritization, and metadata extraction",
  "One clean handoff into the internal execution board",
];

export default async function PortalPage() {
  if (!isDatabaseConfigured()) {
    return (
      <PortalSetupCard
        title="Connect your database to activate the request portal."
        description="The client-facing form and internal board are fully wired, but this workspace still needs a Prisma database connection before tickets and attachments can be created."
      />
    );
  }

  const { requester, recentTickets } = await getPortalHomeData();

  return (
    <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <div className="rounded-[32px] border border-charcoal/10 bg-charcoal p-8 text-cream shadow-[0_32px_90px_-52px_rgba(44,40,37,0.75)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/55">
            Founder-friendly intake
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            A premium request flow that feels like talking to your dev team.
          </h2>
          <p className="mt-4 text-sm leading-7 text-cream/75">
            The portal keeps the client side intentionally light while still capturing the context the internal team needs to move fast.
          </p>

          <div className="mt-6 space-y-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-tan/70 bg-sand/45 p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bark">
                Recent requests
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-charcoal">
                Latest client handoffs
              </h3>
            </div>
            <p className="text-sm text-stone">
              {requester.company ?? requester.name}
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {recentTickets.length > 0 ? (
              recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} compact />
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-tan/80 bg-cream/80 p-6 text-sm text-stone">
                New requests will appear here once a client starts using the portal.
              </div>
            )}
          </div>
        </div>
      </div>

      <TicketForm requesterLabel={`Submitting as ${requester.company ?? requester.name}`} />
    </div>
  );
}

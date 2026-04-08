import Link from "next/link";
import {
  formatUserLabel,
  getEffectivePriority,
  getInitials,
  ticketPriorityLabels,
  ticketStatusLabels,
  ticketTypeLabels,
  type PortalUserSummary,
  type TicketRecord,
  type TicketStatusValue,
} from "@/lib/tickets/contracts";

type TicketCardProps = {
  ticket: TicketRecord;
  assignees?: PortalUserSummary[];
  compact?: boolean;
  showActions?: boolean;
  onStatusChange?: (ticketId: string, status: TicketStatusValue) => void;
  onAssigneeChange?: (ticketId: string, assigneeId: string | null) => void;
};

const typeTone: Record<string, string> = {
  bug: "border-rose-200 bg-rose-50 text-rose-700",
  feature: "border-sky-200 bg-sky-50 text-sky-700",
  improvement: "border-amber-200 bg-amber-50 text-amber-700",
  design: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
  shopify: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const priorityTone: Record<string, string> = {
  low: "border-slate-200 bg-slate-50 text-slate-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  high: "border-orange-200 bg-orange-50 text-orange-700",
  urgent: "border-rose-200 bg-rose-50 text-rose-700",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default function TicketCard({
  ticket,
  assignees = [],
  compact = false,
  showActions = false,
  onStatusChange,
  onAssigneeChange,
}: TicketCardProps) {
  const effectivePriority = getEffectivePriority(ticket);
  const metadata = ticket.ai.metadata;

  return (
    <article className="rounded-[28px] border border-tan/70 bg-cream p-5 shadow-[0_24px_80px_-46px_rgba(139,115,85,0.38)] transition-all hover:border-charcoal/15 hover:shadow-[0_28px_80px_-44px_rgba(44,40,37,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-charcoal/10 bg-charcoal px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
              {ticket.shortId}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                typeTone[ticket.type]
              }`}
            >
              {ticketTypeLabels[ticket.type]}
            </span>
            {effectivePriority ? (
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  priorityTone[effectivePriority]
                }`}
              >
                {ticketPriorityLabels[effectivePriority]}
                {ticket.priority ? "" : " suggested"}
              </span>
            ) : null}
          </div>

          <div>
            <Link
              href={`/portal/board/${ticket.id}`}
              className="text-xl font-semibold tracking-tight text-charcoal transition-colors hover:text-bark"
            >
              {ticket.title}
            </Link>
            <p className="mt-2 text-sm text-stone">
              {ticket.clientLabel} · Updated {formatDate(ticket.updatedAt)}
            </p>
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-tan/70 bg-sand text-sm font-semibold text-bark">
          {ticket.assignee ? getInitials(ticket.assignee.name) : "T"}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-stone">
        {(ticket.cleanedDescription ?? ticket.description).slice(0, compact ? 150 : 220)}
        {(ticket.cleanedDescription ?? ticket.description).length > (compact ? 150 : 220)
          ? "..."
          : ""}
      </p>

      {!compact && metadata ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {[...metadata.surfaces, ...metadata.flags].slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-tan/70 bg-sand/60 px-3 py-1 text-xs font-medium text-bark"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-stone">
        <span className="rounded-full border border-tan/70 bg-sand/40 px-3 py-1">
          {ticketStatusLabels[ticket.status]}
        </span>
        <span>{ticket.commentsCount} comments</span>
        <span>{ticket.attachments.length} attachments</span>
        <span>{formatUserLabel(ticket.assignee)}</span>
      </div>

      {showActions ? (
        <div className="mt-5 grid gap-3 border-t border-tan/70 pt-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-charcoal">
            <span className="font-medium">Status</span>
            <select
              value={ticket.status}
              onChange={(event) =>
                onStatusChange?.(ticket.id, event.target.value as TicketStatusValue)
              }
              className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm text-charcoal">
            <span className="font-medium">Assignee</span>
            <select
              value={ticket.assignee?.id ?? ""}
              onChange={(event) =>
                onAssigneeChange?.(ticket.id, event.target.value || null)
              }
              className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
            >
              <option value="">Unassigned</option>
              {assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}
    </article>
  );
}

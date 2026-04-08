"use client";

import Link from "next/link";
import { useState } from "react";
import CommentThread from "@/components/tickets/CommentThread";
import {
  getEffectivePriority,
  ticketPriorityLabels,
  ticketStatusLabels,
  ticketTypeLabels,
  type PortalUserSummary,
  type TicketPriorityValue,
  type TicketRecord,
  type TicketStatusValue,
} from "@/lib/tickets/contracts";

type TicketDetailShellProps = {
  initialTicket: TicketRecord;
  assignees: PortalUserSummary[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function TicketDetailShell({
  initialTicket,
  assignees,
}: TicketDetailShellProps) {
  const [ticket, setTicket] = useState(initialTicket);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function patchTicket(payload: {
    status?: TicketStatusValue;
    priority?: TicketPriorityValue | null;
    assigneeId?: string | null;
  }) {
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { ticket?: TicketRecord; error?: string }
        | null;

      if (!response.ok || !data?.ticket) {
        throw new Error(data?.error ?? "Unable to update the ticket right now.");
      }

      setTicket(data.ticket);
    } catch (patchError) {
      setError(
        patchError instanceof Error
          ? patchError.message
          : "Unable to update the ticket right now.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const effectivePriority = getEffectivePriority(ticket);

  return (
    <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
      <div className="space-y-6">
        <div className="rounded-[32px] border border-tan/70 bg-cream p-7 shadow-[0_24px_80px_-42px_rgba(139,115,85,0.35)]">
          <Link
            href="/portal/board"
            className="inline-flex items-center gap-2 text-sm font-medium text-bark transition-colors hover:text-charcoal"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to board
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-charcoal/10 bg-charcoal px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
              {ticket.shortId}
            </span>
            <span className="rounded-full border border-tan/70 bg-sand px-3 py-1 text-xs font-medium text-bark">
              {ticketTypeLabels[ticket.type]}
            </span>
            <span className="rounded-full border border-tan/70 bg-sand px-3 py-1 text-xs font-medium text-bark">
              {ticketStatusLabels[ticket.status]}
            </span>
            {effectivePriority ? (
              <span className="rounded-full border border-warm/30 bg-warm/10 px-3 py-1 text-xs font-medium text-bark">
                {ticketPriorityLabels[effectivePriority]}
                {ticket.priority ? "" : " suggested"}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-charcoal">
            {ticket.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone">
            {ticket.cleanedDescription ?? ticket.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-tan/70 bg-sand/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bark">
                Client
              </p>
              <p className="mt-2 text-lg font-semibold text-charcoal">
                {ticket.clientLabel}
              </p>
              <p className="mt-1 text-sm text-stone">{ticket.requester.email}</p>
            </div>
            <div className="rounded-[24px] border border-tan/70 bg-sand/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bark">
                Timeline
              </p>
              <p className="mt-2 text-sm text-stone">
                Created {formatDate(ticket.createdAt)}
              </p>
              <p className="mt-1 text-sm text-stone">
                Updated {formatDate(ticket.updatedAt)}
              </p>
            </div>
          </div>

          {ticket.additionalContext ? (
            <div className="mt-6 rounded-[24px] border border-tan/70 bg-sand/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bark">
                Additional context
              </p>
              <p className="mt-3 text-sm leading-7 text-stone">
                {ticket.additionalContext}
              </p>
            </div>
          ) : null}

          {ticket.sourceUrl ? (
            <div className="mt-6 rounded-[24px] border border-tan/70 bg-sand/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bark">
                Source URL
              </p>
              <a
                href={ticket.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-bark"
              >
                {ticket.sourceUrl}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M6 10.5v7.5A1.5 1.5 0 0 0 7.5 19.5H15"
                  />
                </svg>
              </a>
            </div>
          ) : null}

          {ticket.attachments.length > 0 ? (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-charcoal">Attachments</p>
                <p className="text-xs uppercase tracking-[0.18em] text-bark">
                  {ticket.attachments.length} files
                </p>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {ticket.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="overflow-hidden rounded-[24px] border border-tan/70 bg-sand/35 transition-all hover:border-charcoal/20 hover:bg-sand"
                  >
                    <div className="aspect-[16/10] bg-sand">
                      <img
                        src={attachment.url}
                        alt={attachment.originalName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="truncate text-sm font-medium text-charcoal">
                        {attachment.originalName}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {ticket.ai.metadata ? (
            <div className="mt-6 rounded-[28px] border border-charcoal/10 bg-charcoal p-6 text-cream">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/60">
                AI enrichment
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {ticket.ai.category ?? "Structured metadata"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-cream/75">
                {ticket.ai.summary ??
                  "This request has been cleaned up and enriched for the internal team."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ...ticket.ai.metadata.surfaces,
                  ...ticket.ai.metadata.platforms,
                  ...ticket.ai.metadata.flags,
                ]
                  .slice(0, 8)
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[30px] border border-tan/70 bg-cream p-6 shadow-[0_24px_80px_-42px_rgba(139,115,85,0.35)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-charcoal">Execution controls</p>
              <p className="mt-1 text-sm text-stone">
                Assign, prioritize, and move the work forward.
              </p>
            </div>
            {isSaving ? (
              <span className="text-sm text-bark">Saving...</span>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Status</span>
              <select
                value={ticket.status}
                onChange={(event) =>
                  patchTicket({
                    status: event.target.value as TicketStatusValue,
                  })
                }
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Priority</span>
              <select
                value={ticket.priority ?? ""}
                onChange={(event) =>
                  patchTicket({
                    priority: (event.target.value || null) as TicketPriorityValue | null,
                  })
                }
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              >
                <option value="">Use AI suggestion</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Assignee</span>
              <select
                value={ticket.assignee?.id ?? ""}
                onChange={(event) =>
                  patchTicket({
                    assigneeId: event.target.value || null,
                  })
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

          {error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
        </div>

        <CommentThread
          ticketId={ticket.id}
          comments={ticket.comments}
          onTicketUpdate={setTicket}
        />
      </div>
    </div>
  );
}

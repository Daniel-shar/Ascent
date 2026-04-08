"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import KanbanBoard from "@/components/tickets/KanbanBoard";
import TicketCard from "@/components/tickets/TicketCard";
import {
  getEffectivePriority,
  ticketPriorityLabels,
  ticketPriorityValues,
  ticketStatusLabels,
  ticketStatusValues,
  ticketTypeLabels,
  ticketTypeValues,
  ticketViewValues,
  type TicketPriorityValue,
  type TicketStatusValue,
  type TicketUpdateInput,
  type TicketViewValue,
  type TicketWorkspaceData,
} from "@/lib/tickets/contracts";

type TicketWorkspaceProps = {
  initialData: TicketWorkspaceData;
};

export default function TicketWorkspace({ initialData }: TicketWorkspaceProps) {
  const [tickets, setTickets] = useState(initialData.tickets);
  const [view, setView] = useState<TicketViewValue>("kanban");
  const [statusFilter, setStatusFilter] = useState<TicketStatusValue | "all">("all");
  const [typeFilter, setTypeFilter] = useState<
    (typeof ticketTypeValues)[number] | "all"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<
    TicketPriorityValue | "all"
  >("all");
  const [clientFilter, setClientFilter] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
      if (typeFilter !== "all" && ticket.type !== typeFilter) return false;
      if (
        priorityFilter !== "all" &&
        getEffectivePriority(ticket) !== priorityFilter
      ) {
        return false;
      }
      if (clientFilter !== "all" && ticket.requester.id !== clientFilter) return false;
      if (!query) return true;

      return [
        ticket.title,
        ticket.description,
        ticket.shortId,
        ticket.clientLabel,
        ticket.ai.category ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [clientFilter, priorityFilter, search, statusFilter, tickets, typeFilter]);

  const stats = useMemo(() => {
    const todo = tickets.filter((ticket) => ticket.status === "todo").length;
    const inProgress = tickets.filter(
      (ticket) => ticket.status === "in_progress",
    ).length;
    const urgent = tickets.filter(
      (ticket) => getEffectivePriority(ticket) === "urgent",
    ).length;

    return {
      total: tickets.length,
      todo,
      inProgress,
      urgent,
    };
  }, [tickets]);

  async function patchTicket(ticketId: string, payload: TicketUpdateInput) {
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | {
            ticket?: (typeof initialData.tickets)[number];
            error?: string;
          }
        | null;

      if (!response.ok || !data?.ticket) {
        throw new Error(data?.error ?? "Unable to update the ticket right now.");
      }

      setTickets((current) =>
        current.map((ticket) => (ticket.id === ticketId ? data.ticket! : ticket)),
      );
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

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          { label: "Total tickets", value: stats.total },
          { label: "Needs triage", value: stats.todo },
          { label: "In progress", value: stats.inProgress },
          { label: "Urgent", value: stats.urgent },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[28px] border border-tan/70 bg-cream p-5 shadow-[0_24px_80px_-46px_rgba(139,115,85,0.35)]"
          >
            <p className="text-sm text-stone">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-charcoal">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[30px] border border-tan/70 bg-cream p-5 shadow-[0_24px_80px_-46px_rgba(139,115,85,0.35)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid flex-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, client, or ID"
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              />
            </label>

            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Status</span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as TicketStatusValue | "all")
                }
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              >
                <option value="all">All statuses</option>
                {ticketStatusValues.map((status) => (
                  <option key={status} value={status}>
                    {ticketStatusLabels[status]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Type</span>
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value as (typeof ticketTypeValues)[number] | "all",
                  )
                }
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              >
                <option value="all">All types</option>
                {ticketTypeValues.map((type) => (
                  <option key={type} value={type}>
                    {ticketTypeLabels[type]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Priority</span>
              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value as TicketPriorityValue | "all")
                }
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              >
                <option value="all">All priorities</option>
                {ticketPriorityValues.map((priority) => (
                  <option key={priority} value={priority}>
                    {ticketPriorityLabels[priority]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-charcoal">
              <span className="font-medium">Client</span>
              <select
                value={clientFilter}
                onChange={(event) => setClientFilter(event.target.value || "all")}
                className="rounded-[18px] border border-tan bg-sand/50 px-4 py-3 text-sm outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
              >
                <option value="all">All clients</option>
                {initialData.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.company ?? client.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="inline-flex rounded-full border border-tan/70 bg-sand p-1">
            {ticketViewValues.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setView(option)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  view === option
                    ? "bg-charcoal text-cream"
                    : "text-bark hover:text-charcoal"
                }`}
              >
                {option === "kanban" ? "Kanban" : "List"}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        {isSaving ? (
          <p className="mt-4 text-sm text-bark">Saving board changes...</p>
        ) : null}
      </div>

      {filteredTickets.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-tan/80 bg-sand/35 p-10 text-center">
          <h3 className="text-xl font-semibold text-charcoal">No tickets match those filters.</h3>
          <p className="mt-2 text-sm text-stone">
            Try broadening the search or clearing a filter.
          </p>
        </div>
      ) : view === "kanban" ? (
        <KanbanBoard
          tickets={filteredTickets}
          assignees={initialData.assignees}
          onStatusChange={(ticketId, status) => patchTicket(ticketId, { status })}
          onAssigneeChange={(ticketId, assigneeId) =>
            patchTicket(ticketId, { assigneeId })
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <TicketCard
                ticket={ticket}
                assignees={initialData.assignees}
                showActions
                onStatusChange={(ticketId, status) => patchTicket(ticketId, { status })}
                onAssigneeChange={(ticketId, assigneeId) =>
                  patchTicket(ticketId, { assigneeId })
                }
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

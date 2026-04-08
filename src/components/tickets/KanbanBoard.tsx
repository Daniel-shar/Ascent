"use client";

import { AnimatePresence, motion } from "framer-motion";
import TicketCard from "@/components/tickets/TicketCard";
import {
  ticketStatusLabels,
  type PortalUserSummary,
  type TicketRecord,
  type TicketStatusValue,
} from "@/lib/tickets/contracts";

type KanbanBoardProps = {
  tickets: TicketRecord[];
  assignees: PortalUserSummary[];
  onStatusChange: (ticketId: string, status: TicketStatusValue) => void;
  onAssigneeChange: (ticketId: string, assigneeId: string | null) => void;
};

const orderedStatuses: TicketStatusValue[] = ["todo", "in_progress", "done"];

export default function KanbanBoard({
  tickets,
  assignees,
  onStatusChange,
  onAssigneeChange,
}: KanbanBoardProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {orderedStatuses.map((status) => {
        const items = tickets.filter((ticket) => ticket.status === status);

        return (
          <section
            key={status}
            className="rounded-[30px] border border-tan/70 bg-sand/35 p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {ticketStatusLabels[status]}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-bark">
                  {items.length} tickets
                </p>
              </div>
              <div className="rounded-full border border-tan/70 bg-cream px-3 py-1 text-xs font-medium text-bark">
                {status.replace("_", " ")}
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {items.length > 0 ? (
                  items.map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                    >
                      <TicketCard
                        ticket={ticket}
                        assignees={assignees}
                        showActions
                        onStatusChange={onStatusChange}
                        onAssigneeChange={onAssigneeChange}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    key={`${status}-empty`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-[24px] border border-dashed border-tan/80 bg-cream/70 p-6 text-sm text-stone"
                  >
                    No tickets in {ticketStatusLabels[status].toLowerCase()}.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        );
      })}
    </div>
  );
}

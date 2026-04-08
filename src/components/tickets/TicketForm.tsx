"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FileUpload from "@/components/tickets/FileUpload";
import {
  ticketPriorityLabels,
  ticketTypeDescriptions,
  ticketTypeLabels,
  ticketTypeValues,
  type AttachmentRecord,
  type TicketPriorityValue,
  type TicketRecord,
  type TicketTypeValue,
} from "@/lib/tickets/contracts";

type TicketFormProps = {
  requesterLabel: string;
};

const priorityOptions: Array<{ value: TicketPriorityValue; label: string }> = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

type FormState = {
  title: string;
  description: string;
  type: TicketTypeValue;
  priority: TicketPriorityValue | "";
  sourceUrl: string;
  needsDesign: boolean;
  additionalContext: string;
};

const initialState: FormState = {
  title: "",
  description: "",
  type: "improvement",
  priority: "",
  sourceUrl: "",
  needsDesign: false,
  additionalContext: "",
};

function getMetadataHighlights(ticket: TicketRecord) {
  const metadata = ticket.ai.metadata;
  if (!metadata) return [];

  return [...metadata.surfaces, ...metadata.flags].slice(0, 4);
}

export default function TicketForm({ requesterLabel }: TicketFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [attachments, setAttachments] = useState<AttachmentRecord[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdTicket, setCreatedTicket] = useState<TicketRecord | null>(null);

  const shouldShowContextFields = useMemo(
    () => showMore || formState.type === "bug" || formState.type === "shopify",
    [formState.type, showMore],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formState.title,
          description: formState.description,
          type: formState.type,
          priority: formState.priority || null,
          sourceUrl: formState.sourceUrl || null,
          needsDesign: formState.needsDesign,
          additionalContext: formState.additionalContext || null,
          attachmentIds: attachments.map((attachment) => attachment.id),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ticket?: TicketRecord; error?: string }
        | null;

      if (!response.ok || !data?.ticket) {
        throw new Error(data?.error ?? "Unable to create your request right now.");
      }

      setCreatedTicket(data.ticket);
      setFormState(initialState);
      setAttachments([]);
      setShowMore(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to create your request right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (createdTicket) {
    const highlights = getMetadataHighlights(createdTicket);

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-tan/70 bg-cream p-8 shadow-[0_28px_80px_-42px_rgba(139,115,85,0.45)]"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-warm/30 bg-warm/10 text-warm">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-bark">
          Request sent
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-charcoal">
          {createdTicket.shortId} is ready for handoff.
        </h3>
        <p className="mt-4 text-sm leading-7 text-stone">
          {createdTicket.ai.summary ??
            "Your request has been structured for the internal team."}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] border border-tan/70 bg-sand/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bark">
              AI category
            </p>
            <p className="mt-2 text-lg font-semibold text-charcoal">
              {createdTicket.ai.category ?? ticketTypeLabels[createdTicket.type]}
            </p>
            <p className="mt-2 text-sm text-stone">
              Suggested priority:{" "}
              {ticketPriorityLabels[
                createdTicket.suggestedPriority ?? createdTicket.priority ?? "medium"
              ]}
            </p>
          </div>

          <div className="rounded-[24px] border border-charcoal/10 bg-charcoal p-5 text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
              Structured metadata
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {highlights.length > 0 ? (
                highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-cream/75">
                  Team-ready summary generated.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setCreatedTicket(null)}
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark"
          >
            Send another request
          </button>
          <Link
            href={`/portal/board/${createdTicket.id}`}
            className="inline-flex items-center justify-center rounded-full border border-tan/70 px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:border-charcoal/20 hover:bg-sand"
          >
            View internal handoff
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-tan/70 bg-cream p-6 shadow-[0_28px_80px_-42px_rgba(139,115,85,0.45)] sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bark">
            Client portal
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-charcoal">
            Send a request like a message.
          </h2>
        </div>
        <div className="rounded-full border border-tan/70 bg-sand px-4 py-2 text-xs font-medium text-bark">
          {requesterLabel}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="ticket-title"
            className="mb-2 block text-sm font-medium text-charcoal"
          >
            Title
          </label>
          <input
            id="ticket-title"
            value={formState.title}
            onChange={(event) =>
              setFormState((current) => ({ ...current, title: event.target.value }))
            }
            required
            placeholder="Checkout button not working on mobile"
            className="w-full rounded-[20px] border border-tan bg-sand/50 px-4 py-3 text-sm text-charcoal placeholder:text-stone/55 outline-none transition-all focus:border-warm focus:bg-cream focus:ring-4 focus:ring-warm/10"
          />
        </div>

        <div>
          <label
            htmlFor="ticket-description"
            className="mb-2 block text-sm font-medium text-charcoal"
          >
            Description
          </label>
          <textarea
            id="ticket-description"
            value={formState.description}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            required
            rows={6}
            placeholder="What happened, what you expected, and anything useful for the team to know."
            className="w-full resize-none rounded-[24px] border border-tan bg-sand/50 px-4 py-3 text-sm text-charcoal placeholder:text-stone/55 outline-none transition-all focus:border-warm focus:bg-cream focus:ring-4 focus:ring-warm/10"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-charcoal">Request type</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {ticketTypeValues.map((type) => {
              const active = formState.type === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormState((current) => ({
                      ...current,
                      type,
                    }))
                  }
                  className={`rounded-[24px] border p-4 text-left transition-all ${
                    active
                      ? "border-charcoal bg-charcoal text-cream shadow-lg shadow-charcoal/10"
                      : "border-tan/70 bg-sand/45 text-charcoal hover:border-warm hover:bg-sand"
                  }`}
                >
                  <p className="text-sm font-semibold">{ticketTypeLabels[type]}</p>
                  <p
                    className={`mt-1 text-sm leading-6 ${
                      active ? "text-cream/75" : "text-stone"
                    }`}
                  >
                    {ticketTypeDescriptions[type]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setFormState((current) => ({
              ...current,
              needsDesign: !current.needsDesign,
            }))
          }
          className={`flex w-full items-center justify-between rounded-[24px] border px-5 py-4 text-left transition-all ${
            formState.needsDesign
              ? "border-charcoal bg-charcoal text-cream"
              : "border-tan/70 bg-sand/45 text-charcoal hover:border-warm hover:bg-sand"
          }`}
        >
          <div>
            <p className="text-sm font-semibold">Do you need design support?</p>
            <p
              className={`mt-1 text-sm ${
                formState.needsDesign ? "text-cream/75" : "text-stone"
              }`}
            >
              Toggle this on when the request also needs UI or creative input.
            </p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
              formState.needsDesign
                ? "bg-cream text-charcoal"
                : "bg-cream text-bark"
            }`}
          >
            {formState.needsDesign ? "Yes" : "No"}
          </span>
        </button>

        <FileUpload
          value={attachments}
          onChange={setAttachments}
          disabled={isSubmitting}
        />

        <button
          type="button"
          onClick={() => setShowMore((current) => !current)}
          className="inline-flex items-center gap-2 text-sm font-medium text-bark transition-colors hover:text-charcoal"
        >
          <span>{showMore ? "Hide extra context" : "Add more context"}</span>
          <svg
            className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {shouldShowContextFields ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-5 rounded-[28px] border border-tan/70 bg-sand/35 p-5">
                <div>
                  <label
                    htmlFor="ticket-source-url"
                    className="mb-2 block text-sm font-medium text-charcoal"
                  >
                    URL or location
                  </label>
                  <input
                    id="ticket-source-url"
                    value={formState.sourceUrl}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        sourceUrl: event.target.value,
                      }))
                    }
                    placeholder="https://brand.com/products/hero-hoodie"
                    className="w-full rounded-[18px] border border-tan bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/55 outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
                  />
                </div>

                {showMore ? (
                  <>
                    <div>
                      <label
                        htmlFor="ticket-priority"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Priority
                      </label>
                      <select
                        id="ticket-priority"
                        value={formState.priority}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            priority: event.target.value as TicketPriorityValue | "",
                          }))
                        }
                        className="w-full rounded-[18px] border border-tan bg-cream px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
                      >
                        <option value="">Let Ascent suggest this</option>
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="ticket-additional-context"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Additional context
                      </label>
                      <textarea
                        id="ticket-additional-context"
                        value={formState.additionalContext}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            additionalContext: event.target.value,
                          }))
                        }
                        rows={4}
                        placeholder="Deadlines, launch context, customer impact, related tickets, or anything else."
                        className="w-full resize-none rounded-[20px] border border-tan bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/55 outline-none transition-all focus:border-warm focus:ring-4 focus:ring-warm/10"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone">
          We automatically clean up the brief, infer urgency, and structure metadata for the team.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark disabled:cursor-not-allowed disabled:bg-charcoal/65"
        >
          {isSubmitting ? "Sending..." : "Send request"}
        </button>
      </div>

      {submitError ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {submitError}
        </p>
      ) : null}
    </form>
  );
}

"use client";

import { useState } from "react";
import { getInitials, type CommentRecord, type TicketRecord } from "@/lib/tickets/contracts";

type CommentThreadProps = {
  ticketId: string;
  comments: CommentRecord[];
  onTicketUpdate: (ticket: TicketRecord) => void;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function CommentThread({
  ticketId,
  comments,
  onTicketUpdate,
}: CommentThreadProps) {
  const [body, setBody] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!body.trim() || isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          isInternal,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ticket?: TicketRecord; error?: string }
        | null;

      if (!response.ok || !data?.ticket) {
        throw new Error(data?.error ?? "Unable to add the comment right now.");
      }

      onTicketUpdate(data.ticket);
      setBody("");
      setIsInternal(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to add the comment right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[30px] border border-tan/70 bg-cream p-6 shadow-[0_24px_80px_-44px_rgba(139,115,85,0.34)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-charcoal">Comment thread</p>
          <p className="mt-1 text-sm text-stone">
            Keep context, decisions, and handoff details in one place.
          </p>
        </div>
        <div className="rounded-full border border-tan/70 bg-sand px-3 py-1 text-xs font-medium text-bark">
          {comments.length} comments
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-[24px] border border-tan/70 bg-sand/35 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-tan/70 bg-cream text-xs font-semibold text-bark">
                  {getInitials(comment.author.name)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-charcoal">
                      {comment.author.name}
                    </p>
                    {comment.isInternal ? (
                      <span className="rounded-full border border-charcoal/10 bg-charcoal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream">
                        Internal
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-stone">
                    {formatDateTime(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone">{comment.body}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-tan/80 bg-sand/35 p-6 text-sm text-stone">
            No comments yet. Leave a quick update for the team.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={4}
          placeholder="Add next steps, implementation notes, or a client-facing update..."
          className="w-full resize-none rounded-[24px] border border-tan bg-sand/45 px-4 py-3 text-sm text-charcoal placeholder:text-stone/55 outline-none transition-all focus:border-warm focus:bg-cream focus:ring-4 focus:ring-warm/10"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setIsInternal((current) => !current)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              isInternal
                ? "border-charcoal bg-charcoal text-cream"
                : "border-tan/70 bg-sand text-bark"
            }`}
          >
            <span
              className={`inline-flex h-2.5 w-2.5 rounded-full ${
                isInternal ? "bg-warm" : "bg-tan"
              }`}
            />
            Internal note
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark disabled:cursor-not-allowed disabled:bg-charcoal/65"
          >
            {isSubmitting ? "Posting..." : "Post comment"}
          </button>
        </div>

        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}

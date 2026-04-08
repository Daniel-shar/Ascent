import { z } from "zod";
import {
  ticketPriorityValues,
  ticketStatusValues,
  ticketTypeValues,
} from "@/lib/tickets/contracts";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : null));

export const createTicketSchema = z.object({
  title: z.string().trim().min(3, "Please add a clear title.").max(140),
  description: z.string().trim().min(10, "Please describe the request.").max(5000),
  type: z.enum(ticketTypeValues),
  priority: z.enum(ticketPriorityValues).nullable().optional(),
  sourceUrl: optionalText(500),
  needsDesign: z.boolean().default(false),
  additionalContext: optionalText(2000),
  attachmentIds: z.array(z.string().cuid()).max(4).default([]),
});

export const updateTicketSchema = z
  .object({
    title: z.string().trim().min(3).max(140).optional(),
    description: z.string().trim().min(10).max(5000).optional(),
    type: z.enum(ticketTypeValues).optional(),
    status: z.enum(ticketStatusValues).optional(),
    priority: z.enum(ticketPriorityValues).nullable().optional(),
    sourceUrl: optionalText(500),
    needsDesign: z.boolean().optional(),
    additionalContext: optionalText(2000),
    assigneeId: z.string().cuid().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Please provide at least one field to update.",
  });

export const createCommentSchema = z.object({
  body: z.string().trim().min(1, "Please add a comment.").max(3000),
  isInternal: z.boolean().optional().default(false),
});

export const ticketQuerySchema = z.object({
  status: z.enum(ticketStatusValues).or(z.literal("all")).optional(),
  type: z.enum(ticketTypeValues).or(z.literal("all")).optional(),
  priority: z.enum(ticketPriorityValues).or(z.literal("all")).optional(),
  client: z.string().trim().min(1).or(z.literal("all")).optional(),
  search: z.string().trim().max(200).optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export function getValidationMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Please review the submitted fields.";
  }

  return error instanceof Error ? error.message : "Something went wrong.";
}

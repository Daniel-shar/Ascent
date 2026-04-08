import { z } from "zod";
import { getOpenAiConfig } from "@/lib/portal-config";
import {
  ticketPriorityLabels,
  ticketPriorityValues,
  ticketTypeLabels,
  type TicketFormInput,
  type TicketMetadata,
  type TicketPriorityValue,
} from "@/lib/tickets/contracts";

type EnrichmentInput = Pick<
  TicketFormInput,
  "title" | "description" | "type" | "sourceUrl" | "needsDesign" | "additionalContext"
> & {
  attachmentCount: number;
};

export type TicketEnrichment = {
  cleanedDescription: string;
  category: string;
  summary: string;
  suggestedPriority: TicketPriorityValue;
  metadata: TicketMetadata;
};

const aiResponseSchema = z.object({
  category: z.string().trim().min(1).max(120),
  summary: z.string().trim().min(1).max(300),
  cleanedDescription: z.string().trim().min(10).max(5000),
  suggestedPriority: z.enum(ticketPriorityValues),
  metadata: z.object({
    issueUrl: z.string().trim().nullable(),
    hasAttachments: z.boolean(),
    needsDesign: z.boolean(),
    surfaces: z.array(z.string().trim().min(1)).max(8),
    platforms: z.array(z.string().trim().min(1)).max(8),
    keywords: z.array(z.string().trim().min(1)).max(12),
    flags: z.array(z.string().trim().min(1)).max(10),
  }),
});

const surfacePatterns: Record<string, RegExp[]> = {
  checkout: [/checkout/i, /payment/i, /cart/i, /order/i],
  storefront: [/homepage/i, /landing page/i, /storefront/i, /home page/i],
  product: [/product page/i, /\bpdp\b/i, /variant/i, /collection/i],
  admin: [/admin/i, /cms/i, /dashboard/i],
  analytics: [/analytics/i, /tracking/i, /pixel/i, /ga4/i, /attribution/i],
  performance: [/slow/i, /lag/i, /performance/i, /loading/i, /speed/i],
  mobile: [/mobile/i, /iphone/i, /android/i, /responsive/i],
};

const platformPatterns: Record<string, RegExp[]> = {
  shopify: [/shopify/i, /liquid/i, /theme/i, /app block/i],
  mobile: [/mobile/i, /iphone/i, /android/i, /responsive/i],
  web: [/browser/i, /chrome/i, /safari/i, /firefox/i, /desktop/i],
  design: [/figma/i, /design/i, /ux/i, /ui/i],
};

const stopWords = new Set([
  "about",
  "after",
  "again",
  "also",
  "been",
  "being",
  "from",
  "have",
  "need",
  "page",
  "please",
  "shopify",
  "that",
  "this",
  "with",
  "would",
]);

function normalizeWhitespace(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function toSentenceCase(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function ensureTerminalPunctuation(value: string) {
  if (!value) return value;
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function extractSignals(text: string, patterns: Record<string, RegExp[]>) {
  return Object.entries(patterns)
    .filter(([, matchers]) => matchers.some((matcher) => matcher.test(text)))
    .map(([label]) => label);
}

function extractKeywords(text: string) {
  return uniqueStrings(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3 && !stopWords.has(word))
      .slice(0, 8),
  );
}

function inferPriority(input: EnrichmentInput, fullText: string) {
  if (
    /cannot purchase|checkout broken|payment failed|orders? failing|site down|production issue/i.test(
      fullText,
    )
  ) {
    return "urgent" as const;
  }

  if (
    /revenue|conversion|broken|error|bug|launch today|launching|blocked|blocker|critical/i.test(
      fullText,
    )
  ) {
    return "high" as const;
  }

  if (input.type === "feature" || input.type === "shopify" || input.needsDesign) {
    return "medium" as const;
  }

  return "low" as const;
}

function buildCategory(input: EnrichmentInput, surfaces: string[]) {
  const primarySurface = surfaces[0];

  if (input.type === "bug" && primarySurface === "checkout") {
    return "Checkout defect";
  }

  if (input.type === "shopify" && input.needsDesign) {
    return "Shopify experience update";
  }

  if (input.type === "design") {
    return "Design support request";
  }

  if (input.type === "feature") {
    return primarySurface ? `${ticketTypeLabels.feature} for ${primarySurface}` : "Feature request";
  }

  return `${ticketTypeLabels[input.type]} request`;
}

function buildCleanedDescription(input: EnrichmentInput) {
  const details = [
    ensureTerminalPunctuation(toSentenceCase(normalizeWhitespace(input.description))),
    input.additionalContext
      ? `Additional context: ${ensureTerminalPunctuation(
          toSentenceCase(normalizeWhitespace(input.additionalContext)),
        )}`
      : null,
    input.sourceUrl ? `Affected URL: ${input.sourceUrl}` : null,
  ].filter(Boolean);

  return details.join("\n\n");
}

function buildSummary(
  input: EnrichmentInput,
  suggestedPriority: TicketPriorityValue,
  surfaces: string[],
) {
  const primarySurface = surfaces[0] ?? input.type;
  return `${ticketTypeLabels[input.type]} request on ${primarySurface} with ${ticketPriorityLabels[suggestedPriority].toLowerCase()} urgency.`;
}

function buildMetadata(input: EnrichmentInput, fullText: string): TicketMetadata {
  const surfaces = extractSignals(fullText, surfacePatterns);
  const platforms = extractSignals(fullText, platformPatterns);
  const flags = uniqueStrings([
    input.attachmentCount > 0 ? "has-screenshots" : "",
    input.needsDesign ? "needs-design" : "",
    /mobile|responsive/i.test(fullText) ? "mobile-impact" : "",
    /conversion|revenue|checkout|payment/i.test(fullText) ? "revenue-risk" : "",
    /launch|deadline|today|tomorrow/i.test(fullText) ? "time-sensitive" : "",
  ]);

  return {
    issueUrl: input.sourceUrl ?? null,
    hasAttachments: input.attachmentCount > 0,
    needsDesign: input.needsDesign,
    surfaces,
    platforms,
    keywords: extractKeywords(`${input.title} ${input.description} ${input.additionalContext ?? ""}`),
    flags,
  };
}

function getHeuristicEnrichment(input: EnrichmentInput): TicketEnrichment {
  const fullText = [
    input.title,
    input.description,
    input.additionalContext ?? "",
    input.sourceUrl ?? "",
  ].join(" ");
  const metadata = buildMetadata(input, fullText);
  const suggestedPriority = inferPriority(input, fullText);

  return {
    cleanedDescription: buildCleanedDescription(input),
    category: buildCategory(input, metadata.surfaces),
    summary: buildSummary(input, suggestedPriority, metadata.surfaces),
    suggestedPriority,
    metadata,
  };
}

async function getOpenAiEnrichment(
  input: EnrichmentInput,
  fallback: TicketEnrichment,
): Promise<TicketEnrichment | null> {
  const config = getOpenAiConfig();

  if (!config) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text:
                "You normalize founder support requests into concise, premium ticket metadata. Return JSON only.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: JSON.stringify({
                title: input.title,
                description: input.description,
                type: input.type,
                sourceUrl: input.sourceUrl,
                needsDesign: input.needsDesign,
                additionalContext: input.additionalContext,
                attachmentCount: input.attachmentCount,
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "ticket_enrichment",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "category",
              "summary",
              "cleanedDescription",
              "suggestedPriority",
              "metadata",
            ],
            properties: {
              category: { type: "string" },
              summary: { type: "string" },
              cleanedDescription: { type: "string" },
              suggestedPriority: {
                type: "string",
                enum: ticketPriorityValues,
              },
              metadata: {
                type: "object",
                additionalProperties: false,
                required: [
                  "issueUrl",
                  "hasAttachments",
                  "needsDesign",
                  "surfaces",
                  "platforms",
                  "keywords",
                  "flags",
                ],
                properties: {
                  issueUrl: { type: ["string", "null"] },
                  hasAttachments: { type: "boolean" },
                  needsDesign: { type: "boolean" },
                  surfaces: { type: "array", items: { type: "string" } },
                  platforms: { type: "array", items: { type: "string" } },
                  keywords: { type: "array", items: { type: "string" } },
                  flags: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { output_text?: string };
  if (!data.output_text) {
    return null;
  }

  const parsed = aiResponseSchema.safeParse(JSON.parse(data.output_text));
  if (!parsed.success) {
    return null;
  }

  return {
    cleanedDescription: parsed.data.cleanedDescription,
    category: parsed.data.category,
    summary: parsed.data.summary,
    suggestedPriority: parsed.data.suggestedPriority,
    metadata: {
      issueUrl: parsed.data.metadata.issueUrl,
      hasAttachments: parsed.data.metadata.hasAttachments,
      needsDesign: parsed.data.metadata.needsDesign,
      surfaces: uniqueStrings(parsed.data.metadata.surfaces).slice(0, 8),
      platforms: uniqueStrings(parsed.data.metadata.platforms).slice(0, 8),
      keywords: uniqueStrings(parsed.data.metadata.keywords).slice(0, 12),
      flags: uniqueStrings(parsed.data.metadata.flags).slice(0, 10),
    },
  };
}

export async function enrichTicket(input: EnrichmentInput) {
  const fallback = getHeuristicEnrichment(input);

  try {
    return (await getOpenAiEnrichment(input, fallback)) ?? fallback;
  } catch {
    return fallback;
  }
}

export const ticketTypeValues = [
  "bug",
  "feature",
  "improvement",
  "design",
  "shopify",
] as const;

export const ticketPriorityValues = [
  "low",
  "medium",
  "high",
  "urgent",
] as const;

export const ticketStatusValues = [
  "todo",
  "in_progress",
  "done",
] as const;

export const ticketViewValues = ["kanban", "list"] as const;

export const userRoleValues = ["client", "internal", "admin"] as const;

export type TicketTypeValue = (typeof ticketTypeValues)[number];
export type TicketPriorityValue = (typeof ticketPriorityValues)[number];
export type TicketStatusValue = (typeof ticketStatusValues)[number];
export type TicketViewValue = (typeof ticketViewValues)[number];
export type UserRoleValue = (typeof userRoleValues)[number];

export type TicketMetadata = {
  issueUrl: string | null;
  hasAttachments: boolean;
  needsDesign: boolean;
  surfaces: string[];
  platforms: string[];
  keywords: string[];
  flags: string[];
};

export type PortalUserSummary = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  avatarUrl: string | null;
  role: UserRoleValue;
};

export type AttachmentRecord = {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: string;
};

export type CommentRecord = {
  id: string;
  body: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
  author: PortalUserSummary;
};

export type TicketAiSummary = {
  category: string | null;
  summary: string | null;
  suggestedPriority: TicketPriorityValue | null;
  metadata: TicketMetadata | null;
};

export type TicketRecord = {
  id: string;
  shortId: string;
  title: string;
  description: string;
  cleanedDescription: string | null;
  additionalContext: string | null;
  sourceUrl: string | null;
  needsDesign: boolean;
  status: TicketStatusValue;
  type: TicketTypeValue;
  priority: TicketPriorityValue | null;
  suggestedPriority: TicketPriorityValue | null;
  clientLabel: string;
  createdAt: string;
  updatedAt: string;
  requester: PortalUserSummary;
  assignee: PortalUserSummary | null;
  attachments: AttachmentRecord[];
  comments: CommentRecord[];
  commentsCount: number;
  ai: TicketAiSummary;
};

export type TicketFormInput = {
  title: string;
  description: string;
  type: TicketTypeValue;
  priority?: TicketPriorityValue | null;
  sourceUrl?: string | null;
  needsDesign: boolean;
  additionalContext?: string | null;
  attachmentIds: string[];
};

export type TicketUpdateInput = {
  title?: string;
  description?: string;
  type?: TicketTypeValue;
  status?: TicketStatusValue;
  priority?: TicketPriorityValue | null;
  sourceUrl?: string | null;
  needsDesign?: boolean;
  additionalContext?: string | null;
  assigneeId?: string | null;
};

export type CommentInput = {
  body: string;
  isInternal?: boolean;
};

export type TicketFilters = {
  status?: TicketStatusValue | "all";
  type?: TicketTypeValue | "all";
  priority?: TicketPriorityValue | "all";
  client?: string | "all";
  search?: string;
  limit?: number;
};

export type TicketWorkspaceData = {
  tickets: TicketRecord[];
  assignees: PortalUserSummary[];
  clients: PortalUserSummary[];
};

export const ticketTypeLabels: Record<TicketTypeValue, string> = {
  bug: "Bug",
  feature: "Feature",
  improvement: "Improvement",
  design: "Design",
  shopify: "Shopify",
};

export const ticketPriorityLabels: Record<TicketPriorityValue, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const ticketStatusLabels: Record<TicketStatusValue, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export const ticketTypeDescriptions: Record<TicketTypeValue, string> = {
  bug: "Fix something broken or inconsistent.",
  feature: "Add new customer-facing or internal capability.",
  improvement: "Polish, optimize, or refine something existing.",
  design: "Creative, UX, or visual design support needed.",
  shopify: "Theme, app, checkout, or storefront work.",
};

export function getEffectivePriority(ticket: Pick<TicketRecord, "priority" | "suggestedPriority">) {
  return ticket.priority ?? ticket.suggestedPriority;
}

export function formatUserLabel(user: PortalUserSummary | null) {
  if (!user) return "Unassigned";
  return user.company ? `${user.name} · ${user.company}` : user.name;
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

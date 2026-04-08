import { randomBytes } from "node:crypto";
import {
  Prisma,
  TicketPriority,
  TicketStatus,
  TicketType,
  UserRole,
} from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  getDemoClientProfile,
  getDemoOperatorProfiles,
  isDatabaseConfigured,
} from "@/lib/portal-config";
import { enrichTicket } from "@/lib/tickets/enrichment";
import type {
  AttachmentRecord,
  CommentInput,
  CommentRecord,
  PortalUserSummary,
  TicketFilters,
  TicketFormInput,
  TicketMetadata,
  TicketPriorityValue,
  TicketRecord,
  TicketStatusValue,
  TicketTypeValue,
  TicketUpdateInput,
  TicketWorkspaceData,
  UserRoleValue,
} from "@/lib/tickets/contracts";

const ticketInclude = Prisma.validator<Prisma.TicketDefaultArgs>()({
  include: {
    requester: true,
    assignee: true,
    attachments: {
      orderBy: {
        createdAt: "asc",
      },
    },
    comments: {
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: true,
      },
    },
  },
});

type TicketWithRelations = Prisma.TicketGetPayload<typeof ticketInclude>;

function assertDatabaseConfigured() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured. Add your Prisma database connection first.");
  }
}

function toUserRoleValue(role: UserRole): UserRoleValue {
  switch (role) {
    case UserRole.ADMIN:
      return "admin";
    case UserRole.INTERNAL:
      return "internal";
    default:
      return "client";
  }
}

function toTicketType(type: TicketType): TicketTypeValue {
  switch (type) {
    case TicketType.BUG:
      return "bug";
    case TicketType.FEATURE:
      return "feature";
    case TicketType.IMPROVEMENT:
      return "improvement";
    case TicketType.DESIGN:
      return "design";
    default:
      return "shopify";
  }
}

function toTicketStatus(status: TicketStatus): TicketStatusValue {
  switch (status) {
    case TicketStatus.IN_PROGRESS:
      return "in_progress";
    case TicketStatus.DONE:
      return "done";
    default:
      return "todo";
  }
}

function toTicketPriority(priority: TicketPriority | null): TicketPriorityValue | null {
  if (!priority) {
    return null;
  }

  switch (priority) {
    case TicketPriority.LOW:
      return "low";
    case TicketPriority.MEDIUM:
      return "medium";
    case TicketPriority.HIGH:
      return "high";
    default:
      return "urgent";
  }
}

function fromTicketType(type: TicketTypeValue): TicketType {
  switch (type) {
    case "bug":
      return TicketType.BUG;
    case "feature":
      return TicketType.FEATURE;
    case "improvement":
      return TicketType.IMPROVEMENT;
    case "design":
      return TicketType.DESIGN;
    default:
      return TicketType.SHOPIFY;
  }
}

function fromTicketStatus(status: TicketStatusValue): TicketStatus {
  switch (status) {
    case "in_progress":
      return TicketStatus.IN_PROGRESS;
    case "done":
      return TicketStatus.DONE;
    default:
      return TicketStatus.TODO;
  }
}

function fromTicketPriority(priority: TicketPriorityValue): TicketPriority {
  switch (priority) {
    case "low":
      return TicketPriority.LOW;
    case "medium":
      return TicketPriority.MEDIUM;
    case "high":
      return TicketPriority.HIGH;
    default:
      return TicketPriority.URGENT;
  }
}

function normalizeNullable(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function getReadableClientLabel(user: { name: string; company: string | null }) {
  return user.company ?? user.name;
}

function serializeUser(user: {
  id: string;
  name: string;
  email: string;
  company: string | null;
  avatarUrl: string | null;
  role: UserRole;
}): PortalUserSummary {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company,
    avatarUrl: user.avatarUrl,
    role: toUserRoleValue(user.role),
  };
}

function serializeAttachment(attachment: {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: Date;
}): AttachmentRecord {
  return {
    id: attachment.id,
    fileName: attachment.fileName,
    originalName: attachment.originalName,
    mimeType: attachment.mimeType,
    sizeBytes: attachment.sizeBytes,
    url: attachment.url,
    createdAt: attachment.createdAt.toISOString(),
  };
}

function serializeComment(comment: {
  id: string;
  body: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
    company: string | null;
    avatarUrl: string | null;
    role: UserRole;
  };
}): CommentRecord {
  return {
    id: comment.id,
    body: comment.body,
    isInternal: comment.isInternal,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
    author: serializeUser(comment.author),
  };
}

function serializeMetadata(value: Prisma.JsonValue | null): TicketMetadata | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const metadata = value as Record<string, unknown>;
  return {
    issueUrl: typeof metadata.issueUrl === "string" ? metadata.issueUrl : null,
    hasAttachments: Boolean(metadata.hasAttachments),
    needsDesign: Boolean(metadata.needsDesign),
    surfaces: Array.isArray(metadata.surfaces)
      ? metadata.surfaces.filter((item): item is string => typeof item === "string")
      : [],
    platforms: Array.isArray(metadata.platforms)
      ? metadata.platforms.filter((item): item is string => typeof item === "string")
      : [],
    keywords: Array.isArray(metadata.keywords)
      ? metadata.keywords.filter((item): item is string => typeof item === "string")
      : [],
    flags: Array.isArray(metadata.flags)
      ? metadata.flags.filter((item): item is string => typeof item === "string")
      : [],
  };
}

function serializeTicket(ticket: TicketWithRelations): TicketRecord {
  return {
    id: ticket.id,
    shortId: ticket.shortId,
    title: ticket.title,
    description: ticket.description,
    cleanedDescription: ticket.cleanedDescription,
    additionalContext: ticket.additionalContext,
    sourceUrl: ticket.sourceUrl,
    needsDesign: ticket.needsDesign,
    status: toTicketStatus(ticket.status),
    type: toTicketType(ticket.type),
    priority: toTicketPriority(ticket.priority),
    suggestedPriority: toTicketPriority(ticket.suggestedPriority),
    clientLabel: ticket.clientLabel ?? getReadableClientLabel(ticket.requester),
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
    requester: serializeUser(ticket.requester),
    assignee: ticket.assignee ? serializeUser(ticket.assignee) : null,
    attachments: ticket.attachments.map(serializeAttachment),
    comments: ticket.comments.map(serializeComment),
    commentsCount: ticket.comments.length,
    ai: {
      category: ticket.aiCategory,
      summary: ticket.aiSummary,
      suggestedPriority: toTicketPriority(ticket.suggestedPriority),
      metadata: serializeMetadata(ticket.aiMetadata),
    },
  };
}

export async function ensurePortalUsers() {
  assertDatabaseConfigured();

  const clientProfile = getDemoClientProfile();
  const operatorProfiles = getDemoOperatorProfiles();

  const requester = await prisma.user.upsert({
    where: {
      email: clientProfile.email,
    },
    update: {
      name: clientProfile.name,
      company: clientProfile.company,
      role: UserRole.CLIENT,
    },
    create: {
      name: clientProfile.name,
      email: clientProfile.email,
      company: clientProfile.company,
      role: UserRole.CLIENT,
    },
  });

  const operators = await Promise.all(
    operatorProfiles.map((operator, index) =>
      prisma.user.upsert({
        where: {
          email: operator.email,
        },
        update: {
          name: operator.name,
          company: operator.company,
          role: index === 0 ? UserRole.ADMIN : UserRole.INTERNAL,
        },
        create: {
          name: operator.name,
          email: operator.email,
          company: operator.company,
          role: index === 0 ? UserRole.ADMIN : UserRole.INTERNAL,
        },
      }),
    ),
  );

  return {
    requester,
    operators,
  };
}

async function createShortId() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const shortId = `ASC-${randomBytes(3).toString("hex").toUpperCase()}`;
    const existing = await prisma.ticket.findUnique({
      where: {
        shortId,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return shortId;
    }
  }

  throw new Error("Unable to allocate a unique ticket ID.");
}

async function getAttachmentConnections(attachmentIds: string[], requesterId: string) {
  if (attachmentIds.length === 0) {
    return [];
  }

  const attachments = await prisma.attachment.findMany({
    where: {
      id: {
        in: attachmentIds,
      },
      uploadedById: requesterId,
      ticketId: null,
    },
    select: {
      id: true,
    },
  });

  return attachments.map((attachment) => ({ id: attachment.id }));
}

function buildTicketWhere(filters: TicketFilters): Prisma.TicketWhereInput {
  const where: Prisma.TicketWhereInput = {};

  if (filters.status && filters.status !== "all") {
    where.status = fromTicketStatus(filters.status);
  }

  if (filters.type && filters.type !== "all") {
    where.type = fromTicketType(filters.type);
  }

  if (filters.priority && filters.priority !== "all") {
    const priority = fromTicketPriority(filters.priority);
    where.OR = [{ priority }, { suggestedPriority: priority }];
  }

  if (filters.client && filters.client !== "all") {
    where.requesterId = filters.client;
  }

  if (filters.search) {
    const search = filters.search.trim();
    where.AND = [
      ...(where.AND ?? []),
      {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            clientLabel: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            shortId: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    ];
  }

  return where;
}

export async function listTickets(filters: TicketFilters = {}) {
  assertDatabaseConfigured();
  await ensurePortalUsers();

  const tickets = await prisma.ticket.findMany({
    where: buildTicketWhere(filters),
    orderBy: {
      updatedAt: "desc",
    },
    take: filters.limit,
    ...ticketInclude,
  });

  return tickets.map(serializeTicket);
}

export async function getTicketById(id: string) {
  assertDatabaseConfigured();
  await ensurePortalUsers();

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    ...ticketInclude,
  });

  return ticket ? serializeTicket(ticket) : null;
}

export async function getTicketWorkspaceData(): Promise<TicketWorkspaceData> {
  assertDatabaseConfigured();
  await ensurePortalUsers();

  const [tickets, assignees, clients] = await Promise.all([
    prisma.ticket.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      ...ticketInclude,
    }),
    prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.ADMIN, UserRole.INTERNAL],
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.user.findMany({
      where: {
        role: UserRole.CLIENT,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return {
    tickets: tickets.map(serializeTicket),
    assignees: assignees.map(serializeUser),
    clients: clients.map(serializeUser),
  };
}

export async function getPortalHomeData() {
  assertDatabaseConfigured();
  const { requester } = await ensurePortalUsers();

  const recentTickets = await prisma.ticket.findMany({
    where: {
      requesterId: requester.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    ...ticketInclude,
  });

  return {
    requester: serializeUser(requester),
    recentTickets: recentTickets.map(serializeTicket),
  };
}

export async function createTicket(input: TicketFormInput) {
  assertDatabaseConfigured();
  const { requester } = await ensurePortalUsers();
  const attachmentConnections = await getAttachmentConnections(input.attachmentIds, requester.id);
  const enrichment = await enrichTicket({
    title: input.title,
    description: input.description,
    type: input.type,
    sourceUrl: normalizeNullable(input.sourceUrl),
    needsDesign: input.needsDesign,
    additionalContext: normalizeNullable(input.additionalContext),
    attachmentCount: attachmentConnections.length,
  });

  const ticket = await prisma.ticket.create({
    data: {
      shortId: await createShortId(),
      title: input.title.trim(),
      description: input.description.trim(),
      cleanedDescription: enrichment.cleanedDescription,
      additionalContext: normalizeNullable(input.additionalContext),
      sourceUrl: normalizeNullable(input.sourceUrl),
      needsDesign: input.needsDesign,
      status: TicketStatus.TODO,
      type: fromTicketType(input.type),
      priority: input.priority ? fromTicketPriority(input.priority) : null,
      suggestedPriority: fromTicketPriority(enrichment.suggestedPriority),
      aiCategory: enrichment.category,
      aiSummary: enrichment.summary,
      aiMetadata: enrichment.metadata as Prisma.InputJsonValue,
      clientLabel: getReadableClientLabel(requester),
      requesterId: requester.id,
      attachments:
        attachmentConnections.length > 0
          ? {
              connect: attachmentConnections,
            }
          : undefined,
    },
    ...ticketInclude,
  });

  return serializeTicket(ticket);
}

export async function updateTicket(id: string, input: TicketUpdateInput) {
  assertDatabaseConfigured();

  const existing = await prisma.ticket.findUnique({
    where: { id },
    ...ticketInclude,
  });

  if (!existing) {
    return null;
  }

  const nextTitle = input.title?.trim() ?? existing.title;
  const nextDescription = input.description?.trim() ?? existing.description;
  const nextType = input.type ?? toTicketType(existing.type);
  const nextSourceUrl =
    input.sourceUrl !== undefined ? normalizeNullable(input.sourceUrl) : existing.sourceUrl;
  const nextNeedsDesign = input.needsDesign ?? existing.needsDesign;
  const nextAdditionalContext =
    input.additionalContext !== undefined
      ? normalizeNullable(input.additionalContext)
      : existing.additionalContext;

  const shouldRefreshEnrichment =
    input.title !== undefined ||
    input.description !== undefined ||
    input.type !== undefined ||
    input.sourceUrl !== undefined ||
    input.needsDesign !== undefined ||
    input.additionalContext !== undefined;

  const enrichment = shouldRefreshEnrichment
    ? await enrichTicket({
        title: nextTitle,
        description: nextDescription,
        type: nextType,
        sourceUrl: nextSourceUrl,
        needsDesign: nextNeedsDesign,
        additionalContext: nextAdditionalContext,
        attachmentCount: existing.attachments.length,
      })
    : null;

  const data: Prisma.TicketUpdateInput = {};

  if (input.title !== undefined) {
    data.title = nextTitle;
  }

  if (input.description !== undefined) {
    data.description = nextDescription;
  }

  if (input.type !== undefined) {
    data.type = fromTicketType(input.type);
  }

  if (input.status !== undefined) {
    data.status = fromTicketStatus(input.status);
  }

  if (input.priority !== undefined) {
    data.priority = input.priority ? fromTicketPriority(input.priority) : null;
  }

  if (input.sourceUrl !== undefined) {
    data.sourceUrl = nextSourceUrl;
  }

  if (input.needsDesign !== undefined) {
    data.needsDesign = input.needsDesign;
  }

  if (input.additionalContext !== undefined) {
    data.additionalContext = nextAdditionalContext;
  }

  if (input.assigneeId !== undefined) {
    data.assignee =
      input.assigneeId === null
        ? { disconnect: true }
        : {
            connect: {
              id: input.assigneeId,
            },
          };
  }

  if (enrichment) {
    data.cleanedDescription = enrichment.cleanedDescription;
    data.aiCategory = enrichment.category;
    data.aiSummary = enrichment.summary;
    data.aiMetadata = enrichment.metadata as Prisma.InputJsonValue;
    data.suggestedPriority = fromTicketPriority(enrichment.suggestedPriority);
  }

  const updated = await prisma.ticket.update({
    where: { id },
    data,
    ...ticketInclude,
  });

  return serializeTicket(updated);
}

export async function createComment(ticketId: string, input: CommentInput) {
  assertDatabaseConfigured();
  const { operators } = await ensurePortalUsers();
  const author = operators[0];

  await prisma.comment.create({
    data: {
      body: input.body.trim(),
      isInternal: input.isInternal ?? false,
      ticketId,
      authorId: author.id,
    },
  });

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    ...ticketInclude,
  });

  return ticket ? serializeTicket(ticket) : null;
}

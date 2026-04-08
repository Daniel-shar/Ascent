import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { createTicket, listTickets } from "@/lib/tickets/service";
import {
  createTicketSchema,
  getValidationMessage,
  ticketQuerySchema,
} from "@/lib/tickets/validation";

export const runtime = "nodejs";

function getDatabaseErrorResponse() {
  return NextResponse.json(
    { error: "DATABASE_URL is not configured yet." },
    { status: 503 },
  );
}

export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return getDatabaseErrorResponse();
  }

  try {
    const filters = ticketQuerySchema.parse({
      status: request.nextUrl.searchParams.get("status") ?? undefined,
      type: request.nextUrl.searchParams.get("type") ?? undefined,
      priority: request.nextUrl.searchParams.get("priority") ?? undefined,
      client: request.nextUrl.searchParams.get("client") ?? undefined,
      search: request.nextUrl.searchParams.get("search") ?? undefined,
      limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    });

    const tickets = await listTickets(filters);
    return NextResponse.json({ tickets });
  } catch (error) {
    return NextResponse.json(
      { error: getValidationMessage(error) },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return getDatabaseErrorResponse();
  }

  try {
    const payload = createTicketSchema.parse(await request.json());
    const ticket = await createTicket(payload);

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getValidationMessage(error) },
      { status: 400 },
    );
  }
}

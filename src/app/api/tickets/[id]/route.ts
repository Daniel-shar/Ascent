import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { getTicketById, updateTicket } from "@/lib/tickets/service";
import { getValidationMessage, updateTicketSchema } from "@/lib/tickets/validation";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getDatabaseErrorResponse() {
  return NextResponse.json(
    { error: "DATABASE_URL is not configured yet." },
    { status: 503 },
  );
}

export async function GET(_: Request, context: RouteContext) {
  if (!isDatabaseConfigured()) {
    return getDatabaseErrorResponse();
  }

  const { id } = await context.params;
  const ticket = await getTicketById(id);

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  }

  return NextResponse.json({ ticket });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!isDatabaseConfigured()) {
    return getDatabaseErrorResponse();
  }

  try {
    const payload = updateTicketSchema.parse(await request.json());
    const { id } = await context.params;
    const ticket = await updateTicket(id, payload);

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    return NextResponse.json(
      { error: getValidationMessage(error) },
      { status: 400 },
    );
  }
}

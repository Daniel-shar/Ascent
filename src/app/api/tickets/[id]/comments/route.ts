import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { createComment } from "@/lib/tickets/service";
import { createCommentSchema, getValidationMessage } from "@/lib/tickets/validation";

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

export async function POST(request: Request, context: RouteContext) {
  if (!isDatabaseConfigured()) {
    return getDatabaseErrorResponse();
  }

  try {
    const payload = createCommentSchema.parse(await request.json());
    const { id } = await context.params;
    const ticket = await createComment(id, payload);

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getValidationMessage(error) },
      { status: 400 },
    );
  }
}

import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/portal-config";
import { storeUploads } from "@/lib/storage";
import { ensurePortalUsers } from "@/lib/tickets/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const files = formData
      .getAll("files")
      .filter((value): value is File => value instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "Please attach at least one file." }, { status: 400 });
    }

    const { requester } = await ensurePortalUsers();
    const attachments = await storeUploads(files, requester.id);

    return NextResponse.json({ attachments }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to upload attachments.",
      },
      { status: 400 },
    );
  }
}

"use client";

type PortalSetupCardProps = {
  title: string;
  description: string;
};

const envVars = [
  "DATABASE_URL",
  "OPENAI_API_KEY (optional)",
  "S3_BUCKET / S3_REGION / S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY (optional)",
];

export default function PortalSetupCard({
  title,
  description,
}: PortalSetupCardProps) {
  return (
    <div className="rounded-[28px] border border-tan/70 bg-sand/70 p-8 shadow-[0_24px_80px_-40px_rgba(139,115,85,0.35)] backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bark">
        Portal setup
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-stone">{description}</p>

      <div className="mt-8 rounded-3xl border border-charcoal/10 bg-cream p-6">
        <p className="text-sm font-medium text-charcoal">Before you open the portal:</p>
        <ul className="mt-4 space-y-3 text-sm text-stone">
          {envVars.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-warm" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-2xl border border-tan/70 bg-sand px-4 py-3 text-sm text-bark">
          After adding your database URL, run `npx prisma db push && npx prisma generate`.
        </p>
      </div>
    </div>
  );
}

const defaultClient = {
  name: "Northstar Labs",
  email: "founder@northstar.test",
  company: "Northstar Labs",
};

const defaultOperators = [
  {
    name: "Daniel Shar",
    email: "daniel@ascent.dev",
    company: "Ascent",
  },
  {
    name: "Mia Chen",
    email: "mia@ascent.dev",
    company: "Ascent",
  },
  {
    name: "Ari Patel",
    email: "ari@ascent.dev",
    company: "Ascent",
  },
] as const;

export const maxAttachmentCount = 4;
export const maxAttachmentSizeBytes = 10 * 1024 * 1024;

function getEnv(name: string) {
  const value = process.env[name];
  return value?.trim() || undefined;
}

export function isDatabaseConfigured() {
  return Boolean(getEnv("DATABASE_URL"));
}

export function getDemoClientProfile() {
  return {
    name: getEnv("PORTAL_CLIENT_NAME") ?? defaultClient.name,
    email: getEnv("PORTAL_CLIENT_EMAIL") ?? defaultClient.email,
    company: getEnv("PORTAL_CLIENT_COMPANY") ?? defaultClient.company,
  };
}

export function getDemoOperatorProfiles() {
  return defaultOperators.map((operator, index) => ({
    name: getEnv(`PORTAL_OPERATOR_${index + 1}_NAME`) ?? operator.name,
    email: getEnv(`PORTAL_OPERATOR_${index + 1}_EMAIL`) ?? operator.email,
    company: getEnv(`PORTAL_OPERATOR_${index + 1}_COMPANY`) ?? operator.company,
  }));
}

export function getOpenAiConfig() {
  const apiKey = getEnv("OPENAI_API_KEY");

  if (!apiKey) {
    return null;
  }

  return {
    apiKey,
    model: getEnv("OPENAI_MODEL") ?? "gpt-4.1-mini",
  };
}

export function getS3Config() {
  const bucket = getEnv("S3_BUCKET");
  const region = getEnv("S3_REGION");
  const accessKeyId = getEnv("S3_ACCESS_KEY_ID");
  const secretAccessKey = getEnv("S3_SECRET_ACCESS_KEY");

  if (!bucket || !region || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return {
    bucket,
    region,
    endpoint: getEnv("S3_ENDPOINT"),
    publicBaseUrl: getEnv("S3_PUBLIC_BASE_URL"),
    forcePathStyle: (getEnv("S3_FORCE_PATH_STYLE") ?? "").toLowerCase() === "true",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  };
}

// Serves /resume.pdf by streaming the PDF from RESUME_SOURCE_URL (S3/CloudFront).
// A dynamic route (not a cached rewrite) so an updated résumé shows immediately —
// Vercel won't pin a stale proxied copy. We still allow a short shared-cache
// window for performance, but the function re-fetches the origin when it expires.
export const dynamic = "force-dynamic";

const RESPONSE_HEADERS = {
  "Content-Type": "application/pdf",
  "Content-Disposition": 'inline; filename="Ajit_Kumar_Resume.pdf"',
  "Cache-Control": "public, max-age=300, must-revalidate",
};

export async function GET() {
  const src = process.env.RESUME_SOURCE_URL;

  if (!src) {
    return new Response("Résumé source is not configured (RESUME_SOURCE_URL).", {
      status: 502,
    });
  }

  const upstream = await fetch(src, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) {
    return new Response("Couldn't fetch the résumé right now.", { status: 502 });
  }

  return new Response(upstream.body, { headers: RESPONSE_HEADERS });
}

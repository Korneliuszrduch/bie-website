import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { X_ROBOTS_TAG_STAGING } from "@/lib/seo";

function configuredSiteEnv(): "staging" | "production" {
  return process.env.SITE_ENV === "production" ? "production" : "staging";
}

function isNowaHost(hostname: string): boolean {
  const host = hostname.toLowerCase().split(":")[0];
  return (
    host === "nowa.bezpieczneinstalacjeelektryczne.pl" ||
    host.startsWith("nowa.")
  );
}

/** Staging is forced on nowa.* even if SITE_ENV was set to production by mistake. */
function isStagingRequest(request: NextRequest): boolean {
  if (isNowaHost(request.nextUrl.hostname)) return true;
  if (isNowaHost(process.env.NEXT_PUBLIC_SITE_URL ?? "")) return true;
  return configuredSiteEnv() === "staging";
}

function basicAuthEnabled(): boolean {
  const flag = (process.env.BASIC_AUTH_ENABLED ?? "false").toLowerCase();
  return flag === "true" || flag === "1" || flag === "yes";
}

function checkBasicAuth(request: NextRequest): boolean {
  const user = process.env.BASIC_AUTH_USER ?? "";
  const password = process.env.BASIC_AUTH_PASSWORD ?? "";
  if (!user || !password) {
    // Fail closed on staging when auth is enabled but credentials are missing.
    return false;
  }
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(":");
    if (sep < 0) return false;
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    return u === user && p === password;
  } catch {
    return false;
  }
}

function withStagingHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", X_ROBOTS_TAG_STAGING);
  response.headers.set("X-Site-Env", "staging");
  return response;
}

export function middleware(request: NextRequest) {
  const staging = isStagingRequest(request);
  const { pathname } = request.nextUrl;

  // Always attach noindex headers on staging (including robots.txt / sitemap).
  const respond = (res: NextResponse) =>
    staging ? withStagingHeaders(res) : res;

  if (staging && basicAuthEnabled()) {
    const bypassAuth =
      pathname === "/robots.txt" || pathname === "/sitemap.xml";

    if (!bypassAuth && !checkBasicAuth(request)) {
      return respond(
        new NextResponse("Authentication required", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="BIE Staging"',
          },
        }),
      );
    }
  }

  return respond(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and image optimization.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};

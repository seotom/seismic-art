import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const cookies = request.cookies.getAll();
  console.log("Middleware cookies:", cookies);

  const accessToken = request.cookies.get("sb-access-token")?.value;
  const refreshToken = request.cookies.get("sb-refresh-token")?.value;
  console.log("Access token from cookie:", accessToken);
  console.log("Refresh token from cookie:", refreshToken);

  let session = null;
  if (accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (error) {
      console.log("Error setting session:", error);
    } else {
      session = data.session;
    }
  }

  console.log("Middleware session:", session);

  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    console.log("No session, redirecting to /admin/login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (session && request.nextUrl.pathname.startsWith("/admin")) {
    const { data: admin, error } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .single();

    console.log("Middleware admin check:", { admin, error });

    if (error || !admin) {
      console.log("Not an admin, redirecting to /admin/login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-supabase-session", JSON.stringify(session));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables for auth.");
}

const findAccessToken = () => {
  const cookieStore = cookies();
  const directToken = cookieStore.get("sb-access-token")?.value;
  if (directToken) {
    return directToken;
  }

  const authTokenCookie = cookieStore
    .getAll()
    .find((cookie) => cookie.name.endsWith("-auth-token"));

  if (!authTokenCookie) {
    return null;
  }

  try {
    const parsed = JSON.parse(authTokenCookie.value) as {
      access_token?: string;
    };
    return parsed.access_token ?? null;
  } catch {
    return null;
  }
};

export const createServerSupabaseClient = () => {
  const accessToken = findAccessToken();
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
  });
};

export const getUserFromCookies = async () => {
  const accessToken = findAccessToken();
  if (!accessToken) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error) {
    return null;
  }

  return data.user;
};

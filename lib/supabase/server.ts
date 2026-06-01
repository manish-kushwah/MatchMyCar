import { createClient } from '@supabase/supabase-js';

// Priority: service role key (bypasses RLS) > anon/publishable key (subject to RLS)
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Warning: Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
  );
}

export const supabaseServer = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

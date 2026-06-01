import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * WARNING: Using placeholder fallback values (e.g., 'https://placeholder.supabase.co') in production is dangerous:
 * 1. Silent Failures: It causes database operations to fail silently or return empty arrays at runtime instead of failing early during build/deployment.
 * 2. Security Risks: Fallback keys or dummy values can bypass validation or lead to leaking config details.
 * 3. Deployment Integrity: Production builds must fail immediately if essential credentials are missing.
 */
if (!supabaseUrl) {
  throw new Error('CRITICAL: NEXT_PUBLIC_SUPABASE_URL environment variable is missing.');
}

if (!supabaseAnonKey) {
  throw new Error('CRITICAL: NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is missing.');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

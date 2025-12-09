import { createClient } from "@refinedev/supabase";

// Credenciais do Supabase - CRM Alma
const SUPABASE_URL = "https://hnuipvspkyhqzvbmeyot.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudWlwdnNwa3locXp2Ym1leW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMDA4ODEsImV4cCI6MjA4MDg3Njg4MX0.yHzFJIJHWjnVrXS56U80Lr3SsI15NfTKQm49tkJFSRA";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

// Exportar constantes para uso em outros lugares se necessário
export { SUPABASE_URL, SUPABASE_ANON_KEY };

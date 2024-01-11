import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qaiyjndqbnhoyivumjze.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaXlqbmRxYm5ob3lpdnVtanplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5NjkwNTMsImV4cCI6MjAyMDU0NTA1M30.kTrRiMU4svjGvtgW5sXzNh8bOoHeF3hiwLRYNuVMdT0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

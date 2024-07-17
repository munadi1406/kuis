import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://mbkrjdzimlemcuyphnla.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia3JqZHppbWxlbWN1eXBobmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NTA1MTgsImV4cCI6MjAyMjMyNjUxOH0.8qjpePe0w0clItrLZFEwOlppzeVigqeAZ1CzNHetxDk"
);

export { supabase as s };

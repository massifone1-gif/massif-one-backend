import { createClient } from "@supabase/supabase-js";
export const env=(n:string)=>{const v=process.env[n];if(!v)throw new Error(`Missing ${n}`);return v;};
export const admin=createClient(env("SUPABASE_URL"),env("SUPABASE_SERVICE_ROLE_KEY"),{auth:{autoRefreshToken:false,persistSession:false}});
export const userClient=(token:string)=>createClient(env("SUPABASE_URL"),env("SUPABASE_ANON_KEY"),{global:{headers:{Authorization:`Bearer ${token}`}},auth:{autoRefreshToken:false,persistSession:false}});

import type {SupabaseClient} from "@supabase/supabase-js";
export async function requireMember(client:SupabaseClient,userId:string,businessId:string){
 const {data,error}=await client.from("business_members").select("business_id,user_id,role").eq("business_id",businessId).eq("user_id",userId).maybeSingle();
 if(error)throw error; if(!data){const e:any=new Error("business_access_denied");e.status=403;throw e;} return data;
}

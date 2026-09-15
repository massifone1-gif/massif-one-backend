import type {Request,Response,NextFunction} from "express";
import {userClient} from "../lib/supabase.js";
declare global {namespace Express {interface Request {auth?:{userId:string;client:ReturnType<typeof userClient>}}}}
export async function requireAuth(req:Request,res:Response,next:NextFunction){
 try{
  const h=req.header("authorization"); if(!h?.startsWith("Bearer ")) return res.status(401).json({error:"missing_bearer_token"});
  const token=h.slice(7).trim(), client=userClient(token), {data,error}=await client.auth.getUser(token);
  if(error||!data.user) return res.status(401).json({error:"invalid_session"});
  req.auth={userId:data.user.id,client}; next();
 }catch(e){next(e);}
}

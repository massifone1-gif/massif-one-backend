import {Router} from "express";import {z} from "zod";import {requireAuth} from "../middleware/auth.js";import {requireMember} from "../lib/business.js";
const r=Router();
r.post("/message",requireAuth,async(req,res,next)=>{try{const b=z.object({business_id:z.string().uuid(),message:z.string().min(1),language:z.enum(["en","fr"]).default("en")}).parse(req.body);await requireMember(req.auth!.client,req.auth!.userId,b.business_id);res.status(501).json({error:"koda_backend_not_connected",message:"Koda server integration is not configured yet."});}catch(e){next(e);}});
for(const kind of ["alerts","tasks","goals"]){r.get(`/${kind}`,requireAuth,async(req,res,next)=>{try{const id=z.string().uuid().parse(req.query.business_id);await requireMember(req.auth!.client,req.auth!.userId,id);const {data,error}=await req.auth!.client.from(`koda_${kind}`).select("*").eq("business_id",id);if(error)throw error;res.json({[kind]:data??[]});}catch(e){next(e);}});}
export default r;

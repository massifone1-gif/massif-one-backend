import {Router} from "express";import {z} from "zod";import {requireAuth} from "../middleware/auth.js";import {requireMember} from "../lib/business.js";
const r=Router();
r.get("/status",requireAuth,async(req,res,next)=>{try{const id=z.string().uuid().parse(req.query.business_id);await requireMember(req.auth!.client,req.auth!.userId,id);res.json({status:"NOT_CONNECTED",configured:false});}catch(e){next(e);}});
r.post("/connect",requireAuth,(_req,res)=>res.status(501).json({error:"whatsapp_backend_not_connected",status:"NOT_CONNECTED"}));
export default r;

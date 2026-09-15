import "dotenv/config";import express from "express";import cors from "cors";import helmet from "helmet";import auth from "./routes/auth.js";import business from "./routes/business.js";import resources from "./routes/resources.js";import koda from "./routes/koda.js";import whatsapp from "./routes/whatsapp.js";import subscriptions from "./routes/subscriptions.js";
const app=express();app.use(helmet());app.use(cors({origin:process.env.CORS_ORIGIN?.split(",").map(x=>x.trim())??true}));app.use(express.json({limit:"1mb"}));
app.get("/health",(_req,res)=>res.json({ok:true,service:"massif-one-backend",version:"1.0.0"}));
app.use("/auth",auth);app.use("/business",business);app.use("/business/:businessId",resources);app.use("/koda",koda);app.use("/whatsapp",whatsapp);app.use("/subscriptions",subscriptions);
app.use((err:any,_req:any,res:any,_next:any)=>{console.error(err);res.status(err?.status??500).json({error:err?.status?String(err.message):"internal_server_error"});});
app.listen(Number(process.env.PORT??8787),()=>console.log("Massif One backend listening"));

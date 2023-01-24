import { Router } from "express";
import { 
    createCertificado,
    deleteCertificado,
    getCertificado,
    getCertificados,
    updateCertificado, 
 } from "../controllers/certificado.controller.js"

 const router = Router();

 // GET all certificates
 router.get("/certificados", getCertificados);

 //GET An Certificate
 router.get("/certificados/:id", getCertificado);

 //DELETE An Certificate
 router.delete("/certificados/:id", deleteCertificado);

 //INSERT An Certificate
 router.post("/certificados", createCertificado);

 router.patch("/certificados/:id", updateCertificado);

 export default router;
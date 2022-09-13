import { Request, Response } from "express";
import { BandInputDTO} from "../model/Band";
import  {BandBusiness}  from "../business/BandBusiness";
 

export class BandController{
    private bandaBusiness: BandBusiness
    constructor(){
        this.bandaBusiness = new BandBusiness()
    }

    public signup =async (req: Request, res: Response)=>{
        try {
            const input: BandInputDTO ={
                
                
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                role: req.body.role
            }

            const token =await this.bandaBusiness.creatBand(input)
            res.status(201).send({ message:"Banda Cadastrada com sucesso!", token})
            
        } catch (error:any) {
            res.status(400).send(error.sqlMessage || error.message)
            
        }
    }
}
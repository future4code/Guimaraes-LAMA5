import { Request, Response } from "express";
import { BandaInputDTO} from "../model/Banda";
import  {BandaBusiness}  from "../business/BandaBusiness";
 

export class BandaController{
    private bandaBusiness: BandaBusiness
    constructor(){
        this.bandaBusiness = new BandaBusiness()
    }

    public signup =async (req: Request, res: Response)=>{
        try {
            const input: BandaInputDTO ={
                
                
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                role: req.body.role
            }

            const token =await this.bandaBusiness.creatBanda(input)
            res.status(201).send({ message:"Banda Cadastrada com sucesso!", token})
            
        } catch (error:any) {
            res.status(400).send(error.sqlMessage || error.message)
            
        }
    }
}
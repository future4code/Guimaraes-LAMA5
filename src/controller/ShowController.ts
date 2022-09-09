import { Request, Response } from "express";
import { ShowInputDTO} from "../model/Show";
import  {ShowBusiness}  from "../business/ShowBusiness";
import {CustomError} from "../error/CustomError"

export class ShowController{
    private showBusiness: ShowBusiness
    constructor(){
        this.showBusiness = new ShowBusiness()
    }

    public signup =async (req: Request, res: Response)=>{
        try {
            const input: ShowInputDTO ={
                
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                role: req.body.role
            }

            const token =await this.showBusiness.creatShow(input)
            res.status(201).send({ message:"Show criado com sucesso!", token})
            
        } catch (error:any) {
            res.status(400).send(error.sqlMessage || error.message)
            
        }
    }
}
import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO,EditUserInputDTO} from "../model/User";
import  {UserBusiness}  from "../business/UserBusiness";
import {CustomError} from "../error/CustomError"

export class UserController{
    private userBusiness: UserBusiness
    constructor(){
        this.userBusiness = new UserBusiness()
    }

    public signup =async (req: Request, res: Response)=>{
        try {
            const input: UserInputDTO ={
                name:req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            }

            const token =await this.userBusiness.creatUser(input)
            res.status(201).send({ message:"Usuário criado com sucesso!", token})
            
        } catch (error:any) {
            res.status(400).send(error.sqlMessage || error.message)
            
        }
    }

    public login =async (req: Request, res: Response) =>{
        try {
            const input: LoginInputDTO ={
                email: req.body.email,
                password: req.body.password,
            }
            const token =await this.userBusiness.login(input)

            res.status(200).send({ message: "Login feito com sucesso",token})
            
        } catch (error:any) {
            res.status(400).send(error.sqlMessage || error.message)
            
        }
    }

    public editUser =async (req: Request, res: Response) =>{
        try {
            const token =req.headers.authorization as string
            const input:EditUserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                id: req.body.id,
            }

            await this.userBusiness.editUser(input, token)
            res.status(200).send({ message: "Usuario Alterado com sucesso"})
            
        } catch (error:any) {
            res.status(400).send(error.sqlMessage || error.message)
            
        }
    }
}
import { BaseDatabase } from "./BaseDatabase";
import { user, EditUserInputDTO} from "../model/User";
import{CustomError} from "../error/CustomError"

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "NOME_TABELAS_USUÁRIOS"
  public insertUser = async (user: user) => {
      try {

          await UserDatabase.connection.insert({
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password

          })
              .into(UserDatabase.TABLE_NAME)

      } catch (error: any) {
          throw new CustomError(400, error.message)

      }
  }

  public getUserByEmail = async (email: string)=> {
      try {
          const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
          .select()
          .where({email})
          return result[0]
      } catch (error:any) {
          throw new CustomError(400, error.message)
          
      }
  }

  public getUserById = async (id:string)=>{
      try {
          const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
          .select()
          .where({id})
          return result[0]
          
      } catch (error: any) {
          throw new CustomError(400, error.message)
          
      }
  }

  public editUser = async( user:EditUserInputDTO) => {
      try {
          await UserDatabase.connection
          .update({name: user.name, emai: user.email})
          .where ({id: user.id})
          .into(UserDatabase.TABLE_NAME)
      } catch (error:any) {
          throw new CustomError(400, error.message)
          
      }
  }

  

}

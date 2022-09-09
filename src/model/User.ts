export type user = {
   id: string
   email: string
   password: string
   name: string
   role: string

}
export interface UserInputDTO {
   name: string,
   email: string,
   password: string,
   role: string

}

export interface EditUserInputDTO {
   name: string,
   email: string,
   id: string
}

export interface EditUserInput {
   name: string,
   email: string,
   id: string
}

export interface LoginInputDTO {
   email: string,
   password: string
}

export enum UserRole {
   NORMAL = "NORMAL",
   ADMIN = "ADMIN"
}
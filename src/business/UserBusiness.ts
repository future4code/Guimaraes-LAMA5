import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import { CustomError, InvalidPassword, UserNotFound, Unauthorized } from "../error/CustomError";
import { user, EditUserInputDTO, EditUserInput } from "../model/User";
import { AuthenticationData } from "../model/type";

export class UserBusiness {
    private userDB: UserDatabase
    constructor() {
        this.userDB = new UserDatabase()
    }

    public creatUser = async (input: UserInputDTO) => {
        let { name, email, password, role } = input

        if (!name || !email || !password || !role) {
            throw new CustomError(422, "Falta de Parâmetro")
        }

        if (password.length < 6) {
            throw new InvalidPassword()

        }

        if (role !== "NORMAL" && role !== "ADMIN") {
            return "NORMAL"
        }



        const id = IdGenerator.generateId()
        const hash = await HashManager.generateHash(password)

        const user: user = {
            id,
            name,
            email,
            password: hash,
            role

        }

        await this.userDB.insertUser(user)
        const token = Authenticator.generateToken({ id, role })
        return token

    }

    public login = async (input: LoginInputDTO) => {
        let { email, password } = input

        if (!email || !password) {
            throw new CustomError(400, "Por favor preencher todos os campos")

        }

        const user = await this.userDB.getUserByEmail(email)
        const hashCompare = await HashManager.compareHash(password, user.password)

        if (!hashCompare) {
            throw new InvalidPassword()
        }

        const payload: AuthenticationData = {
            id: user.id,
            role: user.role
        }

        const token = Authenticator.generateToken(payload)
        return token

    }

    public editUser = async (input: EditUserInputDTO, token: string) => {
        let { name, email, id } = input

        if (!name || !email || !id) {
            throw new CustomError(422, "Ausencia de parâmetros")
        }
        const userExist = await this.userDB.getUserById(id)
        if (!userExist) {
            throw new UserNotFound()
        }

        const tokenData = Authenticator.getTokenData(token)
        if (tokenData.role !== "ADMIN") {
            throw new Unauthorized()
        }

        const editUser: EditUserInput = {
            name,
            email,
            id
        }
        await this.userDB.editUser(editUser)
    }
}


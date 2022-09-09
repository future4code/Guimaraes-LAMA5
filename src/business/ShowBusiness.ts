
import { ShowDatabase } from "../data/ShowDatabase";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import { CustomError, ShowNotFound, Unauthorized } from "../error/CustomError";
import { show, EditShowInputDTO, EditShowInput, ShowInputDTO } from "../model/Show";


export class ShowBusiness {
    private showDB: ShowDatabase
    constructor() {
        this.showDB = new ShowDatabase()
    }

    public creatShow = async (input: ShowInputDTO) => {
        let { weekDay, startTime, endTime, bandId, role } = input



        if (!weekDay || !startTime || !endTime || !bandId || !role) {
            throw new CustomError(422, "Falta de Parâmetro")
        }


        if (role !== "NORMAL" && role !== "ADMIN") {
            return "NORMAL"
        }



        const id = IdGenerator.generateId()


        const show: show = {
            id,
            weekDay,
            startTime,
            endTime,
            bandId,
            role

        }

        await this.showDB.insertShow(show)
        const token = Authenticator.generateToken({ id, role })
        return token

    }



    public editShow = async (input: EditShowInputDTO, token: string) => {
        let { weekDay, startTime, endTime, id } = input

        if (!weekDay || !startTime || !endTime || !id) {
            throw new CustomError(422, "Ausencia de parâmetros")
        }
        const showExist = await this.showDB.getShowById(id)
        if (!showExist) {
            throw new ShowNotFound()
        }

        const tokenData = Authenticator.getTokenData(token)
        if (tokenData.role !== "ADMIN") {
            throw new Unauthorized()
        }

        const editShow: EditShowInput = {
            id,
            weekDay,
            startTime,
            endTime,

        }
        await this.showDB.editShow(editShow)
    }
}
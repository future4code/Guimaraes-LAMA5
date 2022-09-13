import { BandDatabase } from "../data/BandDatabase";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import { CustomError, BandNotFound, Unauthorized } from "../error/CustomError";
import { band, EditBandInputDTO, EditBandInput, BandInputDTO } from "../model/Band";


export class BandBusiness {
    private bandDB:BandDatabase
    constructor() {
        this.bandDB = new BandDatabase()
    }

    public creatBand = async (input: BandInputDTO) => {
        let { name, musicGenre, responsible, role } = input



        if (!name || !musicGenre || !responsible || !role) {
            throw new CustomError(422, "Falta de Parâmetro")
        }


        if (role !== "NORMAL" && role !== "ADMIN") {
            return "NORMAL"
        }



        const id = IdGenerator.generateId()


        const band: band = {
            id,
           name,
           musicGenre,
          responsible,
           role,

        }

        await this.bandDB.insertBand(band)
        const token = Authenticator.generateToken({ id, role })
        return token

    }



    public editShow = async (input: EditBandInputDTO, token: string) => {
        let { name, musicGenre, responsible, id } = input

        if (!name || !musicGenre || !responsible || !id) {
            throw new CustomError(422, "Ausencia de parâmetros")
        }
        const bandExist = await this.bandDB.getBandById(id)
        if (!bandExist) {
            throw new BandNotFound()
        }

        const tokenData = Authenticator.getTokenData(token)
        if (tokenData.role !== "ADMIN") {
            throw new Unauthorized()
        }

        const editBand: EditBandInput = {
            id,
            name,
            musicGenre,
            responsible

        }
        await this.bandDB.editBand(editBand)
    }
}
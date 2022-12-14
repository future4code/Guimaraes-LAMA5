import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Show, ShowInputDTO, WeekDay } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness{
    constructor (
        private showDatabase: ShowDatabase,
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async createShow(input: ShowInputDTO, token: string){
        const tokenData = this.authenticator.getData(token)

        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("Apenas administradores tem acesso à essa funcionalidade")
        }

        if(!input.bandId || !input.endTime || !input.startTime || !input.weekDay){
            throw new InvalidInputError("Input inválido para criar show")
        }

        if(input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime){
            throw new InvalidInputError("Horários inválidos para show")
        }

        if(!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)){
            throw new InvalidInputError("horario dos shows devem ser inteiros")
        }

        const band = await this.bandDatabase.getBandIdOrNameOrFail(input.bandId)

        if(!band){
            throw new NotFoundError("Banda não encontrada")
        }

        const resgisterShows = await this.showDatabase.getShowsByTime(input.weekDay, input.startTime, input.endTime)

        if(!resgisterShows){
            throw new InvalidInputError("Nenhum show pode ser criado com esse horario")
        }

        await this.showDatabase.createShow(
            Show.toShow({
                ...input,
                id: this.idGenerator.generate()
            })
        )
    }

    async getShowByWeekDay(weekDay: WeekDay){
        if(!weekDay){
            throw new InvalidInputError("Input inválido para pegar usuário pelo Id")
        }

        const shows = await this.showDatabase.getShowsByWeekDayOrFail(weekDay)
        
        return {result: shows}
    }
}
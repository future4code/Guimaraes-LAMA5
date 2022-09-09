import { BaseDatabase } from "./BaseDatabase";
import { banda, EditBandaInputDTO } from "../model/Banda";
import { CustomError } from "../error/CustomError"

export class BandaDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_BANDAS"
    public insertBanda = async (banda: banda) => {
        try {

            await BandaDatabase.connection.insert({
                id: banda.id,
                name: banda.name,
                musicGenre: banda.musicGenre,
                responsible: banda.responsible,


            })
                .into(BandaDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }

    public getBandaById = async (id: string) => {
        try {
            const result = await BandaDatabase.connection(BandaDatabase.TABLE_NAME)
                .select()
                .where({ id })
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }

    public editShow = async (banda: EditBandaInputDTO) => {
        try {
            await BandaDatabase.connection
                .update({ name: banda.name, musicGenre: banda.musicGenre, responsible: banda.responsible })
                .where({ id: banda.id })
                .into(BandaDatabase.TABLE_NAME)
        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }



}
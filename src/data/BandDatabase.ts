import { BaseDatabase } from "./BaseDatabase";
import { band, EditBandInputDTO } from "../model/Band";
import { CustomError } from "../error/CustomError"

export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_BANDAS"
    public insertBand = async (band: band) => {
        try {

            await BandDatabase.connection.insert({
                id: band.id,
                name: band.name,
                musicGenre: band.musicGenre,
                responsible: band.responsible,


            })
                .into(BandDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }

    public getBandById = async (id: string) => {
        try {
            const result = await BandDatabase.connection(BandDatabase.TABLE_NAME)
                .select()
                .where({ id })
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }

    public editBand = async (band: EditBandInputDTO) => {
        try {
            await BandDatabase.connection
                .update({ name: band.name, musicGenre: band.musicGenre, responsible: band.responsible })
                .where({ id: band.id })
                .into(BandDatabase.TABLE_NAME)
        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }



}
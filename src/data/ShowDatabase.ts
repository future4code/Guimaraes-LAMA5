import { BaseDatabase } from "./BaseDatabase";
import { show, EditShowInputDTO } from "../model/Show";
import { CustomError } from "../error/CustomError"

export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_SHOWS"
    public insertShow = async (show: show) => {
        try {

            await ShowDatabase.connection.insert({
                id: show.id,
                weekDay: show.weekDay,
                startTime: show.startTime,
                endTime: show.endTime,


            })
                .into(ShowDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }

    public getShowById = async (id: string) => {
        try {
            const result = await ShowDatabase.connection(ShowDatabase.TABLE_NAME)
                .select()
                .where({ id })
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }

    public editShow = async (show: EditShowInputDTO) => {
        try {
            await ShowDatabase.connection
                .update({ weekDay: show.weekDay, startTime: show.startTime, endTime: show.endTime })
                .where({ id: show.id })
                .into(ShowDatabase.TABLE_NAME)
        } catch (error: any) {
            throw new CustomError(400, error.message)

        }
    }



}
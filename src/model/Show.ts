export type show = {
    id: string
    weekDay: string
    startTime: number
    endTime: number
    bandId: string
    role: string
     
}
 export interface ShowInputDTO {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string,
    role: string


 }
 
 export interface EditShowInputDTO {

   id: string,
    weekDay: string,
    startTime: number,
    endTime: number
 }
 
 export interface EditShowInput {
   id: string,
    weekDay: string,
    startTime: number,
    endTime: number
 }
 
 
export type banda = {
   id: string
   name: string
   musicGenre: string
   responsible: string
   role: string


}
export interface BandaInputDTO {
   name: string,
   musicGenre: string,
   responsible: string,
   role: string


}

export interface EditBandaInputDTO {
   id: string
   name: string,
   musicGenre: string,
   responsible: string

}

export interface EditBandaInput {
   id: string
   name: string,
   musicGenre: string,

}
 
 
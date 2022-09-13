export type band = {
   id: string
   name: string
   musicGenre: string
   responsible: string
   role: string


}
export interface BandInputDTO {
   name: string,
   musicGenre: string,
   responsible: string,
   role: string


}

export interface EditBandInputDTO {
   id: string
   name: string,
   musicGenre: string,
   responsible: string

}

export interface EditBandInput {
   id: string
   name: string,
   musicGenre: string,
   responsible: string

}
 
 
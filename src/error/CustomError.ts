export class CustomError extends Error {
  constructor(statusCode: number, message: string){
      super(message)
  }
}

export class InvalidName extends CustomError{ 
  constructor(){
      super(400, "Nome inválido")
  }
}

export class InvalidEmail extends CustomError{ 
  constructor(){
      super(400, "Email inválido")
  }
}

export class InvalidPassword extends CustomError{ 
  constructor(){
      super(400, "Senha inválida")
  }
}

export class UserNotFound extends CustomError{ 
  constructor(){
      super(404, "Usuário não encontrado")
  }
}

export class Unauthorized extends CustomError{ 
  constructor(){
      super(401, "Usuário não autorizado")
  }
}

//////////// Banda ///////////////


export class InvalidBandaName extends CustomError{ 
  constructor(){
      super(400, "Nome inválido")
  }
}

export class InvalidMusicalGenre extends CustomError{ 
  constructor(){
      super(400, "Estilo inválido")
  }
}

export class InvalidResponsible extends CustomError{ 
  constructor(){
      super(400, "Informar o responsavel")
  }
}

export class BandNotFound extends CustomError{ 
  constructor(){
      super(404, "Banda não encontrada")
  }
}

//////////// Show /////////////////

export class ShowNotFound extends CustomError{ 
  constructor(){
      super(404, "Show não encontrado")
  }
}

export class InvalidShow extends CustomError{ 
  constructor(){
      super(400, "Show inválido")
  }
}

export class InvalidWeekDay extends CustomError{ 
  constructor(){
      super(400, "Semana inválido")
  }
}


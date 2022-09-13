import express, {Express} from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import {AddressInfo} from "net";



dotenv.config();
export const app: Express = express()

app.use(express.json())
app.use(cors())

const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });
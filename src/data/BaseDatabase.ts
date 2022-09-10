
import knex from "knex";
import Knex   from "knex";


export abstract class BaseDatabase {

    private static connection: Knex | null = null;

    protected tableNames = {
        bands: "NOME_TABELA_BANDAS",
        shows: "NOME_TABELA_SHOWS",
        users: "NOME_TABELAS_USUÁRIOS"
    }

    protected getConnection(): Knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                  host: process.env.DB_HOST,
                  port: 3306,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_DATABASE_NAME,
                  multipleStatements: true,
                },
              });        
        }

        return BaseDatabase.connection;
    }

    public createTables(){
        BaseDatabase.connection?.raw(`
        CREATE TABLE IF NOT EXISTS NOME_TABELAS_USUÁRIOS (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
        );

        CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          music_genre VARCHAR(255) NOT NULL,
          responsible VARCHAR(255) UNIQUE NOT NULL 
        );
        
        CREATE TABLE IF NOT EXISTS NOME_TABELA_SHOWS (
          id VARCHAR(255) PRIMARY KEY,
          week_day VARCHAR(255) NOT NULL,
          start_time INT NOT NULL,
          end_time INT NOT NULL,
          band_id VARCHAR(255) NOT NULL,
          FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
        );
        
        `)
    }

    public static async destroyConnection(): Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }

}


    
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: process.env.DB_DIALECT /* 'mysql' 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

export const connectDB = ()=>{
    sequelize.sync().then(()=>{
        console.log("Connection has been established successfully.")
    }).catch((error)=>{
        console.log('Unable to connect to the database:', error)
    });
}





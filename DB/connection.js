import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('anonymousfeedbackapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /*  'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

export const connectDB = ()=>{
    sequelize.sync().then(()=>{
        console.log("Connection has been established successfully.")
    }).catch((error)=>{
        console.log('Unable to connect to the database:', error)
    });
}





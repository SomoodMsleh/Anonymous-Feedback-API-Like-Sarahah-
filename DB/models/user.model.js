import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
const UserModel = sequelize.define("User",{
    id : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    userName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email :{
        type : DataTypes.STRING,
        unique:true,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull :false
    },
    profile_picture:{
        type : DataTypes.STRING,
        allowNull : true,
    },
    profile_url:{
        type : DataTypes.STRING,
        unique: true,
        allowNull : false,
    },
    role:{
        type: DataTypes.ENUM('Admin','user'),
        defaultValue: 'user',
        allowNull : false
    },
    is_active:{
        type : DataTypes.BOOLEAN,
        defaultValue:true
    }
});



export default UserModel;
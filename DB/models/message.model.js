import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.model.js"
const MessageModel = sequelize.define("Message",{
    id : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    receiver_id:{
        type : DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: UserModel,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    content:{
        type:DataTypes.TEXT(),
        allowNull:false
    },
    is_reported:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    is_read:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
});

UserModel.hasMany(MessageModel, { foreignKey: "receiver_id" });
MessageModel.belongsTo(UserModel, { foreignKey: "receiver_id" });

export default MessageModel;
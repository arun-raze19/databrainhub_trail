import { Sequelize } from "sequelize";
import db from '../config/database';
import users from './Usermodel';
import Users from "./Usermodel";
const { Datatypes } =Sequelize;

const Products = db.define('product' , {
    uuid:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
  
    userId:{
        type: Datatypes.INTEGER,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

users.hasMany(Products);
Products.belongsTo(Users, {foreignKey:'userID'});

export default Products;
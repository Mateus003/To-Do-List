import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db';

class Membro extends Model {}

Membro.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 255], 
        },
      },
    },
    {
      sequelize, 
      modelName: 'Membro',
      tableName: 'membros'
    }
  );
  
  export default Membro;
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db';

class Membro extends Model {
  public id!: string; 
  public email!: string;
  public nome!: string;
  public senha!: string; 
}

Membro.init(
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255], 
      },
    },
  },
  {
    sequelize,
    modelName: 'Membro',
    tableName: 'membros',
  }
);

export default Membro;

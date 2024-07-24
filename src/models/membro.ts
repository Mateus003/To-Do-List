import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db';
import bcrypt from 'bcrypt';

class Membro extends Model {
  public id!: string;
  public email!: string;
  public nome!: string;
  public senha!: string;

  public async checkPassword(senha: string): Promise<boolean> {
    return bcrypt.compare(senha, this.senha);
  }
}

Membro.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    hooks: {
      beforeCreate: async (membro: Membro) => {
        if (membro.senha) {
          const saltRounds = 10;
          membro.senha = await bcrypt.hash(membro.senha, saltRounds);
        }
      },
      beforeUpdate: async (membro: Membro) => {
        if (membro.changed('senha')) {
          const saltRounds = 10;
          membro.senha = await bcrypt.hash(membro.senha, saltRounds);
        }
      },
    },
  }
);

export default Membro;

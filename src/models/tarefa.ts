import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db';

class Tarefa extends Model {}

Tarefa.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 50]
    }
  },
  descricao: {
    type: DataTypes.STRING(140),
    allowNull: true
  },
  finalizada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  dataTermino: {
    type: DataTypes.DATE,
    allowNull: true
  },
  prioridade: {
    type: DataTypes.ENUM('Baixa', 'Média', 'Alta'),
    allowNull: false,
    defaultValue: 'Baixa'
  }
}, {
  sequelize,
  modelName: 'Tarefa'
});

export default Tarefa;

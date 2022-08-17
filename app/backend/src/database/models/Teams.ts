import { DataTypes, Model } from 'sequelize';

import db from '.';

class Teams extends Model {
  public id!: number;

  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Teams',
  tableName: 'teams',
});

export default Teams;

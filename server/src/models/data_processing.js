import { DataTypes, Model } from "sequelize";
import User from "./user";

export class Data_Processing extends Model {
  static init(sequelize) {
    return super.init(
      {
        host: {
          type: DataTypes.STRING(320),
          primaryKey: true,
          references: {
            model: User,
            key: "email",
          },
        },
        collected_at: {
          type: DataTypes.DATE,
          primaryKey: true,
          defaultValue: Date.now(),
        },
        model_file_path: {
          type: DataTypes.STRING,
        },
        params: {
          type: DataTypes.JSON,
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
      }
    );
  }

  static associate(db) {
    db.Data_Processing.belongsTo(db.User, {
      foreignKey: "host",
      targetKey: "email",
    });
  }
}

export default Data_Processing;

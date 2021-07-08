import { DataTypes, Model } from "sequelize";
import User from "./user";

export class Weather_In extends Model {
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
        },
        temp: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        humi: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        lights: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
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
    // 모델이 참조하는 테이블
    db.Weather_in.belongsTo(db.User, {
      foreignKey: "host",
      targetKey: "email",
    });
  }
}

export default Weather_In;

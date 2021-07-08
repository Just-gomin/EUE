import { DataTypes, Model } from "sequelize";
import Emd from "./emd";

export class Weather_Out extends Model {
  static init(sequelize) {
    return super.init(
      {
        loc_code: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Emd,
            key: "code",
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
        press: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        wind_speed: {
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
    db.Weather_out.belongsTo(db.Emd, {
      foreignKey: "loc_code",
      targetKey: "code",
    });
  }
}

export default Weather_Out;

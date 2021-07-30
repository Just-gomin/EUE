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
            key: "code_emd",
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
    // weather_out 모델이 참조하는 테이블에 대한 외래키 설정.
    db.Weather_Out.belongsTo(db.Emd, {
      foreignKey: "loc_code",
      targetKey: "code_emd",
    });
  }
}

export default Weather_Out;

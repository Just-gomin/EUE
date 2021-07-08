/*

  # DB의 EMD(읍면동) 테이블의 모델입니다.

  - 읍/면/동의 코드와 이름을 저장합니다.
  - 외래키로 Do 코드와 SGG 코드를 사용합니다.

*/

import { DataTypes, Model } from "sequelize";

export class Emd extends Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
        },
        name_emd: {
          type: DataTypes.STRING(20),
          allowNull: false,
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
    db.Emd.belongsTo(db.Doe, {
      foreignKey: "code_do",
      targetKey: "code",
    });
    db.Emd.belongsTo(db.Sgg, {
      foreignKey: "code_sgg",
      targetKey: "code",
    });

    // 모델이 참조되는 테이블
    db.Emd.hasMany(db.User, {
      foreignKey: "loc_code",
      sourceKey: "code",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    db.Emd.hasMany(db.Weather_out, {
      foreignKey: "loc_code",
      sourceKey: "code",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default Emd;

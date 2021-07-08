/*

  # DB의 SGG(시군구) 테이블의 모델입니다.

  - 시/군/구의 코드와 이름을 저장합니다.
  - 외래키로 Do 코드를 사용합니다.

*/

import { DataTypes, Model } from "sequelize";

export class Sgg extends Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name_sgg: {
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
    db.Sgg.belongsTo(db.Doe, {
      foreignKey: "code_do",
      targetKey: "code",
    });

    // 모델이 참조되는 테이블
    db.Sgg.hasMany(db.Emd, {
      foreignKey: "code_sgg",
      sourceKey: "code",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default Sgg;

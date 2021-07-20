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
        code_sgg: {
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
    // Sgg 모델이 참조하는 테이블에 대한 외래키 설정
    db.Sgg.belongsTo(db.Doe, {
      foreignKey: "code_doe",
      targetKey: "code_doe",
    });

    // Sgg 모델을 참조하는 테이블에 대한 외래키 설정
    db.Sgg.hasMany(db.Emd, {
      foreignKey: "code_sgg",
      sourceKey: "code_sgg",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default Sgg;

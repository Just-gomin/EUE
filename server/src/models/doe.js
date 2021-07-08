/*

  # DB의 Do(도) 테이블의 모델입니다.
  - 도 코드와 이름 정보를 저장합니다.

*/

import { DataTypes, Model } from "sequelize";

export class Doe extends Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name_do: {
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
    // 모델이 참조되는 테이블 설정
    db.Doe.hasMany(db.Sgg, {
      foreignKey: "code_do",
      sourceKey: "code",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    db.Doe.hasMany(db.Emd, {
      foreignKey: "code_do",
      sourceKey: "code",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default Doe;

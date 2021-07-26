/*

  # DB의 Users 테이블의 모델입니다.

  - email과 비밀번호를 저장합니다.
  - 외래키로 EMD 코드를 사용합니다.

*/

import { DataTypes, Model } from "sequelize";

export class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(320),
          allowNull: false,
          primaryKey: true,
        },
        nick_name: {
          type: DataTypes.STRING(16),
          allowNull: false,
        },
        using_aircon: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
    // User 모델이 참조하는 테이블에 대한 외래키 설정.
    db.User.belongsTo(db.Emd, {
      foreignKey: "loc_code",
      targetKey: "code_emd",
    });

    // User 모델을 참조하는 테이블에 대한 외래키 설정.
    db.User.hasMany(db.Weather_in, {
      foreignKey: "host",
      sourveKey: "email",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default User;

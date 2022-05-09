module.exports = (sequelize, DataTypes) => {
  const userSignUp = sequelize.define(
    "userSignUp",
    {
      userNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING(100),
        unique: true,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userPass: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "userSignUp", // 테이블 이름 정의
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return userSignUp;
};

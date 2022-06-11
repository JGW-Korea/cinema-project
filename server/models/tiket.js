module.exports = (sequelize, DataTypes) => {
  const Tiket = sequelize.define(
    "Tiket",
    {
      TiketNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        primaryKey: true,
      },
      ScreenNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MovieName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TiketDate: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TiketTime: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TiketSeat: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TiketUser: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "Tiket", // 테이블 이름 정의
      timestamps: true, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return Tiket;
};

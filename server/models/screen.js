const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const screen = sequelize.define(
    "screen",
    {
      movieNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      screenDate: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      screenTime: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "screen", // 테이블 이름 정의
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  screen.prototype.dataFormat = (date) => {
    return moment(date).format("YYYY.MM.DD");
  };

  return screen;
};

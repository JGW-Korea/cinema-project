module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      postNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      postUser: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      movieNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "post", // 테이블 이름 정의
      timestamps: true, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return post;
};

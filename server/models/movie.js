module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define(
    "movie",
    {
      movieNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      movieTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      movieReview: {
        type: DataTypes.STRING(600),
      },
      movieDirector: {
        type: DataTypes.STRING(100),
      },
      movieActor: {
        type: DataTypes.STRING(500),
      },
      movieGenre: {
        type: DataTypes.STRING(100),
      },
      movieTime: {
        type: DataTypes.STRING(100),
      },
      movieRelease: {
        type: DataTypes.STRING(100),
      },
      moviePoster: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "movie", // 테이블 이름 정의
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return movie;
};

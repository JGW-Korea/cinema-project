const express = require("express");
const router = express.Router();

const { sequelize, movie } = require("../../models");
const { Op } = require("sequelize");

sequelize
  .sync({ force: false })
  .then(() => {
    // movie.bulkCreate([
    //   {
    //     movieNumber: 111111,
    //     movieTitle: "범죄도시2",
    //     movieReview:
    //       "“느낌 오지? 이 놈 잡아야 하는 거” 가리봉동 소탕작전 후 4년 뒤, 금천서 강력반은 베트남으로 도주한 용의자를 인도받아 오라는 미션을 받는다. 괴물형사 ‘마석도’(마동석)와 ‘전일만’(최귀화) 반장은 현지 용의자에게서 수상함을 느끼고, 그의 뒤에 무자비한 악행을 벌이는 ‘강해상’(손석구)이 있음을 알게 된다. ‘마석도’와 금천서 강력반은 한국과 베트남을 오가며 역대급 범죄를 저지르는 ‘강해상’을 본격적으로 쫓기 시작하는데... 나쁜 놈들 잡는 데 국경 없다! 통쾌하고 화끈한 범죄 소탕 작전이 다시 펼쳐진다!",
    //     movieDirector: "이상용",
    //     movieActor: "마동석, 손석구, 최귀한",
    //     movieGenre: "액션",
    //     movieTime: "106분",
    //     movieRelease: "2022년 5월 18일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20220516_144/1652665409592Chvey_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 222222,
    //     movieTitle: "닥터 스트레인지: 대혼돈의 멀티버스",
    //     movieReview:
    //       "지금껏 본 적 없는 마블의 극한 상상력! 광기의 멀티버스가 깨어난다 끝없이 균열되는 차원과 뒤엉킨 시공간의 멀티버스가 열리며 오랜 동료들, 그리고 차원을 넘어 들어온 새로운 존재들을 맞닥뜨리게 된 ‘닥터 스트레인지’. 대혼돈 속, 그는 예상치 못한 극한의 적과 맞서 싸워야만 하는데….",
    //     movieDirector: "샘 레이미",
    //     movieActor:
    //       "베네딕트 컴버배치, 엘리자베스 올슨, 베네딕트 웡, 레이첼 맥아담스",
    //     movieGenre: "판타지",
    //     movieTime: "126분",
    //     movieRelease: "2022년 5월 4일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20220504_33/165164173504831gKe_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 333333,
    //     movieTitle: "쥬라기 월드-도미니언 ",
    //     movieReview:
    //       "이제 모든 것이 끝난다, 지상 최대 블록버스터의 압도적 피날레! 공룡들의 터전이었던 이슬라 누블라 섬이 파괴된 후, 마침내 공룡들은 섬을 벗어나 세상 밖으로 출몰한다. 지상에 함께 존재해선 안 될 위협적 생명체인 공룡의 등장으로 인류 역사상 겪어보지 못한 사상 최악의 위기를 맞이한 인간들. 지구의 최상위 포식자 자리를 걸고 인간과 공룡의 최후의 사투가 펼쳐진다.",
    //     movieDirector: "콜린 트레보로우",
    //     movieActor:
    //       "크리스 프랫, 브라이스 달라스 하워드, 드완다 와이즈, 로라 던, 제프 골드브럼, 샘 닐",
    //     movieGenre: "어드벤처",
    //     movieTime: "147분",
    //     movieRelease: "2022년 6월 1일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20220516_144/1652687286550mcE4G_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 444444,
    //     movieTitle: "그대가 조국",
    //     movieReview:
    //       "대한민국은 민주공화국인가 검찰공화국인가 검찰의 칼날이 그대에게 향하지 않는다고 자신할 수 있는가 사냥이 시작됐다. 검찰이 던진 좌표를 따라 언론은 몰려들고 소문은 꼬리를 문다. 분노한 대중 앞에 검찰은 칼을 휘두른다. 저기 쫓기는 자는 누구인가. 그대가 아니라고 자신할 수 있는가.",
    //     movieDirector: "이승준",
    //     movieActor: null,
    //     movieGenre: "다큐멘터리",
    //     movieTime: "124분",
    //     movieRelease: "2022년 5월 25일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20220510_209/1652173423913czGcU_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 555555,
    //     movieTitle: "신비한 동물들과 덤블도어의 비밀",
    //     movieReview:
    //       "가장 위험한 마법에 맞선, 세상을 구할 전쟁이 시작된다! 1930년대, 제2차 세계대전에 마법사들이 개입하게 되면서 강력한 어둠의 마법사 그린델왈드의 힘이 급속도로 커진다. 덤블도어는 뉴트 스캐맨더에게 위대한 마법사 가문 후손, 마법학교의 유능한 교사, 머글 등으로 이루어진 팀에게 임무를 맡긴다. 이에 뉴트와 친구들은 머글과의 전쟁을 선포한 그린델왈드와 추종자들, 그의 위험한 신비한 동물들에 맞서 세상을 구할 거대한 전쟁에 나선다. 한편 전쟁의 위기가 최고조로 달한 상황 속에서 덤블도어는 더 이상 방관자로 머물 수 없는 순간을 맞이하고, 서서히 숨겨진 비밀이 드러나는데…",
    //     movieDirector: "데이빗 예이츠",
    //     movieActor:
    //       "에디 레드메인, 주드 로, 매즈 미켈슨, 댄 포글러, 앨리슨 수돌",
    //     movieGenre: "판타지",
    //     movieTime: "142분",
    //     movieRelease: "2022년 4월 13일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20220324_173/1648105241678ygLXq_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 666666,
    //     movieTitle: "아메리칸 셰프",
    //     movieReview:
    //       "일류 레스토랑의 셰프 칼 캐스퍼는 레스토랑 오너에게 메뉴 결정권을 뺏긴 후 유명음식평론가의 혹평을 받자 홧김에 트위터로 욕설을 보낸다. 이들의 썰전은 온라인 핫이슈로 등극하고 칼은 레스토랑을 그만두기에 이른다. 아무것도 남지 않은 그는 쿠바 샌드위치 푸드트럭에 도전, 그 동안 소원했던 아들과 미국 전역을 일주하던 중 문제의 평론가가 푸드트럭에 다시 찾아오는데… 과연 칼은 셰프로서의 명예를 되찾을 수 있을까?",
    //     movieDirector: "존 파브로",
    //     movieActor:
    //       "존 파브로, 엠제이 안소니, 소피아 베르가라, 스칼렛 요한슨, 더스틴 호프만",
    //     movieGenre: "코미디",
    //     movieTime: "114분",
    //     movieRelease: "2015년 1월 17일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20141205_174/1417743810978NcKng_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 777777,
    //     movieTitle: "라라랜드",
    //     movieReview:
    //       "황홀한 사랑, 순수한 희망, 격렬한 열정… 이 곳에서 모든 감정이 폭발한다! 꿈을 꾸는 사람들을 위한 별들의 도시 ‘라라랜드’. 재즈 피아니스트 ‘세바스찬’(라이언 고슬링)과 배우 지망생 ‘미아’(엠마 스톤), 인생에서 가장 빛나는 순간 만난 두 사람은 미완성인 서로의 무대를 만들어가기 시작한다.",
    //     movieDirector: "데이미언 셔젤",
    //     movieActor: "라이언 고슬링, 엠마 스톤",
    //     movieGenre: "뮤지컬",
    //     movieTime: "127분",
    //     movieRelease: "2016년 12월 7일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20201229_146/1609226288425JgdsP_JPEG/movie_image.jpg?type=m203_290_2",
    //   },
    //   {
    //     movieNumber: 888888,
    //     movieTitle: "더 배트맨",
    //     movieReview:
    //       "지난 2년간 고담시의 어둠 속에서 범법자들을 응징하며 배트맨으로 살아온 브루스 웨인. 알프레드와 제임스 고든 경위의 도움 아래, 도시의 부패한 공직자들과 고위 관료들 사이에서 복수의 화신으로 활약한다. 고담의 시장 선거를 앞두고 고담의 엘리트 집단을 목표로 잔악한 연쇄살인을 저지르는 수수께끼 킬러 리들러가 나타나자, 최고의 탐정 브루스 웨인이 수사에 나서고 남겨진 단서를 풀어가며 캣우먼, 펭귄, 카마인 팔코네, 리들러를 차례대로 만난다. 사이코 범인의 미스터리를 수사하면서 그 모든 증거가 자신을 향한 의도적인 메시지였음을 깨닫고, 리들러에게 농락 당한 배트맨은 광기에 사로잡힌다. 범인의 무자비한 계획을 막고 오랫동안 고담시를 썩게 만든 권력 부패의 고리를 끊어야 하지만, 부모님의 죽음에 얽힌 진실이 밝혀지자 복수와 정의 사이에서 갈등한다. 선과 악, 빛과 어둠, 영웅과 악당, 정의와 복수.. 무엇을 선택할 것인가",
    //     movieDirector: "맷 리브스",
    //     movieActor: "로버트 패틴슨, 앤디 서키스, 조 크라비츠, 폴 다노",
    //     movieGenre: "범죄",
    //     movieTime: "176분",
    //     movieRelease: "2022년 3월 1일",
    //     moviePoster:
    //       "https://tvstore-phinf.pstatic.net/20220328_126/1648432279621JpHOc_JPEG/TheBatman2022_STD_PVOD_V_DD_KA_TT_2000x3000_300dpi_KR.jpg?type=w320_r145",
    //   },
    //   {
    //     movieNumber: 999999,
    //     movieTitle: "이상한 나라의 수학자",
    //     movieReview:
    //       "'정답보다 중요한 건 답을 찾는 과정이야'학문의 자유를 갈망하며 탈북한 천재 수학자 '이학성’(최민식). 그는 자신의 신분과 사연을 숨긴 채 상위 1%의 영재들이 모인 자사고의 경비원으로 살아간다. 차갑고 무뚝뚝한 표정으로 학생들의 기피 대상 1호인 ‘이학성’은 어느 날 자신의 정체를 알게 된 뒤 수학을 가르쳐 달라 조르는 수학을 포기한 고등학생 ‘한지우’(김동휘)를 만난다. 정답만을 찾는 세상에서 방황하던 ‘한지우’에게 올바른 풀이 과정을 찾아나가는 법을 가르치며 ‘이학성’ 역시 뜻하지 않은 삶의 전환점을 맞게 된다.",
    //     movieDirector: "박동훈",
    //     movieActor: "최민식, 김동휘",
    //     movieGenre: "드라마",
    //     movieTime: "117분",
    //     movieRelease: "2022년 3월 9일",
    //     moviePoster:
    //       "https://movie-phinf.pstatic.net/20220210_27/16444726389021AWu6_JPEG/movie_image.jpg?type=w320_r145",
    //   },
    //   {
    //     movieNumber: 101010,
    //     movieTitle: "스파이더맨: 노 웨이 홈",
    //     movieReview:
    //       "‘미스테리오’의 계략으로 세상에 정체가 탄로난 스파이더맨 ‘피터 파커’는 하루 아침에 평범한 일상을 잃게 된다. 문제를 해결하기 위해 ‘닥터 스트레인지’를 찾아가 도움을 청하지만 뜻하지 않게 멀티버스가 열리면서 각기 다른 차원의 불청객들이 나타난다. ‘닥터 옥토퍼스’를 비롯해 스파이더맨에게 깊은 원한을 가진 숙적들의 강력한 공격에 ‘피터 파커’는 사상 최악의 위기를 맞게 되는데…",
    //     movieDirector: "존 왓츠",
    //     movieActor:
    //       "톰 홀랜드, 젠데이아 콜먼, 베네딕트 컴버배치, 존 파브로, 제이콥 배덜런, 마리사 토메이, 알프리드 몰리나",
    //     movieGenre: "액션",
    //     movieTime: "148분",
    //     movieRelease: "2021년 12월 15일",
    //     moviePoster:
    //       "https://tvstore-phinf.pstatic.net/20220309_158/1646814059193KIsGI_JPEG/DP_6444922_SpiderMan_NoWayHome_2000x3000_KR.jpg?type=w320_r145",
    //   },
    // ]);
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", async (req, res) => {
  const movieinfo = await movie.findAll({});

  res.send(movieinfo);
});

router.get("/img", async (req, res) => {
  const { movieKey } = req.query;

  try {
    const movieinfo = await movie.findAll({
      where: {
        movieNumber: { [Op.eq]: movieKey },
      },
    });

    res.send(movieinfo[0]);
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;

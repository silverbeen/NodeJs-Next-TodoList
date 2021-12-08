const express = require("express");
const session = require("express-session"); // 세션 관리를 위한 express-session
const morgan = require("morgan"); //작업 수행시 로깅
const cookieParser = require("cookie-parser"); // 쿠키 파싱 미들웨어
const cors = require("cors"); // CORS 에러 방지
const dotenv = require("dotenv"); // .env SECRET 정보 가져오기
const app = express;

// passportConfig - passport 내부 js 실행 (use, serialize, deserialze)
const passportConfig = require("./passport");
const passport = require("passport"); // passport 미들웨어 가져오기

const { sequelize } = require("./models/index");

const pageRouter = require("./router/page");

const userRouter = require("./router/user");

// dotenv 실행
// dotenv를 통해 SECRET KEY를 받는 코드보다 위에 위치해야한다.
dotenv.config();

app.use("/", pageRouter);

sequelize
  .sync({ force: false })
  .then(() => console.log("데이터 베이스 연결 성공"))
  .catch((e) => console.log(e));

passportConfig();
app.set("port", process.env.PORT || 3051);

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// cookieParser 설정에 비밀키를 넣어주자.
// cookieParser를 사용하게되면 req.cookies로 접근이 가능하다.
app.use(cookieParser(process.env.COOKIE_SECRET));

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

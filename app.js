const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 3000;
// router 수정좀 했어요
// const router = require("./routes");

// 내부 모듈
const router = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

// css 적용
app.use(express.static("public"));

app.listen(port, () => {
  console.log(
    `
˚∧ ＿ ∧  　+        —̳͟͞͞❤
(  •‿• )つ  —̳͟͞͞ ❤         —̳͟͞͞❤ +
(つ　 <                —̳͟͞͞❤
｜　 _つ      +  —̳͟͞͞❤         —̳͟͞͞❤ ˚
 し´
   server is running on port ${port}
    `
  );
});
module.exports = app;

const socket = io();
socket.on("loginAuth", (data) => {
  const modal = document.getElementById("modal_content");
  modal.innerText = `${data.loginId} 님께서 로그인 하셨습니다`;

  // 모달창
  $(function () {
    $(function () {
      $(".modal").fadeIn();
    });
    setTimeout(() => $(".modal").fadeOut(), 5000);
  });
});

socket.on("addGoods",(data)=>{
  const modal = document.getElementById("modal_content");
  modal.innerText = `지금! ${data.goodsName} 상품이 추가되었어요!`;

  // 모달창
  $(function () {
    $(function () {
      $(".modal").fadeIn();
    });
    setTimeout(() => $(".modal").fadeOut(), 5000);
  });
});

// 로그아웃 버튼
document.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementsByClassName("logout");
  for (let i = 0; i < logout.length; i++) {
    logout[i].addEventListener("click", () => {
      axios({
        method: "post",
        url: "/api/auth/logout",
        data: {},
      }).then((response) => {
        window.location.href = "/";
      });
    });
  }
});

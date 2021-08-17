function changePage(_page, _callback = function () {}) {
  $(".pages").hide();
  $("#" + _page).show();
  _callback();
}

function initSlideHomePage() {
  clearInterval(swiper_timer);
  swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  swiper_timer = setInterval(function () {
    $(".swiper-button-next").click();
  }, 5000);
}
function initSlideNewsPage() {
  clearInterval(swiper_timer2);
  swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
  });
  swiper_timer2 = setInterval(function () {
    $(".swiper-button-next2").click();
  }, 5000);
}
function calHomeButtonPosition(){
  var total_w = $(".main_home_menu_item_wrapper").width();
  var _w = (total_w/2)-5;
  $(".main_home_menu_item_wrapper img").width(_w);
  $(".main_home_menu_item_wrapper img").eq(1).css("margin-left","10px");
  $(".main_home_menu_item_wrapper img").eq(3).css("margin-left","10px");
}
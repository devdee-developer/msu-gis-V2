class Loading {
  show() {
    $(".loader_wrapper").show();
  }
  hide() {
    $(".loader_wrapper").hide();
  }
}
class TopMenu {
  show() {
    $(".top_menu_wrapper").show();
  }
  hide() {
    $(".top_menu_wrapper").hide();
  }
}
class Token{
  getAccessToken(){
    return localStorage.getItem("access_token");
  }
}
$(function () {
  $(".main_home_menu_item_wrapper img")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("visit_page", function () {
          initialPage()
        });
      }, 500);
    });
    function initialPage (){
      $(".collapse-filter .collapse-filter-header").click(function () {

        $header = $(this);
        $content = $header.next();
        $(".toggle", this).toggleClass("fa-chevron-up fa-chevron-down");
        $content.slideToggle(200, function () {

        });
    });
    $('.btn-sort').click(function(){
           showModal('modal-sort')
    })
    $(".list-body").find(".card").each(function (index) {
        $(this).click(function () {
            showModal('modal-visit-detail')
        });
    });
    }
});

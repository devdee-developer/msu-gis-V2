$(function () {
  //contact list
  // changePage("visit_detail_page")
  $(".main_home_menu_item_wrapper img")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("visit_page", function () {
          initialPageFunc();
        });
      }, 500);
    });
  function initialPageFunc() {
    $(".collapse-filter .collapse-filter-header").click(function () {
      $header = $(this);
      $content = $header.next();
      $(".toggle", this).toggleClass("fa-chevron-up fa-chevron-down");
      $content.slideToggle(200, function () {

      });
    });
    $(".btn-sort").on("click",function () {
      showModal("modal-sort-visit");
    });
    $(".contact_items")
      .find("li")
      .each(function (index) {
        $(this).click(function () {
          $('#visit_recommend').hide();
          showModal("modal-visit-detail");
        });
      });
     
    $("#visit_page .header .back_header_btn").on("click", function () {
      $(".menu_home_page").click()
    });
    $("#visit_detail_page .header .back_header_btn").on("click", function () {
      changePage("visit_page", function () {
      });
    });
    setTimeout(function () {
      $('#visit_recommend').show();
      showModal("modal-visit-detail");
    }, 500);

    //visit detail
    $(".ready-for-visit")
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("visit_detail_page", function () {

        });
      }, 500);
    });
  }
});

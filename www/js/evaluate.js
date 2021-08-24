$(function () {
  $(".main_home_menu_item_wrapper img")
    .eq(0)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page", function () {
          initialPageFunc();
        });
      }, 500);
    });
  function initialPageFunc() {
    $(".collapse-filter .collapse-filter-header").click(function () {
      $header = $(this);
      $content = $header.next();
      $(".toggle", this).toggleClass("fa-chevron-up fa-chevron-down");
      $content.slideToggle(200, function () {});
    });
    $(".btn-sort").on("click", function () {
      showModal("modal-sort-evaluate");
    });
    $("#evaluate_page .header .back_header_btn").on("click", function () {
      $(".menu_home_page").click();
    });
    $(".contact_items")
      .find("li")
      .each(function (index) {
        $(this).click(function () {
          $("#evaluate_recommend").hide();
          showModal("modal-evaluate-detail");
        });
      });
    setTimeout(function () {
      $("#evaluate_recommend").show();
      showModal("modal-evaluate-detail");
    }, 500);
    //evaluate detail
    $(".ready-for-evaluate").on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_detail_page", function () {});
        setProgressevaluate(9);
      }, 500);
    });
    $("#evaluate_detail_page .header .back_header_btn").on(
      "click",
      function () {
        changePage("evaluate_page", function () {
          // $("#evaluate_form_page").destroy();
        });
      }
    );
    $("#evaluate_page_1 .header .back_header_btn").on("click", function () {
      changePage("evaluate_detail_page", function () {
        // $("#evaluate_form_page").destroy();
      });
    });
  }
  $(".visit_card.current .card_body.evaluate")
    .eq(0)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_1", function () {});
      }, 500);
    });
  function setProgressevaluate(percent) {
    var circle = document.querySelector(".progress_ring_circle_evaluate");
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    const offset =
      circumference - ((percent * (100 / 13)) / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
});

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
        changePage("evaluate_page", function () {});
      }
    );
    // evaluate_page_1
    $("#evaluate_page_1 .evaluate_page_header .back_header_btn").on(
      "click",
      function () {
        changePage("evaluate_detail_page", function () {});
      }
    );
    $("#evaluate_page_1 .footer .btn_create_evaluate").on("click", function () {
      $("#evaluate_page_1 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#DTX").prop("disabled", false);
      $("#DTX").focus();
      $("#DTX").val("");
      $("#evaluate_page_1 .evaluate_page_status ").hide();
      $("#evaluate_page_1 .footer").hide();
      $("#evaluate_page_1 .step-footer").show();
    });
    $("#evaluate_page_1 .step-footer .btn_group .cancel").on(
      "click",
      function () {
        $("#DTX").prop("disabled", true);
        $("#DTX").val("75");
        $("#evaluate_page_1 .evaluate_page_status ").show();
        $("#evaluate_page_1 .footer").show();
        $("#evaluate_page_1 .step-footer").hide();
      }
    );
    $("#evaluate_page_1 .step-footer .btn_group .submit").on(
      "click",
      function () {
        $("#evaluate_detail_page .footer.evaluate-success").show();
        changePage("evaluate_detail_page", function () {
          setTimeout(function () {
            $("#evaluate_detail_page .footer.evaluate-success").hide();
          }, 1000);
        });
      }
    );
    $("#DTX").on("change paste keyup", function () {
      if ($("#DTX").val().length != 0) {
        $("#evaluate_page_1 .step-footer .btn_group .submit").prop(
          "disabled",
          false
        );
        $("#evaluate_page_1 .evaluate_page_status ").show();
      } else {
        $("#evaluate_page_1 .step-footer .btn_group .submit").prop(
          "disabled",
          true
        );
        $("#evaluate_page_1 .evaluate_page_status ").hide();
      }
    });
    // evaluate_page_3
    $("#evaluate_page_3 .evaluate_page_header .back_header_btn").on(
      "click",
      function () {
        changePage("evaluate_detail_page", function () {});
      }
    );
  }
  // evaluate_page_1
  $(".visit_card.current .card_body.evaluate")
    .eq(0)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_1", function () {
          $("#DTX").prop("disabled", true);
          $("#evaluate_page_1 .step-footer").hide();
          $("#DTX").val("75");
        });
      }, 500);
    });
  // evaluate_page_3
  $(".visit_card.current .card_body.evaluate")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_3", function () {
          $("#evaluate_page_3 .step-footer").hide();
        });
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

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
  }
  /* ----------------------------------------------------------------------------- start : evaluate_page ----------------------------------------------------------------------------- */
  $("#evaluate_page .header .back_header_btn").on("click", function () {
    $(".menu_home_page").click();
  });
  /* ----------------------------------------------------------------------------- end : evaluate_page ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_detail_page ----------------------------------------------------------------------------- */
  // StepProgresse
  $(".ready-for-evaluate").on("click", function () {
    loading.show();
    setTimeout(function () {
      loading.hide();
      changePage("evaluate_detail_page", function () {});
      setProgressevaluate(9);
    }, 500);
  });
  // ปุ่ม back
  $("#evaluate_detail_page .header .back_header_btn").on("click", function () {
    changePage("evaluate_page", function () {});
  });
  /* ----------------------------------------------------------------------------- end : evaluate_detail_page ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_1 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_1
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
  // ปุ่ม back
  $("#evaluate_page_1 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      changePage("evaluate_detail_page", function () {});
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
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
  // เช็คค่าใน input
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
  // ปุ่ม ยกเลิก
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
  // ปุ่ม บันทึก
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_1 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_3 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_3
  $(".visit_card.current .card_body.evaluate")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_3", function () {
          $("#blood_pressure_up").prop("disabled", true);
          $("#blood_pressure_down").prop("disabled", true);
          $("#evaluate_page_3 .step-footer").hide();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_3 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      changePage("evaluate_detail_page", function () {});
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_3 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
    $("#blood_pressure_up").prop("disabled", false);
    $("#blood_pressure_down").prop("disabled", false);
    $("#blood_pressure_up").focus();
    $("#blood_pressure_up").val("");
    $("#blood_pressure_down").val("");
    $("#evaluate_page_3 .evaluate_page_status ").hide();
    $("#evaluate_page_3 .footer").hide();
    $("#evaluate_page_3 .step-footer").show();
  });
  // เช็คค่าใน input
  $("#blood_pressure_up").on("change paste keyup", function () {
    if (
      $("#blood_pressure_up").val().length != 0 &&
      $("#blood_pressure_down").val().length != 0
    ) {
      $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_3 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_3 .evaluate_page_status ").hide();
    }
  });
  // เช็คค่าใน input
  $("#blood_pressure_down").on("change paste keyup", function () {
    if (
      $("#blood_pressure_up").val().length != 0 &&
      $("#blood_pressure_down").val().length != 0
    ) {
      $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_3 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_3 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_3 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#blood_pressure_up").prop("disabled", true);
      $("#blood_pressure_down").prop("disabled", true);
      $("#blood_pressure_up").val("75");
      $("#blood_pressure_down").val("75");
      $("#evaluate_page_3 .evaluate_page_status ").show();
      $("#evaluate_page_3 .footer").show();
      $("#evaluate_page_3 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_3 .step-footer .btn_group .submit").on(
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

  /* ----------------------------------------------------------------------------- end : evaluate_page_3 ----------------------------------------------------------------------------- */
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

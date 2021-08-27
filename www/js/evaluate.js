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
  // ปุ่ม ยืนยัน modal-evaluate-alert
  $("#modal-evaluate-alert .submit_alret").on("click", function () {
    changePage("evaluate_detail_page", function () {});
    $(".modal").hide();
    $("body").removeClass("modal-open");
  });
  // ปุ่ม ยกเลิก modal-evaluate-alert
  $("#modal-evaluate-alert .cancel_alret").on("click", function () {
    $(".modal").hide();
    $("body").removeClass("modal-open");
  });
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
          $("#DTX").val("75");
          $("#evaluate_page_1 .evaluate_page_status ").show();
          $("#evaluate_page_1 .footer").show();
          $("#evaluate_page_1 .step-footer").hide();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_1 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
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

  /* ----------------------------------------------------------------------------- start : evaluate_page_2 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_2
  $(".visit_card.current .card_body.evaluate")
    .eq(1)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_2", function () {
          $("#blood_pressure_up").prop("disabled", true);
          $("#blood_pressure_down").prop("disabled", true);
          $("#blood_pressure_up").val("75");
          $("#blood_pressure_down").val("75");
          $("#evaluate_page_2 .evaluate_page_status ").show();
          $("#evaluate_page_2 .footer").show();
          $("#evaluate_page_2 .step-footer").hide();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_2 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_2 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_2 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
    $("#blood_pressure_up").prop("disabled", false);
    $("#blood_pressure_down").prop("disabled", false);
    $("#blood_pressure_up").focus();
    $("#blood_pressure_up").val("");
    $("#blood_pressure_down").val("");
    $("#evaluate_page_2 .evaluate_page_status ").hide();
    $("#evaluate_page_2 .footer").hide();
    $("#evaluate_page_2 .step-footer").show();
  });
  // เช็คค่าใน input
  $("#blood_pressure_up").on("change paste keyup", function () {
    if (
      $("#blood_pressure_up").val().length != 0 &&
      $("#blood_pressure_down").val().length != 0
    ) {
      $("#evaluate_page_2 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_2 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_2 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_2 .evaluate_page_status ").hide();
    }
  });
  // เช็คค่าใน input
  $("#blood_pressure_down").on("change paste keyup", function () {
    if (
      $("#blood_pressure_up").val().length != 0 &&
      $("#blood_pressure_down").val().length != 0
    ) {
      $("#evaluate_page_2 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_2 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_2 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_2 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_2 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#blood_pressure_up").prop("disabled", true);
      $("#blood_pressure_down").prop("disabled", true);
      $("#blood_pressure_up").val("75");
      $("#blood_pressure_down").val("75");
      $("#evaluate_page_2 .evaluate_page_status ").show();
      $("#evaluate_page_2 .footer").show();
      $("#evaluate_page_2 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_2 .step-footer .btn_group .submit").on(
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
  // $("#evaluate_detail_page .footer .btn_create_evaluate").on(
  //   "click",
  //   function () {
  //     showModal("modal-evaluate-alert");
  //   }
  // );
  /* ----------------------------------------------------------------------------- end : evaluate_page_2 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_3 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_3
  $(".visit_card.current .card_body.evaluate")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_3", function () {
          $("#evaluate_page_3 .content .form img").remove();
          $("#evaluate_page_3 .content .form button").removeClass(
            "btnSelector"
          );
          $("#evaluate_page_3 .content .form button").prop("disabled", true);
          $("#CVD1N").addClass("btnSelector");
          $("#CVD1N").addClass("btnDisabled");
          $("#CVD1N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#CVD2N").addClass("btnSelector");
          $("#CVD2N").addClass("btnDisabled");
          $("#CVD2N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#CVD3N").addClass("btnSelector");
          $("#CVD3N").addClass("btnDisabled");
          $("#CVD3N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#CVD4N").addClass("btnSelector");
          $("#CVD4N").addClass("btnDisabled");
          $("#CVD4N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#CVD5N").addClass("btnSelector");
          $("#CVD5N").addClass("btnDisabled");
          $("#CVD5N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#CVD6N").addClass("btnSelector");
          $("#CVD6N").addClass("btnDisabled");
          $("#CVD6N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#CVD7N").addClass("btnSelector");
          $("#CVD7N").addClass("btnDisabled");
          $("#CVD7N").prepend(
            '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
          );
          $("#evaluate_page_3 .evaluate_page_status ").show();
          $("#evaluate_page_3 .footer").show();
          $("#evaluate_page_3 .step-footer").hide();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_3 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_3 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_3 .content .form img").remove();
    $("#evaluate_page_3 .content .form button").removeClass("btnSelector");
    $("#evaluate_page_3 .content .form button").removeClass("btnDisabled");
    $("#evaluate_page_3 .content .form button").prop("disabled", false);
    $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
    $("#evaluate_page_3 .evaluate_page_status ").hide();
    $("#evaluate_page_3 .footer").hide();
    $("#evaluate_page_3 .step-footer").show();
  });
  // answer CVD1
  $("#CVD1N").on("click", function () {
    toggleBtnAnsEva("CVD1", "CVD1N");
  });
  $("#CVD1Y").on("click", function () {
    toggleBtnAnsEva("CVD1", "CVD1Y");
  });
  // answer CVD2
  $("#CVD2N").on("click", function () {
    toggleBtnAnsEva("CVD2", "CVD2N");
  });
  $("#CVD2Y").on("click", function () {
    toggleBtnAnsEva("CVD2", "CVD2Y");
  });
  // answer CVD3
  $("#CVD3N").on("click", function () {
    toggleBtnAnsEva("CVD3", "CVD3N");
  });
  $("#CVD3Y").on("click", function () {
    toggleBtnAnsEva("CVD3", "CVD3Y");
  });
  // answer CVD4
  $("#CVD4N").on("click", function () {
    toggleBtnAnsEva("CVD4", "CVD4N");
  });
  $("#CVD4Y").on("click", function () {
    toggleBtnAnsEva("CVD4", "CVD4Y");
  });
  // answer CVD5
  $("#CVD5N").on("click", function () {
    toggleBtnAnsEva("CVD5", "CVD5N");
  });
  $("#CVD5Y").on("click", function () {
    toggleBtnAnsEva("CVD5", "CVD5Y");
  });
  // answer CVD6
  $("#CVD6N").on("click", function () {
    toggleBtnAnsEva("CVD6", "CVD6N");
  });
  $("#CVD6Y").on("click", function () {
    toggleBtnAnsEva("CVD6", "CVD6Y");
  });
  // answer CVD7
  $("#CVD7N").on("click", function () {
    toggleBtnAnsEva("CVD7", "CVD7N");
  });
  $("#CVD7Y").on("click", function () {
    toggleBtnAnsEva("CVD7", "CVD7Y");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $(".answer button").on("click", function () {
    if (
      $("#CVD1Y").hasClass("btnSelector") ||
      $("#CVD1N").hasClass("btnSelector") ||
      $("#CVD2Y").hasClass("btnSelector") ||
      $("#CVD2N").hasClass("btnSelector") ||
      $("#CVD3Y").hasClass("btnSelector") ||
      $("#CVD3N").hasClass("btnSelector") ||
      $("#CVD4Y").hasClass("btnSelector") ||
      $("#CVD4N").hasClass("btnSelector") ||
      $("#CVD5Y").hasClass("btnSelector") ||
      $("#CVD5N").hasClass("btnSelector") ||
      $("#CVD6Y").hasClass("btnSelector") ||
      $("#CVD6N").hasClass("btnSelector") ||
      $("#CVD7Y").hasClass("btnSelector") ||
      $("#CVD7N").hasClass("btnSelector")
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
      $("#evaluate_page_3 .content .form img").remove();
      $("#evaluate_page_3 .content .form button").removeClass("btnSelector");
      $("#evaluate_page_3 .content .form button").prop("disabled", true);
      $("#CVD1N").addClass("btnSelector");
      $("#CVD1N").addClass("btnDisabled");
      $("#CVD1N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
      $("#CVD2N").addClass("btnSelector");
      $("#CVD2N").addClass("btnDisabled");
      $("#CVD2N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
      $("#CVD3N").addClass("btnSelector");
      $("#CVD3N").addClass("btnDisabled");
      $("#CVD3N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
      $("#CVD4N").addClass("btnSelector");
      $("#CVD4N").addClass("btnDisabled");
      $("#CVD4N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
      $("#CVD5N").addClass("btnSelector");
      $("#CVD5N").addClass("btnDisabled");
      $("#CVD5N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
      $("#CVD6N").addClass("btnSelector");
      $("#CVD6N").addClass("btnDisabled");
      $("#CVD6N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
      $("#CVD7N").addClass("btnSelector");
      $("#CVD7N").addClass("btnDisabled");
      $("#CVD7N").prepend(
        '<img class="btnIconSelector" src="img/check_icon_disabled.png" />'
      );
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

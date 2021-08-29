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
          $("#CVD1N").addClass("active");
          $("#CVD2N").addClass("active");
          $("#CVD3N").addClass("active");
          $("#CVD4N").addClass("active");
          $("#CVD5N").addClass("active");
          $("#CVD6N").addClass("active");
          $("#CVD7N").addClass("active");
          $("#evaluate_page_3 button.choice").prop("disabled", true);
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
    $("#evaluate_page_3 button.choice").prop("disabled", false);
    $("#evaluate_page_3 button.choice").removeClass("active");
    $("#evaluate_page_3 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
    $("#evaluate_page_3 .evaluate_page_status ").hide();
    $("#evaluate_page_3 .footer").hide();
    $("#evaluate_page_3 .step-footer").show();
  });
  $("#evaluate_page_3 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_3 .btn-group button").on("click", function () {
    if ($("#evaluate_page_3 button.choice").hasClass("active")) {
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
      $("#evaluate_page_3 button.choice").removeClass("active");
      $("#CVD1N").addClass("active");
      $("#CVD2N").addClass("active");
      $("#CVD3N").addClass("active");
      $("#CVD4N").addClass("active");
      $("#CVD5N").addClass("active");
      $("#CVD6N").addClass("active");
      $("#CVD7N").addClass("active");
      $("#evaluate_page_3 button.choice").prop("disabled", true);
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

  /* ----------------------------------------------------------------------------- start : evaluate_page_4 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_4
  $(".visit_card.current .card_body.evaluate")
    .eq(3)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_4", function () {
          checkImg();
          $("#evaluate_page_4 .step-footer .btn_group .submit").prop(
            "disabled",
            true
          );
          $(".image_upload_preview").attr("disabled", "disabled");
          $("button.camera").hide();

          $("#evaluate_page_4 input[type='checkbox']").prop("disabled", true);
          $("#evaluate_page_4 button.choice").prop("disabled", true);
          $("#evaluate_page_4 .step-footer").hide();

          $("#evaluate_page_4 .evaluate_page_status ").show();
          $("#evaluate_page_4 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  //add img
  $("button.camera").on("click", function () {
    showModal("modal-img-eva4");
  });
  $("#evaluate_page_4 .on_camera").on("click", function () {
    $(".image_upload_preview").append('<img  src="img/1.jpg"/>');

    checkImg();
    $(".modal-dismiss").click();
  });
  $("#evaluate_page_4 .on_gallery").on("click", function () {
    $(".image_upload_preview").append('<img  src="img/1.jpg"/>');

    checkImg();
    $(".modal-dismiss").click();
  });

  //remove img

  $(".image_upload_preview .dismiss").on("click", function () {
    console.log($(".image_upload_preview").attr("disabled"));
    if ($(".image_upload_preview").attr("disabled") == "disabled") {
      return false;
    } else {
      $(".image_upload_preview img").remove();
      $(".image_upload_preview").hide();
      $("button.camera").show();
    }
  });
  // ปุ่ม back
  $("#evaluate_page_4 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_4 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_4 input[type='checkbox']").prop("disabled", false);
    $("#evaluate_page_4 input[type='radio']").prop("disabled", false);
    $("#evaluate_page_4 button.choice").prop("disabled", false);
    $(".image_upload_preview").removeAttr("disabled");
    checkImg();
    $("#evaluate_page_4 .evaluate_page_status ").hide();
    $("#evaluate_page_4 .footer").hide();
    $("#evaluate_page_4 .step-footer").show();
  });
  $("#evaluate_page_4 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_4 .btn-group button").on("click", function () {
    if ($("#evaluate_page_4 button.choice").hasClass("active")) {
      $("#evaluate_page_4 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_4 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_4 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_4 .evaluate_page_status ").hide();
    }
  });
  $('input[type="checkbox"]').change(function () {
    $("#evaluate_page_4 .step-footer .btn_group .submit").prop(
      "disabled",
      false
    );
    $("#evaluate_page_5 .evaluate_page_status ").show();
  });
  $(".image_upload_preview img").click(function () {
    var src = $(this).attr("src");
    var modal;

    function removeModal() {
      modal.remove();
      $("body").off("keyup.modal-close");
    }
    modal = $("<div>")
      .css({
        background: "RGBA(0,0,0,1) url(" + src + ") no-repeat center",
        backgroundSize: "contain",
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: "10000",
        top: "0",
        left: "0",
        cursor: "zoom-out",
      })
      .click(function () {
        removeModal();
      })
      .appendTo("body");
    //handling ESC
    $("body").on("keyup.modal-close", function (e) {
      if (e.key === "Escape") {
        removeModal();
      }
    });
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_4 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $(".image_upload_preview").attr("disabled", "disabled");
      $("#evaluate_page_4 input[type='checkbox']").prop("disabled", true);
      $("#evaluate_page_4 button.choice").prop("disabled", true);
      $("#evaluate_page_4 .evaluate_page_status ").show();
      $("#evaluate_page_4 .footer").show();
      $("#evaluate_page_4 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_4 .step-footer .btn_group .submit").on(
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_4 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_5 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_5
  $(".visit_card.current .card_body.evaluate")
    .eq(4)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_5", function () {
          $("#P9Q1_0").prop("checked", true);
          $("#P9Q2_0").prop("checked", true);
          $("#P9Q3_0").prop("checked", true);
          $("#P9Q4_0").prop("checked", true);
          $("#P9Q5_0").prop("checked", true);
          $("#P9Q6_0").prop("checked", true);
          $("#P9Q7_0").prop("checked", true);
          $("#P9Q8_0").prop("checked", true);
          $("#P9Q9_0").prop("checked", true);
          $('#evaluate_page_5 input[type="radio"]').prop("disabled", true);
          $("#evaluate_page_5 button.choice").removeClass("active");
          $("#P2Q1N").addClass("active");
          $("#P2Q2N").addClass("active");
          $("#evaluate_page_5 button.choice").prop("disabled", true);
          $("#evaluate_page_5 .evaluate_page_status ").show();
          $("#evaluate_page_5 .footer").show();
          $("#evaluate_page_5 .step-footer").hide();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_5 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_5 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_5 button.choice").prop("disabled", false);
    $('#evaluate_page_5 input[type="radio"]').prop("disabled", false);
    $('#evaluate_page_5 input[type="radio"]').prop("checked", false);
    $("#evaluate_page_5 button.choice").removeClass("active");
    $("#evaluate_page_5 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
    $("#evaluate_page_5 .evaluate_page_status ").hide();
    $("#evaluate_page_5 .footer").hide();
    $("#evaluate_page_5 .step-footer").show();
  });
  $("#evaluate_page_5 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_5 .btn-group button").on("click", function () {
    if ($("#evaluate_page_5 button.choice").hasClass("active")) {
      $("#evaluate_page_5 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_5 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_5 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_5 .evaluate_page_status ").hide();
    }
  });
  $('input[type="radio"]').change(function () {
    $("#evaluate_page_5 .step-footer .btn_group .submit").prop(
      "disabled",
      false
    );
    $("#evaluate_page_5 .evaluate_page_status ").show();
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_5 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#P9Q1_0").prop("checked", true);
      $("#P9Q2_0").prop("checked", true);
      $("#P9Q3_0").prop("checked", true);
      $("#P9Q4_0").prop("checked", true);
      $("#P9Q5_0").prop("checked", true);
      $("#P9Q6_0").prop("checked", true);
      $("#P9Q7_0").prop("checked", true);
      $("#P9Q8_0").prop("checked", true);
      $("#P9Q9_0").prop("checked", true);
      $('#evaluate_page_5 input[type="radio"]').prop("disabled", true);
      $("#evaluate_page_5 button.choice").removeClass("active");
      $("#P2Q1N").addClass("active");
      $("#P2Q2N").addClass("active");
      $("#evaluate_page_5 button.choice").prop("disabled", true);
      $("#evaluate_page_5 .evaluate_page_status ").show();
      $("#evaluate_page_5 .footer").show();
      $("#evaluate_page_5 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_5 .step-footer .btn_group .submit").on(
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_5 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_6 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_6
  $(".visit_card.current .card_body.evaluate")
    .eq(5)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_6", function () {
          $("#evaluate_page_6 button.choice").prop("disabled", true);
          $("#evaluate_page_6 .step-footer").hide();
          $("#evaluate_page_6 .evaluate_page_status ").show();
          $("#evaluate_page_6 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_6 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_6 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_6 button.choice").prop("disabled", false);
    $("#evaluate_page_6 .evaluate_page_status ").hide();
    $("#evaluate_page_6 .footer").hide();
    $("#evaluate_page_6 .step-footer").show();
    $("#evaluate_page_6 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_6 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_6 .btn-group button").on("click", function () {
    if ($("#evaluate_page_6 button.choice").hasClass("active")) {
      $("#evaluate_page_6 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_6 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_6 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_6 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_6 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#evaluate_page_6 button.choice").prop("disabled", true);
      $("#evaluate_page_6 .evaluate_page_status ").show();
      $("#evaluate_page_6 .footer").show();
      $("#evaluate_page_6 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_6 .step-footer .btn_group .submit").on(
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_6 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_7 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_7
  $(".visit_card.current .card_body.evaluate")
    .eq(6)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_7", function () {
          $("#evaluate_page_7 .run_time button.btn_reset").prop(
            "disabled",
            true
          );
          $("#evaluate_page_7 .run_time button.play_stop").prop(
            "disabled",
            true
          );
          $("#evaluate_page_7 .step-footer").hide();
          $("#evaluate_page_7 .evaluate_page_status ").show();
          $("#evaluate_page_7 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_7 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_7 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_7 .run_time button.play_stop").prop("disabled", false);
    $("#evaluate_page_7 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
    $("#evaluate_page_7 .evaluate_page_status ").hide();
    $("#evaluate_page_7 .footer").hide();
    $("#evaluate_page_7 .step-footer").show();
  });
  // ปุ่ม เริ่มนับเวลา
  $("#evaluate_page_7 .run_time button.play_stop").on("click", function () {
    if ($("#evaluate_page_7 .run_time button.play_stop").hasClass("active")) {
      $("#evaluate_page_7 .run_time button.play_stop").removeClass("active");
      $("#evaluate_page_7 .run_time button.btn_reset").prop("disabled", false);
      $("#evaluate_page_7 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_7 .step-footer .btn_group .cancel").prop(
        "disabled",
        false
      );
      runTimeEva_7(true);
    } else {
      $("#evaluate_page_7 .run_time button.btn_reset").prop("disabled", true);
      $("#evaluate_page_7 .run_time button.play_stop").addClass("active");
      $("#evaluate_page_7 .run_time .time").addClass("active");
      runTimeEva_7(false);
      $("#evaluate_page_7 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_7 .step-footer .btn_group .cancel").prop(
        "disabled",
        true
      );
    }
  });
  // ปุ่ม รีเซ็ต
  $("#evaluate_page_7 .run_time button.btn_reset").on("click", function () {
    _timeEva7 = "00";
    _countEva7 = 0;
    runTimeEva_7(true);
    $("#evaluate_page_7 .run_time button.play_stop").removeClass("active");
    $("#evaluate_page_7 .run_time .time").removeClass("active");
    $("#evaluate_page_7 .run_time button.btn_reset").prop("disabled", true);
    $("#evaluate_page_7 .run_time .time p").text(_timeEva7);
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_7 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      _timeEva7 = "00";
      _countEva7 = 0;
      runTimeEva_7(true);
      $("#evaluate_page_7 .run_time button.play_stop").removeClass("active");
      $("#evaluate_page_7 .run_time .time").removeClass("active");
      $("#evaluate_page_7 .run_time .time p").text(_timeEva7);
      $("#evaluate_page_7 .run_time button.btn_reset").prop("disabled", true);
      $("#evaluate_page_7 .run_time button.play_stop").prop("disabled", true);
      $("#evaluate_page_7 .step-footer").hide();
      $("#evaluate_page_7 .evaluate_page_status ").show();
      $("#evaluate_page_7 .footer.evaluate_page_footer ").show();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_7 .step-footer .btn_group .submit").on(
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
  var _addIntervalTimeEva7;
  var _timeEva7 = "00";
  var _countEva7 = 0;
  function runTimeEva_7(stop) {
    if (stop) {
      clearInterval(_addIntervalTimeEva7);
    } else {
      _addIntervalTimeEva7 = setInterval(function () {
        _countEva7++;
        if (_countEva7 == 180) {
          clearInterval(_addInterval);
        }
        if (_countEva7 < 10) {
          _timeEva7 = "0" + _countEva7;
        } else {
          _timeEva7 = _countEva7.toString();
        }
        $("#evaluate_page_7 .run_time .time p").text(_timeEva7);
      }, 1000);
    }
  }
  /* ----------------------------------------------------------------------------- end : evaluate_page_7 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_8 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_8
  $(".visit_card.current .card_body.evaluate")
    .eq(7)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_8", function () {
          $("#evaluate_page_8 button.choice").prop("disabled", true);
          $("#evaluate_page_8 .step-footer").hide();
          $("#evaluate_page_8 .evaluate_page_status ").show();
          $("#evaluate_page_8 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_8 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_8 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_8 button.choice").prop("disabled", false);
    $("#evaluate_page_8 .evaluate_page_status ").hide();
    $("#evaluate_page_8 .footer").hide();
    $("#evaluate_page_8 .step-footer").show();
    $("#evaluate_page_8 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_8 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_8 .btn-group button").on("click", function () {
    if ($("#evaluate_page_8 button.choice").hasClass("active")) {
      $("#evaluate_page_8 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_8 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_8 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_8 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_8 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#evaluate_page_8 button.choice").prop("disabled", true);
      $("#evaluate_page_8 .evaluate_page_status ").show();
      $("#evaluate_page_8 .footer").show();
      $("#evaluate_page_8 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_8 .step-footer .btn_group .submit").on(
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_8 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_9 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_9
  $(".visit_card.current .card_body.evaluate")
    .eq(8)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_9", function () {
          $("#evaluate_page_9 button.choice").prop("disabled", true);
          $("#evaluate_page_9 .step-footer").hide();
          $("#evaluate_page_9 .evaluate_page_status ").show();
          $("#evaluate_page_9 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_9 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_9 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_9 button.choice").prop("disabled", false);
    $("#evaluate_page_9 .evaluate_page_status ").hide();
    $("#evaluate_page_9 .footer").hide();
    $("#evaluate_page_9 .step-footer").show();
    $("#evaluate_page_9 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_9 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_9 .btn-group button").on("click", function () {
    if ($("#evaluate_page_9 button.choice").hasClass("active")) {
      $("#evaluate_page_9 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_9 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_9 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_9 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_9 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#evaluate_page_9 button.choice").prop("disabled", true);
      $("#evaluate_page_9 .evaluate_page_status ").show();
      $("#evaluate_page_9 .footer").show();
      $("#evaluate_page_9 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_9 .step-footer .btn_group .submit").on(
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_9 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_10 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_10
  $(
    ".visit_card.current .card_body.evaluate ,.visit_card.current .card_body.evaluate_pending"
  )
    .eq(9)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_10", function () {
          $("#evaluate_page_10 button.choice").prop("disabled", true);
          $("#evaluate_page_10 .step-footer").hide();
          $("#evaluate_page_10 .evaluate_page_status ").show();
          $("#evaluate_page_10 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_10 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_10 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_10 button.choice").prop("disabled", false);
    $("#evaluate_page_10 .evaluate_page_status ").hide();
    $("#evaluate_page_10 .footer").hide();
    $("#evaluate_page_10 .step-footer").show();
    $("#evaluate_page_10 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_10 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_10 .btn-group button").on("click", function () {
    if ($("#evaluate_page_10 button.choice").hasClass("active")) {
      $("#evaluate_page_10 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_10 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_10 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_10 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_10 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#evaluate_page_10 button.choice").prop("disabled", true);
      $("#evaluate_page_10 .evaluate_page_status ").show();
      $("#evaluate_page_10 .footer").show();
      $("#evaluate_page_10 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_10 .step-footer .btn_group .submit").on(
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
  /* ----------------------------------------------------------------------------- end : evaluate_page_10 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_11 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_11
  $(
    ".visit_card.current .card_body.evaluate ,.visit_card.current .card_body.evaluate_pending"
  )
    .eq(10)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_11", function () {
          $("#evaluate_page_11 button.choice").prop("disabled", true);
          $("#evaluate_page_11 .step-footer").hide();
          $("#evaluate_page_11 .evaluate_page_status ").show();
          $("#evaluate_page_11 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_11 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_11 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_11 button.choice").prop("disabled", false);
    $("#evaluate_page_11 .evaluate_page_status ").hide();
    $("#evaluate_page_11 .footer").hide();
    $("#evaluate_page_11 .step-footer").show();
    $("#evaluate_page_11 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_11 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_11 .btn-group button").on("click", function () {
    if ($("#evaluate_page_11 button.choice").hasClass("active")) {
      $("#evaluate_page_11 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_11 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_11 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_11 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_11 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#evaluate_page_11 button.choice").prop("disabled", true);
      $("#evaluate_page_11 .evaluate_page_status ").show();
      $("#evaluate_page_11 .footer").show();
      $("#evaluate_page_11 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_11 .step-footer .btn_group .submit").on(
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
  $("#evaluate_page_11 .choice").click(function () {
    if ($(this).attr("value") == "0" && $(this).attr("target")) {
      $("#eva11_sub_" + $(this).attr("target")).hide();
    } else if ($(this).attr("value") == "1" && $(this).attr("target")) {
      $("#eva11_sub_" + $(this).attr("target")).show();
    }
  });
  /* ----------------------------------------------------------------------------- end : evaluate_page_11 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_12 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_12
  $(
    ".visit_card.current .card_body.evaluate ,.visit_card.current .card_body.evaluate_pending"
  )
    .eq(11)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_12", function () {
          $("#evaluate_page_12 button.choice").prop("disabled", true);
          $("#evaluate_page_12 .step-footer").hide();
          $("#evaluate_page_12 .evaluate_page_status ").show();
          $("#evaluate_page_12 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_12 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_12 .footer .btn_create_evaluate").on("click", function () {
    $("#evaluate_page_12 button.choice").prop("disabled", false);
    $("#evaluate_page_12 .evaluate_page_status ").hide();
    $("#evaluate_page_12 .footer").hide();
    $("#evaluate_page_12 .step-footer").show();
    $("#evaluate_page_12 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_12 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $("#evaluate_page_12 .btn-group button").on("click", function () {
    if ($("#evaluate_page_12 button.choice").hasClass("active")) {
      $("#evaluate_page_12 .step-footer .btn_group .submit").prop(
        "disabled",
        false
      );
      $("#evaluate_page_12 .evaluate_page_status ").show();
    } else {
      $("#evaluate_page_12 .step-footer .btn_group .submit").prop(
        "disabled",
        true
      );
      $("#evaluate_page_12 .evaluate_page_status ").hide();
    }
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_12 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $("#evaluate_page_12 button.choice").prop("disabled", true);
      $("#evaluate_page_12 .evaluate_page_status ").show();
      $("#evaluate_page_12 .footer").show();
      $("#evaluate_page_12 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_12 .step-footer .btn_group .submit").on(
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
  $("#evaluate_page_12 .choice").click(function () {
    if ($(this).attr("value") == "0" && $(this).attr("target")) {
      $("#eva12_sub_" + $(this).attr("target")).hide();
    } else if ($(this).attr("value") == "1" && $(this).attr("target")) {
      $("#eva12_sub_" + $(this).attr("target")).show();
    }
  });
  /* ----------------------------------------------------------------------------- end : evaluate_page_12 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_13 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_13
  $(
    ".visit_card.current .card_body.evaluate ,.visit_card.current .card_body.evaluate_pending"
  )
    .eq(12)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page_13", function () {
          $('#evaluate_page_13 input[type="radio"]').prop("disabled", true);
          $("#evaluate_page_13 .step-footer").hide();
          $("#evaluate_page_13 .evaluate_page_status ").show();
          $("#evaluate_page_13 .footer.evaluate_page_footer ").show();
        });
      }, 500);
    });
  // ปุ่ม back
  $("#evaluate_page_13 .evaluate_page_header .back_header_btn").on(
    "click",
    function () {
      showModal("modal-evaluate-alert");
    }
  );
  // ปุ่ม เริ่มประเมินใหม่
  $("#evaluate_page_13 .footer .btn_create_evaluate").on("click", function () {
    $('#evaluate_page_13 input[type="radio"]').prop("disabled", false);
    $("#evaluate_page_13 .evaluate_page_status ").hide();
    $("#evaluate_page_13 .footer").hide();
    $("#evaluate_page_13 .step-footer").show();
    $("#evaluate_page_13 .step-footer .btn_group .submit").prop(
      "disabled",
      true
    );
  });
  $("#evaluate_page_13 button.choice").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
  // เช็คค่าในแบบประเมินเพื่อเปิดปุ่มบันทึก
  $('input[type="radio"]').change(function () {
    $("#evaluate_page_13 .step-footer .btn_group .submit").prop(
      "disabled",
      false
    );
    $("#evaluate_page_13 .evaluate_page_status ").show();
  });
  // ปุ่ม ยกเลิก
  $("#evaluate_page_13 .step-footer .btn_group .cancel").on(
    "click",
    function () {
      $('#evaluate_page_13 input[type="radio"]').prop("disabled", true);
      $("#evaluate_page_13 .evaluate_page_status ").show();
      $("#evaluate_page_13 .footer").show();
      $("#evaluate_page_13 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_13 .step-footer .btn_group .submit").on(
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
  $("#evaluate_page_13 .choice").click(function () {
    if ($(this).attr("value") == "0" && $(this).attr("target")) {
      $("#eva13_sub_" + $(this).attr("target")).hide();
    } else if ($(this).attr("value") == "1" && $(this).attr("target")) {
      $("#eva13_sub_" + $(this).attr("target")).show();
    }
  });
  /* ----------------------------------------------------------------------------- end : evaluate_page_13 ----------------------------------------------------------------------------- */
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
  //check img
  function checkImg() {
    let img = $(".image_upload_preview img");
    if (img.length == 0) {
      $(".image_upload_preview").hide();
      $("button.camera").show();
    } else {
      $(".image_upload_preview").show();
      $("button.camera").hide();
    }
  }
});

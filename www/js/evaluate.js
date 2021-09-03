$(function () {
  $(".main_home_menu_item_wrapper img")
    .eq(0)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("evaluate_page", function () {
          initialEvaPage();
        });
      }, 500);
    });
  function initialEvaPage() {
    let data = localdata.data[1].elder;
    $.each(data, function (index, row) {
      $("#eva_waiting_list").append(renderElderCard(row));
    });

    setTimeout(function () {
      $("#evaluate_recommend").show();
      showModal("modal-evaluate-detail");
    }, 500);
  }
  $("#evaluate_page .collapse-filter .collapse-filter-header").click(
    function () {
      $header = $(this);
      $content = $header.next();
      $(".toggle", this).toggleClass("fa-chevron-up fa-chevron-down");
      $content.slideToggle(200, function () {});
    }
  );
  $("#evaluate_page .btn-sort").on("click", function () {
    showModal("modal-sort-evaluate");
  });

  $("#evaluate_page .contact_items").on("click", "li", function () {
    $("#modal-evaluate-detail .status-card").attr(
      "ELDER_ID",
      $(this).attr("ELDER_ID")
    );
    $("#evaluate_recommend").hide();
    $("#modal-evaluate-detail .thumbnail").attr(
      "src",
      $(this).find(".card-body-thumbnail").attr("src")
    );
    $("#modal-evaluate-detail .name").text($(this).find(".name").text());
    $("#modal-evaluate-detail .age").text($(this).find(".age").text());
    $("#modal-evaluate-detail .distant span").text("0.8 กิโลเมตร");
    if ($(this).find(".card-footer .status").eq(1).text() == "รอประเมิน...") {
      $("#modal-evaluate-detail .status-card-header").removeClass("inprogress");
      $("#modal-evaluate-detail .status-card-header").html(
        "<p><b>สถานะการประเมิน</b> : รอประเมิน...</p>"
      );
      $("#modal-evaluate-detail .status-card-body-content").html(`
                <h3>เริ่มประเมิน</h3>
                <p style="font-size:14px">
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                  ยังไม่มีข้อมูล
                </p>`);
    } else {
      $("#modal-evaluate-detail .status-card-header").addClass("inprogress");
      $("#modal-evaluate-detail .status-card-header").html(
        "<p><b>สถานะการประเมิน</b> : " + "ข้อที่ 9 (การได้ยิน)" + "</p>"
      );
      $("#modal-evaluate-detail .status-card-body-content").html(`
                <h3>ประเมินต่อ</h3>
                <p style="font-size:14px">
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                  18 ม.ค. 64, เวลา 14:28 น.
                </p>`);
    }
    showModal("modal-evaluate-detail");
  });
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
  $("#evaluate_page .status-card").on("click", function () {
    let elder_id = $(this).attr("ELDER_ID");
    let elderData = localdata.data[1].elder.find((item) => item.ID == elder_id);
    let evaluateData = [
      {
        evaNo: 1,
        evaName: "ประเมินโรคเบาหวาน",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 2,
        evaName: "ประเมินโรคความดันโลหิตสูง",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 3,
        evaName: "โรคหัวใจและหลอดเลือด",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 4,
        evaName: "สมองเสื่อม",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 5,
        evaName: "โรคซึมเศร้า",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 6,
        evaName: "โรคข้อเข่าเสื่อม",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 7,
        evaName: "ภาวะหกล้ม",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 8,
        evaName: "สุขภาวะทางตา",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 9,
        evaName: "การได้ยิน",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 10,
        evaName: "การประเมินปัญหาการนอน",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 11,
        evaName: "การประเมินสุขภาพช่องปาก",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 12,
        evaName: "ภาวะโภชนาการ",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
      {
        evaNo: 13,
        evaName: "การทํากิจวัตรประจําวัน",
        updateDate: "18 ม.ค. 64, เวลา 14:28 น.",
        recommend: "ปรกติ",
        last_data: {},
        total: localdata.data[1].evaluate1.filter(
          (item) => item.ELDER_ID == elder_id
        ).length,
      },
    ];

    $("#evaluate_detail_page .contact_items").html(renderElderCard(elderData));
    $(
      "#evaluate_detail_page .list_item_group .visit_card,#evaluate_detail_page .list_item_group .evaluate_card,#evaluate_detail_page .list_item_group hr"
    ).remove();
    for (let index = 0; index < evaluateData.length; index++) {
      const evaluate = evaluateData[index];
      console.log(evaluate);
      $("#evaluate_detail_page .list_item_group").append(function () {
        return $(`<div class="evaluate_card ${
          evaluate.total == 0
            ? "pending"
            : `${evaluate.recommend != "ปรกติ" ? "care_of_doctor" : ""}`
        }">
            <div class="card_header">
              <p><b>สถานะ :</b> ${
                evaluate.total > 0 ? "ผ่านการประเมินแล้ว" : "รอการประเมิน..."
              }</p>
              <div class="space"></div>
              ${
                evaluate.total > 0
                  ? `<div class="qty_evaluate">ประเมินแล้ว ${evaluate.total} ครั้ง</div>`
                  : ""
              }
              
            </div>
            <div class="card_body">
              <div class="card_body_left">
                <p><b class="no_evaluate">${evaluate.evaNo}</b></p>
              </div>
              <div class="card_body_center">
                <p>${evaluate.evaName}</p>
                <p>
                  <i class="fa fa-clock-o" aria-hidden="true"></i> อัพเดทเมื่อ :
                 ${evaluate.updateDate}
                </p>
              </div>
              ${
                evaluate.total > 0
                  ? `<div class="status-card-body-btn-evaluate">
              <i class="fa fa-chevron-right"></i>
              </div>`
                  : ""
              }
              
            </div>
            ${
              evaluate.total > 0
                ? ` <div class="card-footer">
            <p>**คำแนะนำล่าสุด</p>
            <div class="space"></div>
            <div class="recommend"><p>${evaluate.recommend}</p></div>
            </div>`
                : ""
            }
           
            </div>
            <hr>`).on("click", function () {
          switch (index) {
            case 0:
              gotoEvaPage1();
              break;

            case 1:
              gotoEvaPage2();
              break;

            case 2:
              gotoEvaPage3();
              break;

            case 3:
              gotoEvaPage4();
              break;

            case 4:
              gotoEvaPage5();
              break;

            case 5:
              gotoEvaPage6();
              break;

            case 6:
              gotoEvaPage7();
              break;
            case 7:
              gotoEvaPage8();
              break;
            case 8:
              gotoEvaPage9();
              break;
            case 9:
              gotoEvaPage10();
              break;
            case 10:
              gotoEvaPage11();
              break;
            case 11:
              gotoEvaPage12();
              break;
            case 12:
              gotoEvaPage13();
              break;

            default:
              break;
          }
        });
      });
    }

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

  function gotoEvaPage1() {
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
  }
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
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 1,
        DTX: $("#DTX").val(),
        EVALUATE_FLAG: 1,
        EVALUATE_SCORE: $("#DTX").val(),
        EVALUATE_RESULT: "",
      };
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
  function gotoEvaPage2() {
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
  }
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
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 2,
        SBP: $("#blood_pressure_up").val(),
        DBP: $("#blood_pressure_down").val(),
        FLAGSBP: 1,
        RESULTSBP: "",
        SCORESBP: $("#blood_pressure_up").val(),
        FLAGDBP: 1,
        RESULTDBP: "",
        SCOREDBP: $("#blood_pressure_down").val(),
       
      };
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
  function gotoEvaPage3() {
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
  }
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
      let CVD1 =parseInt($("#CVD1 .choice.active").val()) 
      let CVD2 =parseInt($("#CVD2 .choice.active").val()) 
      let CVD3 =parseInt($("#CVD3 .choice.active").val()) 
      let CVD4 =parseInt($("#CVD4 .choice.active").val()) 
      let CVD5 =parseInt($("#CVD5 .choice.active").val()) 
      let CVD6 =parseInt($("#CVD6 .choice.active").val()) 
      let CVD7 =parseInt($("#CVD7 .choice.active").val()) 
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 3,
        CVD1:CVD1,
        CVD2:CVD2,
        CVD3:CVD3,
        CVD4:CVD4,
        CVD5:CVD5,
        CVD6:CVD6,
        CVD7:CVD7,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:CVD1+CVD2+CVD3+CVD4+CVD5+CVD6+CVD7,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage4() {
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
  }
  //add img
  $("button.camera").on("click", function () {
    showModal("modal-img-eva4");
  });
  $("#evaluate_page_4 .on_camera").on("click", function () {
    navigator.camera.getPicture(
      function (res) {
        $(".image_upload_preview").append(
          `<img  src="data:image/jpeg;base64,${res}"/>`
        );
        checkImg();
        $(".modal-dismiss").click();
      },
      function (err) {},
      {
        destinationType: Camera.DestinationType.DATA_URL,
      }
    );
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
    $("#evaluate_page_4 .evaluate_page_status ").show();
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
      let COG1A = parseInt($("#COG1A .choice.active").val()) 
      let COG1B = parseInt($("#COG1B .choice.active").val())
      let COG1C_PIC = $("#evaluate_page_4 .image_upload_preview img").attr('src')
      let COG2A = $("#COG2A").prop('checked') ? 1 : 0;
      let COG2B = $("#COG2B").prop('checked') ? 1 : 0;
      let COG2C = $("#COG2C").prop('checked') ? 1 : 0;
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 4,
        COG1A:COG1A,
        COG1B:COG1B,
        COG1C_PIC:COG1C_PIC,
        COG2A:COG2A,
        COG2B:COG2B,
        COG2C:COG2C,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:COG1A+COG1B+COG2A+COG2B+COG2C,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage5() {
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
  }
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
      let P2Q1=parseInt($("#P2Q1 .choice.active").val()) ;
      let P2Q2=parseInt($("#P2Q2 .choice.active").val()) ;
      let P9Q1=parseInt($('input[name="P9Q1"]:checked').val());
      let P9Q2=parseInt($('input[name="P9Q2"]:checked').val());
      let P9Q3=parseInt($('input[name="P9Q3"]:checked').val());
      let P9Q4=parseInt($('input[name="P9Q4"]:checked').val());
      let P9Q5=parseInt($('input[name="P9Q5"]:checked').val());
      let P9Q6=parseInt($('input[name="P9Q6"]:checked').val());
      let P9Q7=parseInt($('input[name="P9Q7"]:checked').val());
      let P9Q8=parseInt($('input[name="P9Q8"]:checked').val());
      let P9Q9=parseInt($('input[name="P9Q9"]:checked').val());
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 5,
        P2Q1:P2Q1,
        P2Q2:P2Q2,
        P9Q1:P9Q1,
        P9Q2:P9Q2,
        P9Q3:P9Q3,
        P9Q4:P9Q4,
        P9Q5:P9Q5,
        P9Q6:P9Q6,
        P9Q7:P9Q7,
        P9Q8:P9Q8,
        P9Q9:P9Q9,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:P2Q1+P2Q2+P9Q1+P9Q2+P9Q3+P9Q4+P9Q5+P9Q6+P9Q7+P9Q8+P9Q9,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage6() {
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
  }
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
      let OST1 = parseInt($("#OST1 .choice.active").val()) 
      let OST2 = parseInt($("#OST2 .choice.active").val())
      let OST3 = parseInt($("#OST3 .choice.active").val())
      let OST4 = parseInt($("#OST4 .choice.active").val())
      let OST5 = parseInt($("#OST5 .choice.active").val())
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 6,
        OST1:OST1,
        OST2:OST2,
        OST3:OST3,
        OST4:OST4,
        OST5:OST5,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:OST1+OST2+OST3+OST4+OST5,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage7() {
    loading.show();
    setTimeout(function () {
      loading.hide();
      changePage("evaluate_page_7", function () {
        $("#evaluate_page_7 .run_time button.btn_reset").prop("disabled", true);
        $("#evaluate_page_7 .run_time button.play_stop").prop("disabled", true);
        $("#evaluate_page_7 .step-footer").hide();
        $("#evaluate_page_7 .evaluate_page_status ").show();
        $("#evaluate_page_7 .footer.evaluate_page_footer ").show();
      });
    }, 500);
  }
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
      let TUG = parseInt($("#evaluate_page_7 .time p").text())
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 7,
        TUG:TUG,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:TUG,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage8() {
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
  }
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
      let EYE1 = parseInt($("#EYE1 .choice.active").val()) 
      let EYE2 = parseInt($("#EYE2 .choice.active").val())
      let EYE3L = parseInt($("#EYE3L .choice.active").val())
      let EYE3R = parseInt($("#EYE3R .choice.active").val())
      let EYE4L = parseInt($("#EYE4L .choice.active").val())
      let EYE4R = parseInt($("#EYE4R .choice.active").val())
      let EYE5L = parseInt($("#EYE5L .choice.active").val())
      let EYE5R = parseInt($("#EYE5R .choice.active").val())
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 8,
        EYE1:EYE1,
        EYE2:EYE2,
        EYE3L:EYE3L,
        EYE3R:EYE3R,
        EYE4L:EYE4L,
        EYE4R:EYE4R,
        EYE5L:EYE5L,
        EYE5R:EYE5R,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:EYE1+EYE2+EYE3L+EYE3R+EYE4L+EYE4R+EYE5L+EYE5R,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage9() {
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
  }
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
      let RUBL = parseInt($("#RUBL .choice.active").val()) 
      let RUBR = parseInt($("#RUBR .choice.active").val())
    
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO: 9,
        RUBL:RUBL,
        RUBR:RUBR,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:RUBL+RUBR,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage10() {
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
  }
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
      let OSR1A = $("#OSR1 .choice.active").val()==0?0:parseInt($("#OSR1A .choice.active").val()) 
      let OSR1B =  $("#OSR1 .choice.active").val()==0?0:parseInt($("#OSR1B .choice.active").val()) 
      let OSR1C =  $("#OSR1 .choice.active").val()==0?0:parseInt($("#OSR1C .choice.active").val()) 
      let OSR1D =  $("#OSR1 .choice.active").val()==0?0:parseInt($("#OSR1D .choice.active").val()) 
      let OSR2 = parseInt($("#OSR2 .choice.active").val()) 
    
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO:10,
        OSR1A:OSR1A,
        OSR1B:OSR1B,
        OSR1C:OSR1C,
        OSR1D:OSR1D,
        OSR2:OSR2,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:OSR1A+OSR1B+OSR1C+OSR1D+OSR2,
        EVALUATE_RESULT:"",
      };
      console.log(data)
      $("#evaluate_detail_page .footer.evaluate-success").show();
      changePage("evaluate_detail_page", function () {
        setTimeout(function () {
          $("#evaluate_detail_page .footer.evaluate-success").hide();
        }, 1000);
      });
    }
  );
  $("#evaluate_page_10 .choice").click(function () {
    if ($(this).attr("value") == "0" && $(this).attr("target")) {
      $("#eva10_sub_" + $(this).attr("target")).hide();
    } else if ($(this).attr("value") == "1" && $(this).attr("target")) {
      $("#eva10_sub_" + $(this).attr("target")).show();
    }
  });
  /* ----------------------------------------------------------------------------- end : evaluate_page_10 ----------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------- start : evaluate_page_11 ----------------------------------------------------------------------------- */
  // เปลี่ยนหน้าไป evaluate_page_11
  function gotoEvaPage11() {
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
  }
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
      let ORAL1A = $("#ORAL1 .choice.active").val()==0?0:parseInt($("#ORAL1A .choice.active").val()) 
      let ORAL1B =  $("#ORAL1 .choice.active").val()==0?0:parseInt($("#ORAL1B .choice.active").val()) 
      let ORAL1C =  $("#ORAL1 .choice.active").val()==0?0:parseInt($("#ORAL1C .choice.active").val()) 
      let ORAL2A =  $("#ORAL2 .choice.active").val()==0?0:parseInt($("#ORAL2A .choice.active").val()) 
      let ORAL2B =  $("#ORAL2 .choice.active").val()==0?0:parseInt($("#ORAL2B .choice.active").val()) 
      let ORAL2C =  $("#ORAL2 .choice.active").val()==0?0:parseInt($("#ORAL2C .choice.active").val()) 

    
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO:11,
        ORAL1A:ORAL1A,
        ORAL1B:ORAL1B,
        ORAL1C:ORAL1C,
        ORAL2A:ORAL2A,
        ORAL2B:ORAL2B,
        ORAL2C:ORAL2C,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:ORAL1A+ORAL1B+ORAL1C+ORAL2A+ORAL2B+ORAL2C,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage12() {
    loading.show();
    setTimeout(function () {
      loading.hide();
      changePage("evaluate_page_12", function () {
        $("#evaluate_page_12 button.choice").prop("disabled", true);
        $("#evaluate_page_12 input[type='radio']").prop("disabled", true);
        $("#evaluate_page_12 .step-footer").hide();
        $("#evaluate_page_12 .evaluate_page_status ").show();
        $("#evaluate_page_12 .footer.evaluate_page_footer ").show();
      });
    }, 500);
  }
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
    $("#evaluate_page_12 input[type='radio']").prop("disabled", false);
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
      $("#evaluate_page_12 input[type='radio']").prop("disabled", true);
      $("#evaluate_page_12 .evaluate_page_status ").show();
      $("#evaluate_page_12 .footer").show();
      $("#evaluate_page_12 .step-footer").hide();
    }
  );
  // ปุ่ม บันทึก
  $("#evaluate_page_12 .step-footer .btn_group .submit").on(
    "click",
    function () {
      let NUTRI1 = parseInt($("#NUTRI1 .choice.active").val()) 
      let NUTRI2 =  parseInt($("#NUTRI2 .choice.active").val()) 
      
      let MNA1A =  parseInt($('input[name="MNA1A"]:checked').val());
      let MNA1B =  parseInt($('input[name="MNA1B"]:checked').val());
      let MNA1C =  parseInt($('input[name="MNA1C"]:checked').val());
      let MNA1D =   parseInt($('input[name="MNA1D"]:checked').val());
      let MNA1E =   parseInt($('input[name="MNA1E"]:checked').val()); 
      let MNA1F =   parseInt($('input[name="MNA1F"]:checked').val()); 
      let MNA1G =  parseInt($('input[name="MNA1G"]:checked').val());
      let MNA2A =  parseInt($('input[name="MNA2A"]:checked').val());
      let MNA2B =   parseInt($('input[name="MNA2B"]:checked').val());
      let MNA2C =  parseInt($('input[name="MNA2C"]:checked').val());
      let MNA2D =  parseInt($('input[name="MNA2D"]:checked').val());
      let MNA2EA =  parseInt($('input[name="MNA2EA"]:checked').val());
      let MNA2EB =  parseInt($('input[name="MNA2EB"]:checked').val());
      let MNA2EC =   parseInt($('input[name="MNA2EC"]:checked').val());
      let MNA2F =   parseInt($('input[name="MNA2F"]:checked').val());
      let MNA2G =  parseInt($('input[name="MNA2G"]:checked').val());
      let MNA2H =   parseInt($('input[name="MNA2H"]:checked').val());
      let MNA2I =  parseInt($('input[name="MNA2I"]:checked').val());
      let MNA2J =   parseInt($('input[name="MNA2J"]:checked').val());
      let MNA2K =   parseInt($('input[name="MNA2K"]:checked').val());
      let MNA2L =   parseInt($('input[name="MNA2L"]:checked').val());
 
     
     

    
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO:12,
        NUTRI1:NUTRI1,
        NUTRI2:NUTRI2,
        MNA1A:MNA1A,
        MNA1B:MNA1B,
        MNA1C:MNA1C,
        MNA1D:MNA1D,
        MNA1E:MNA1E,
        MNA1F:MNA1F,
        MNA1G:MNA1G,
        MNA2A:MNA2A,
        MNA2B:MNA2B,
        MNA2C:MNA2C,
        MNA2D:MNA2D,
        MNA2EA:MNA2EA,
        MNA2EB:MNA2EB,
        MNA2EC:MNA2EC,
        MNA2F:MNA2F,
        MNA2G:MNA2G,
        MNA2H:MNA2H,
        MNA2I:MNA2I,
        MNA2J:MNA2J,
        MNA2K:MNA2K,
        MNA2L:MNA2L,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:NUTRI1+NUTRI2+MNA1A+ORAL2A+MNA1B+MNA1C+MNA1D+MNA1E+MNA1F+MNA1G+MNA2A+MNA2B+MNA2C+MNA2D+MNA2EA+MNA2EB+MNA2EC+MNA2F+MNA2G+MNA2H+MNA2I+MNA2J+MNA2K+MNA2L,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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
  function gotoEvaPage13() {
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
  }
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
      let ADL1 =  parseInt($('input[name="ADL1"]:checked').val());
      let ADL2 =  parseInt($('input[name="ADL2"]:checked').val());
      let ADL3 =  parseInt($('input[name="ADL3"]:checked').val());
      let ADL4 =   parseInt($('input[name="ADL4"]:checked').val());
      let ADL5 =   parseInt($('input[name="ADL5"]:checked').val()); 
      let ADL6 =   parseInt($('input[name="ADL6"]:checked').val()); 
      let ADL7 =  parseInt($('input[name="ADL7"]:checked').val());
      let ADL8 =  parseInt($('input[name="ADL8"]:checked').val());
      let ADL9 =   parseInt($('input[name="ADL9"]:checked').val());
      let ADL10 =  parseInt($('input[name="ADL10"]:checked').val());
    
    
      let data = {
        ELDER_ID: "",
        EVALUATE_DATE: "",
        EVALUATE_NO:13,
        ADL1:ADL1,
        ADL2:ADL2,
        ADL3:ADL3,
        ADL4:ADL4,
        ADL5:ADL5,
        ADL6:ADL6,
        ADL7:ADL7,
        ADL8:ADL8,
        ADL9:ADL9,
        ADL10:ADL10,
        EVALUATE_FLAG:"1",
        EVALUATE_SCORE:ADL1+ADL2+ADL3+ADL4+ADL5+ADL6+ADL7+ADL8+ADL9+ADL10,
        EVALUATE_RESULT:"",
      };
      console.log(data)
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

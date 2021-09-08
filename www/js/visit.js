$(function () {
  //contact list
  // changePage("visit_form_page", initialVisitFormPage);
  $(".main_home_menu_item_wrapper img")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
       
        changePage("visit_page", function () {
          initialVisitPage();
        });
      }, 500);
    });
  function initialVisitPage() {
    queryALL("VHV_TR_ELDER",function(elderList){
      console.log(elderList)
      let waitingList = elderList.filter((row)=>row.VISIT_STATUS==0)
      let visitedList = elderList.filter((row)=>row.VISIT_STATUS==1)
      $("#visit_page .waiting_list").html("");
      $("#visit_page .visited_list").html("");
      $("#visit_page .sort-bar h4 span").html(
        `${elderList.length} คน`
      );
      $("#visit_page .waiting_list_count").text(`...กำลังรอยู่ ${waitingList.length} คน`);
      $("#visit_page .visited_list_count").text(`จำนวน ${visitedList.length} คน`);
      $.each(waitingList, function (index, row) {
        $("#visit_page .waiting_list").append(renderElderCard(row));
      });
      $.each(visitedList, function (index, row) {
        $("#visit_page .visited_list").append(renderElderCard(row));
      });
      loading.hide();
      setTimeout(function () {
        let waitingListAndEvaluated =waitingList.filter(row=>row.EVALUATE_STATUS==1)
        if (waitingListAndEvaluated.length > 0) {
          renderElderModal(waitingListAndEvaluated[0],"modal-visit-detail",false,true);
          $("#visit_recommend").show();
        }
        // showModal("modal-visit-detail");
      }, 500);
      queryALL("VHV_MA_GIS_PROVINCE", function (res) {
        $("#visit_page .content .collapse-filter #visitSearchProvince").val(
          "จังหวัด " + res[0]["GIS_PROVINCENAME"]
        );
      });
      queryALL("VHV_MA_GIS_TUMBOL", function (res) {
        $("#visit_page .content .collapse-filter #visitSearchTumbol").val(
          "ตำบล " + res[0]["GIS_TUMBOLNAME"]
        );
      });
      queryALL("VHV_MA_SHPH_MOO", function (res) {
        $("#visit_page .content .collapse-filter #visitSearchMoo").val(
          "หมู่ที่ " + res[0]["SHPH_MOO"]
        );
      });
    })
    
  
   
  }
  $("#visit_page .collapse-filter .collapse-filter-header").click(function () {
    $header = $(this);
    $content = $header.next();
    $(".toggle", this).toggleClass("fa-chevron-up fa-chevron-down");
    $content.slideToggle(200, function () {});
  });
  $("#visit_page .btn-sort").on("click", function () {
    showModal("modal-sort-visit");
  });

    $("#visit_page .contact_items").on("click", "li", function () {
      queryByID("VHV_TR_ELDER", $(this).attr("ELDER_ID"), function (res) {
        renderElderModal(res,"modal-visit-detail",false,true);
      });
    });
  //visit detail
  $(".status-card.visit").on("click", function () {
    if($(this).attr("canvisit")=="true"){
      loading.show();
      reloadVisitList()
      setTimeout(function () {
        loading.hide();
        changePage("visit_detail_page", function () {
          readerAfterSaveVisit()
        });
      }, 500);
    }
    
  });
  function readerAfterSaveVisit() {
    $("#visit_detail_page .content .visit_status_bar span").text(
      " " + $("#visit_detail_page ul li span").eq(0).text()
    );
    queryByID(
      "VHV_TR_ELDER",
      $("#visit_page .status-card").attr("ELDER_ID"),
      function (res) {
        console.log(res);
        if (res.HEALTH_STATUS == 1) {
          console.log("แข็งแรง");
          $("#visit_detail_page .content .visit_status_bar img").attr(
            "src",
            "img/health_2_icon.png"
          );
          $("#visit_detail_page .content .visit_status_bar span").text(
            "แข็งแรง"
          );
        } else if (res.HEALTH_STATUS == 2) {
          console.log("พยุงเดิน");
          $("#visit_detail_page .content .visit_status_bar img").attr(
            "src",
            "img/health_3_icon.png"
          );
          $("#visit_detail_page .content .visit_status_bar span").text(
            "พยุงเดิน"
          );
        } else if (res.HEALTH_STATUS == 3) {
          console.log("ติดเตียง");
          $("#visit_detail_page .content .visit_status_bar img").attr(
            "src",
            "img/health_1_icon.png"
          );
          $("#visit_detail_page .content .visit_status_bar span").text(
            "ติดเตียง"
          );
        } else {
          $("#visit_detail_page .content .visit_status_bar span").text(
            "ไม่มีข้อมูล"
          );
        }
      }
    );
   
  }
  function reloadVisitList() {
    let elder_id = $("#modal-visit-detail .status-card").attr("ELDER_ID");
    let visitData = [];
    console.log(elder_id);
    queryALL("VHV_TR_ELDER", function (ELDER) {
      $("#visit_detail_page .contact_items").html(
        renderElderCard(
          ELDER.find((item) => item.ID == elder_id),
          false
        )
      );
    });
  }
  function initialVisitFormPage() {
    resetVisitForm();

    $(".visit_section1").on("click", function () {
      var selected = $(this).val();
      if (selected == "0") {
        disableNextVisit(false);
      } else {
        disableNextVisit(true);
      }
    });
    $('ul.visit_form li').each(function(i, obj) {
        $(this).children("input[type='radio']").on("click", function () {
          $(this).parent().parent().children('li').each(function(){
            $(this).children(".toggle_input_group").hide()
          })
          var selected = $(this).val();
          $(this).siblings('.toggle_input_group').show();
          $(this).siblings('.toggle_input_group').children("input").val("")
          $(this).siblings('.toggle_input_group').children("input").first().focus()
          
        });
        $(this).children("input[type='checkbox']").on("change", function () {
          if(this.checked) {
            $(this).siblings("input[type='text']").prop('disabled', false);
            $(this).siblings("input[type='text']").val("")
            $(this).siblings("input[type='text']").first().focus()
          }else{
            $(this).siblings("input[type='text']").prop('disabled', true);
            $(this).siblings("input[type='text']").val("")
          }
         
        })
    })
    $(".summarize_radio").on("click", function () {
      if ($(this).val()== 1) {
        $('.toggle_input_group.summarize').show()
        $('.toggle_input_group.summarize').find('input').first().focus();
      }else{
        $('.toggle_input_group.summarize').hide()
      }
    });
    
    $("#visit_section1_1_input").on("change paste keyup", function () {
      if ($(this).val().length != 0) {
        disableNextVisit(false);
      }else{
        disableNextVisit(true);
      }
    });
  }
  function resetVisitForm(steps) {
    setProgressVisit(1);
    var steps = $("#visit_form_page").steps({
      onFinish: function () {
        $("#visit_form_page .header .back_header_btn,.step-footer .step-btn.cancel").click();
      },
      onChange: function (currentIndex, newIndex, stepDirection) {
        $(".progress_complete").hide()
        $(".step-btn.next").addClass('arrow');
        $(".step-btn.prev").addClass('arrow');
        if(newIndex<6){
          showSummarizeHeader(false)
          $(".current_step_index_visit_form").text(newIndex + 1);
          if(newIndex==5){
            $(".next_step_index_visit_form").text('สรุป')
            $(".step-btn.next").removeClass('arrow');
          }else{
            $(".next_step_index_visit_form").text(newIndex+2);
          }
         
          $(".prev_step_index_visit_form").text(newIndex);
          if (currentIndex == 0) {
            $(".step-btn.cancel").show();
            $(".step-btn.prev").hide();
          } else if(currentIndex<6) {
            $(".step-btn.cancel").hide();
            $(".step-btn.prev").show();
          }
          setProgressVisit(currentIndex+1);
        }
        if(newIndex==6){
          showSummarizeHeader(true)
          $(".progress_complete").show()
          
          $(".prev_step_index_visit_form").text('แก้ไข');
          $(".step-btn.prev").removeClass('arrow');
         
        }
      
        return true;
      },
    });
    steps_api = steps.data("plugin_Steps");
    steps_api.setStepIndex(0);
    
  }
  function showSummarizeHeader(show){
    if(show){
      $('.step-app .header').hide()
      $('#visit_form_page .content').addClass('top0')
    }else{
      $('.step-app .header').show()
      $('#visit_form_page .content').removeClass('top0')
    }
   
  }
  $('.btn_add_problem').on('click',function(){
   
    let value =$('#summarize_input1').val()
    if(value.length!=0){
      pushProblem(value)
    }
    
  })
  $('.toggle_input_group.summarize.add .problem_dismiss').on('click',function(){
    $(this).parent().remove()
  })
  function pushProblem(value){;
    let index =  $('#visit_form_page .content_toggle_input_group .problem_list').children().length+1
    let element = `<div class="problem_wrapper">
    <div class="problem_index">
      ${index}
    </div>
    <label>${value}</label>
    <div class="problem_dismiss">
      <i class="fa fa-minus" aria-hidden="true"></i>
    </div>
  </div>`
    $('#visit_form_page .content_toggle_input_group .problem_list').append(element)
    $('#summarize_input1').val('')
    $('#summarize_input1').focus();
  }
  function setProgressVisit(percent) {
    var circle = document.querySelector('.progress_ring_circle_visit');
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
  
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    const offset = circumference - (percent*(100/6)/ 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
  function disableNextVisit(disabled) {
    $(".step-btn.next").prop("disabled", disabled);
  }
  $("#visit_page .header .back_header_btn").on("click", function () {
    $(".menu_home_page").click();
  });
  $("#visit_detail_page .header .back_header_btn").on("click", function () {
    changePage("visit_page", function () {
      // $("#visit_form_page").destroy();
    });
  });
  $("#visit_form_page .header .back_header_btn,.step-footer .step-btn.cancel").on("click", function () {
    changePage("visit_detail_page", function () {});
  });
  $("#visit_detail_page .visit_card").on("click", function () {
    $('.step-footer .btn_group.add').hide()
    $('.step-footer .btn_group.read').css('display', 'flex')
    initialVisitFormPage();
    $('#visit_form_page input[type="text"]').prop('readonly', true);
    $('#visit_form_page input[type="radio"]').prop('disabled', true);
    $('#visit_form_page input[type="checkbox"]').prop('disabled', true);
    
    $('.toggle_input_group.summarize').removeClass('add') 
    $('.toggle_input_group.summarize').addClass('read') 
    $('.toggle_input_group.summarize').show()
   
  
    changePage("visit_form_page", function () {});

  });
  $(".btn_create_visit").on("click", function () {
  
    $('.step-footer .btn_group.add').css('display', 'flex')
    $('.step-footer .btn_group.read').hide()
    initialVisitFormPage();
    $('#visit_form_page input[type="text"]').prop('readonly', false);
    $('#visit_form_page input[type="radio"]').prop('disabled', false);
    $('#visit_form_page input[type="checkbox"]').prop('disabled', false);

    $('#visit_form_page input[type="text"]').val('');
    $('#visit_form_page input[type="radio"]').prop('checked', false);
    $('#visit_form_page input[type="checkbox"]').prop('checked', false);
    $('.input_from_checkbox').prop('disabled', true);
    $('.toggle_input_group.summarize').hide()
    $('.toggle_input_group.summarize').removeClass('read') 
    $('.toggle_input_group.summarize').addClass('add') 
    changePage("visit_form_page", function () {});
  });
});

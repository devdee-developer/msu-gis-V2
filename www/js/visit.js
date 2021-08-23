$(function () {
  //contact list
  // changePage("visit_form_page", initialVisitFormPage);
  $(".main_home_menu_item_wrapper img")
    .eq(2)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("visit_page", function () {
          initialVisitPage();
        });
      }, 500);
    });
  function initialVisitPage() {
    $(".collapse-filter .collapse-filter-header").click(function () {
      $header = $(this);
      $content = $header.next();
      $(".toggle", this).toggleClass("fa-chevron-up fa-chevron-down");
      $content.slideToggle(200, function () {});
    });
    $(".btn-sort").on("click", function () {
      showModal("modal-sort-visit");
    });
    $(".contact_items")
      .find("li")
      .each(function (index) {
        $(this).click(function () {
          $("#visit_recommend").hide();
          showModal("modal-visit-detail");
        });
      });

    setTimeout(function () {
      $("#visit_recommend").show();
      showModal("modal-visit-detail");
    }, 500);

    //visit detail
    $(".ready-for-visit").on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("visit_detail_page", function () {});
      }, 500);
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
    $("#visit_section1_1_input").on("change paste keyup", function () {
      if ($(this).val().length != 0) {
        disableNextVisit(false);
      }
    });
  }
  function resetVisitForm(steps) {
    setProgressVisit(1);
    var steps = $("#visit_form_page").steps({
      onFinish: function () {
        alert("complete");
      },
      onChange: function (currentIndex, newIndex, stepDirection) {
        $(".progress_complete").hide()
        $(".step-btn.next").addClass('arrow');
        $(".step-btn.prev").addClass('arrow');
        if(newIndex<6){
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
      $("#visit_form_page").destroy();
    });
  });
  $("#visit_form_page .header .back_header_btn,.step-footer .step-btn.cancel").on("click", function () {
    changePage("visit_detail_page", function () {});
  });
  $(".btn_create_visit").on("click", function () {
    initialVisitFormPage();
    changePage("visit_form_page", function () {});
  });
});

$(function () {
  $(".main_home_menu_item_wrapper img")
    .eq(3)
    .on("click", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        changePage("urgent_noti_page", function () {
          initSlideUrgentNotiPage();
          initialUrgentNotiPageFunc();

          // showModal("modal-tutorial-urgent-noti");
        });
      }, 500);
    });
});
var markerOriginal;
var infowindowOriginal;
var markerDestination;
var infowindowDestination;

var directionsService;
var directionsRenderer;
var featuresUrgentNoti;
var iconsUrgentNoti;
function initialUrgentNotiPageFunc() {
  initMapUrgentNotiPage();
  if (directionsRenderer) {
    directionsRenderer.setDirections({ routes: [] });
  }
  if (markerOriginal) {
    markerOriginal.setOptions({ visible: false });
  }
  if (markerDestination) {
    markerDestination.setOptions({ visible: false });
  }
  if (infowindowOriginal) {
    infowindowOriginal.close();
  }
  if (infowindowDestination) {
    infowindowDestination.close();
  }
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  $("#urgent_noti_page .step-footer .btn_group .submit").prop("disabled", true);
  $("#urgent_noti_page .content .elder_detail").hide();
  $("#urgent_noti_page .DetailElder").show();
  $("#urgent_noti_page .mapContent").removeClass("active");
  $("#urgent_noti_page .content").removeClass("active");
  $("#urgent_noti_page .content .backformap").hide();
  $("#urgent_noti_page .UrgentDetailElder").hide();
  $("#urgent_noti_page .urgent_detail_noti_page_header").hide();
  $("#urgent_noti_page .urgent_noti_page_header").show();
  $("#urgent_noti_page .notifications-card-body").removeClass("active");
  $("#urgent_noti_page .swiper_elder_content").show();
  $("#urgent_noti_page .swiper_elder_content_fixed").hide();
  $("#urgent_noti_page .content .backformap button").hide();
  $("#urgent_noti_page .content .backformap .backformap_btn").show();
  $("#urgent_noti_page .urgent_noti_page_header .title").show();
  $("#urgent_noti_page .urgent_noti_page_header .noti_header_btn").show();
  disabledElderUrgentNotiPageFunc();
  queryALL("VHV_TR_ELDER", function (res) {
    $("#urgent_noti_page .content .mapContent .swiper_elder_content").append(
      // `<div class="swiper swiper_urgent_noti">
      //         <div class="swiper-wrapper">
      //           <div class="swiper-slide">Slide 1</div>
      //           <div class="swiper-slide">Slide 2</div>
      //           <div class="swiper-slide">Slide 3</div>
      //           <div class="swiper-slide">Slide 4</div>
      //           <div class="swiper-slide">Slide 5</div>
      //           <div class="swiper-slide">Slide 6</div>
      //           <div class="swiper-slide">Slide 7</div>
      //           <div class="swiper-slide">Slide 8</div>
      //           <div class="swiper-slide">Slide 9</div>
      //         </div>
      //       </div>`
      renderElderCardUrgentNoti(res)
    );
    // $("#urgent_noti_page .content .mapContent .swiper_elder_content").append(
    //   `<div class="swiper swiper_urgent_noti">
    //           <div class="swiper-wrapper">
    //             <div class="swiper-slide">Slide 1</div>
    //             <div class="swiper-slide">Slide 2</div>
    //             <div class="swiper-slide">Slide 3</div>
    //             <div class="swiper-slide">Slide 4</div>
    //             <div class="swiper-slide">Slide 5</div>
    //             <div class="swiper-slide">Slide 6</div>
    //             <div class="swiper-slide">Slide 7</div>
    //             <div class="swiper-slide">Slide 8</div>
    //             <div class="swiper-slide">Slide 9</div>
    //           </div>
    //         </div>`
    //   // renderElderCardUrgentNoti(res)
    // );
    // $.each(res, function (index, row) {
    //   $(
    //     "#urgent_noti_page .content .mapContent .swiper_elder_content .swiper .swiper-wrapper"
    //   ).append(renderElderCardUrgentNoti(row));
    // });
    // renderElderCardUrgentNoti(res);
    // const output = document.getElementById("swiper_urgent_noti");
    // output.innerHTML = renderElderCardUrgentNoti(res);
    // console.log(res);
    // let _posOrg;
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     _posOrg = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //     $.each(res, function (index, row) {
    //       if (row.ELDER_LAT != "null" && row.ELDER_LONG != "null") {
    //         row.DISTANCE = getDistanceFromLatLonInKm(
    //           _posOrg.lat,
    //           _posOrg.lng,
    //           row.ELDER_LAT,
    //           row.ELDER_LONG
    //         ).toFixed(1);
    //       }
    //     });
    //     $(
    //       "#urgent_noti_page .content .mapContent .swiper_elder_content .swiper .swiper-wrapper"
    //     ).html(renderElderCardUrgentNoti(res));
    //   });
    // }
    // var txt = document
    //   .createElement("div")
    //   .addClass("swiper-slide")
    //   .css("background-color", "unset");
    // txt.innerHTML = renderElderCardUrgentNoti(res);
  });
  // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2 - lat1); // deg2rad below
  //   var dLon = deg2rad(lon2 - lon1);
  //   var a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c; // Distance in km
  //   return d;
  // }

  // function deg2rad(deg) {
  //   return deg * (Math.PI / 180);
  // }
}
function renderElderCardUrgentNoti(elderData) {
  let slideHTML = "";
  $.each(elderData, function (index, row) {
    slideHTML =
      slideHTML +
      `<div class="swiper-slide" style="background-color: unset">
        <div class="notifications-card-body">
          <img class="card-body-thumbnail" src="${row.ELDER_AVATAR}" />
          <div class="card-body-content">
            <h4 class="name">${row.ELDER_NAME}</h4>
            <div style="display: flex">
              <h5 class="urgent">
                <i class="fa fa-crosshairs" aria-hidden="true"></i>
                ระยะทาง
              </h5>
              <h5
                class="urgent"
                style="color: #6f63fd; padding-left: 5px"
              >
                ห่างจากคุณ ${row.DISTANCE} km.
              </h5>
            </div>
          </div>
        </div>
      </div>`;
  });
  return (
    `<div class="swiper swiper_urgent_noti">
  <div class="swiper-wrapper">` +
    slideHTML +
    `</div>
  </div>`
  );
}
function disabledElderUrgentNotiPageFunc() {
  $("#urgent_noti_page .DetailElder .elder_btn").prop("disabled", true);
  $("#urgent_noti_page .DetailElder #type_urgent").prop("disabled", true);
  $("#urgent_noti_page .DetailElder #subject_urgent").prop("disabled", true);
  $("#urgent_noti_page .DetailElder #detail_urgent").prop("disabled", true);
  $("#urgent_noti_page .DetailElder .elder p").text("");
  $("#urgent_noti_page .DetailElder .tel").hide();
  $("#urgent_noti_page .DetailElder #edit_icon").attr(
    "src",
    "img/edit_icon_disabled.png"
  );
  $("#urgent_noti_page .DetailElder #edit_title_text").addClass(
    "edit_title_text"
  );
  $("#urgent_noti_page .DetailElder #edit_title").addClass(
    "edit_title_disabled"
  );
  $("#urgent_noti_page .DetailElder .camera .Img").hide();
  $("#urgent_noti_page .DetailElder .camera .open_camera").addClass("disabled");
}
function enabledElderUrgentNotiPageFunc() {
  $("#urgent_noti_page .DetailElder .elder_btn").prop("disabled", false);
  $("#urgent_noti_page .DetailElder #type_urgent").prop("disabled", false);
  $("#urgent_noti_page .DetailElder #subject_urgent").prop("disabled", false);
  $("#urgent_noti_page .DetailElder #detail_urgent").prop("disabled", false);
  $("#urgent_noti_page .DetailElder .elder p").text("ทวีจันทร์ ประสารสิน");
  $("#urgent_noti_page .DetailElder .tel").show();
  $("#urgent_noti_page .DetailElder #edit_icon").attr(
    "src",
    "img/edit_icon.png"
  );
  $("#urgent_noti_page .DetailElder #edit_title_text").removeClass(
    "edit_title_text"
  );
  $("#urgent_noti_page .DetailElder #edit_title").removeClass(
    "edit_title_disabled"
  );
  $("#urgent_noti_page .DetailElder .camera .Img").show();
  $("#urgent_noti_page .DetailElder .camera .open_camera").removeClass(
    "disabled"
  );
}

function initMapUrgentNotiPage() {
  map = new google.maps.Map(document.getElementById("mapUrgentNotiPage"), {
    center: new google.maps.LatLng(-33.91722, 151.2263),
    zoom: 16,
    disableDefaultUI: true,
    mapTypeControl: false,
  });
  iconsUrgentNoti = {
    parking: {
      icon: "img/pin_marker.png",
    },
    library: {
      icon: "img/pin_marker.png",
    },
    info: {
      icon: "img/pin_marker.png",
    },
  };
  featuresUrgentNoti = [
    {
      position: new google.maps.LatLng(15.538149884278686, 99.90524031190787),
      type: "info",
    },
  ];
}
function initSlideUrgentNotiPage() {
  var swiper = new Swiper(".swiper_urgent_noti", {
    speed: 400,
    spaceBetween: 100,
  });
}
// var markers = [];
function MarkerDirectionsUrgentNotiPage(_name, _posDestination) {
  // getCurrentPosition
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      _posOriginal = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // Create setCenterMap.
      map.setCenter(_posOriginal);
      // markers.push(markerOriginal);

      directionsRenderer.setOptions({
        suppressPolylines: false,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "red",
        },
      });
      directionsRenderer.setMap(map);
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        _posOriginal,
        _posDestination
      );
      // Create markerOriginal.
      markerOriginal = new google.maps.Marker({
        position: _posOriginal,
        icon: "img/dot.png",
        map: map,
      });

      // Set bodyMarkerContent
      var contentStringDes =
        '<div id="bodyMarkerContent" onclick="myFunction()" style="background-image: unset;justify-content: center;"><p>ตำแหน่งของคุณ</p>' +
        "</div>";
      infowindowOriginal = new google.maps.InfoWindow();
      infowindowOriginal.setContent(contentStringDes);
      infowindowOriginal.open(map, markerOriginal);
      // ปุ่ม กลับหน้า map
      $("#urgent_noti_page .backformap .backformap_btn").on(
        "click",
        function () {
          $("#urgent_noti_page .mapContent").removeClass("active");
          $("#urgent_noti_page .notifications-card-body").addClass("active");
          $("#urgent_noti_page .swiper_elder_content").show();
          $("#urgent_noti_page .DetailElder").show();
          $("#urgent_noti_page .content").removeClass("active");
          $("#urgent_noti_page .content .backformap").hide();
          directionsRenderer.setMap(null);
          map.setCenter(_posDestination);
          infowindowOriginal.close();
          markerOriginal.setOptions({ visible: false });
        }
      );
    });
  }
}

function MarkerUrgentNotiPage(_name, _posDestination) {
  // Create markerDestination.
  markerDestination = new google.maps.Marker({
    position: _posDestination,
    icon: "img/pin_marker.png",
    map: map,
  });
  // markers.push(markerDestination);
  map.setCenter(_posDestination);
  // Set bodyMarkerContent
  var contentString =
    '<div id="bodyMarkerContent" onclick="showFullMap()"><p>' +
    _name +
    "</p>" +
    "</div>";
  infowindowDestination = new google.maps.InfoWindow();
  infowindowDestination.setContent(contentString);
  infowindowDestination.open(map, markerDestination);
}
function showFullMap() {
  // console.log($(".backformap_to_notifications_page_btn").is(":visible"));
  if ($(".backformap_to_notifications_page_btn").is(":visible")) {
    // console.log($("#urgent_noti_page").hasClass("urgent_noti_page_header"));
    $("#urgent_noti_page .content .backformap button").hide();
    $(
      "#urgent_noti_page .content .backformap .backformap_urgent_detail_btn"
    ).show();
  } else {
    console.log("!noti_header_btn");
    $("#urgent_noti_page .content .backformap button").hide();
    $("#urgent_noti_page .content .backformap .backformap_btn").show();
  }
  if (!$("#urgent_noti_page .mapContent").hasClass("active")) {
    MarkerDirectionsUrgentNotiPage(
      "ชัยสิทธิ์ มิตรมงคลกุล",
      featuresUrgentNoti[0].position
    );
    $("#urgent_noti_page .mapContent").addClass("active");
    $("#urgent_noti_page .notifications-card-body").removeClass("active");
    $("#urgent_noti_page .swiper_elder_content").hide();
    $("#urgent_noti_page .DetailElder").hide();
    $("#urgent_noti_page .UrgentDetailElder").hide();
    $("#urgent_noti_page .content").addClass("active");
    $("#urgent_noti_page .content .backformap").show();
    $("#urgent_noti_page .swiper_elder_content_fixed").hide();
    $("#urgent_noti_page .content .backformap .card-body").eq(0).show();
  }
}
function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  posOriginal,
  posDestination
) {
  directionsService
    .route({
      origin: posOriginal,
      destination: posDestination,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch();
}
/* ----------------------------------------------------------------------------- start : urgent_noti_page ----------------------------------------------------------------------------- */
// ปุ่ม back
$("#urgent_noti_page .urgent_noti_page_header .back_header_btn").on(
  "click",
  function () {
    changePage("home_page", function () {});
  }
);
// ปุ่ม ปิด tutorial
$("#modal-tutorial-urgent-noti button").on("click", function () {
  $(".modal").hide();
  $("body").removeClass("modal-open");
});
// กดเลือกผู้สูงอายุตรง map
$("#urgent_noti_page .swiper_elder_content .notifications-card-body").on(
  "click",
  function () {
    $("#urgent_noti_page .notifications-card-body").removeClass("active");
    $(this).addClass("active");
    MarkerUrgentNotiPage(
      "ชัยสิทธิ์ มิตรมงคลกุล",
      featuresUrgentNoti[0].position
    );
    enabledElderUrgentNotiPageFunc();
  }
);

// ปุ่ม แสดงข้อมูล
$("#urgent_noti_page .content .elder .elder_btn").on("click", function () {
  if ($(this).hasClass("show")) {
    $(this).removeClass("show");
    $("#urgent_noti_page .content .elder .elder_btn").text("แสดงข้อมูล");
    $("#urgent_noti_page .content .elder_detail").hide();
  } else {
    $(this).addClass("show");
    $("#urgent_noti_page .content .elder .elder_btn").text("ซ่อน");
    $("#urgent_noti_page .content .elder_detail").show();
  }
});
$(".camera img")
  .eq(0)
  .click(function () {
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
// ปุ่ม แสดงรายชื่อผู้สูงอายุทั้งหมด
$("#urgent_noti_page .content .elder_list").on("click", function () {
  changePage("urgent_noti_elder_list_page", function () {
    $("#urgent_noti_elder_list_page .content p").hide();
  });
});
/* ----------------------------------------------------------------------------- end : urgent_noti_page ----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------- start : notifications_urgent_noti_page ----------------------------------------------------------------------------- */
// เปลี่ยนหน้าไป notifications_urgent_noti_page
$("#urgent_noti_page .urgent_noti_page_header .noti_header_btn").on(
  "click",
  function () {
    changePage("notifications_urgent_noti_page", function () {});
  }
);
// ปุ่ม back
$(
  "#notifications_urgent_noti_page .urgent_noti_page_header .back_header_btn"
).on("click", function () {
  changePage("urgent_noti_page", function () {
    initialUrgentNotiPageFunc();
  });
});
/* ----------------------------------------------------------------------------- end : notifications_urgent_noti_page ----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------- start : urgent_noti_elder_list_page ----------------------------------------------------------------------------- */
// ปุ่ม back
$("#urgent_noti_elder_list_page .urgent_noti_page_header .back_header_btn").on(
  "click",
  function () {
    $(".search_header input").removeClass("active");
    $(".search_header").removeClass("active");
    $("#urgent_noti_elder_list_page .urgent_noti_page_header .title").show();
    changePage("urgent_noti_page", function () {
      initialUrgentNotiPageFunc();
    });
  }
);
// ปุ่ม search
$("#urgent_noti_elder_list_page .urgent_noti_page_header .search_header").on(
  "click",
  function () {
    if ($(".search_header").hasClass("active")) {
      $(".search_header input").removeClass("active");
      $(".search_header").removeClass("active");
      $("#urgent_noti_elder_list_page .urgent_noti_page_header .title").show();
      $("#urgent_noti_elder_list_page .content p").hide();
    } else {
      $(".search_header input").addClass("active");
      $(".search_header").addClass("active");
      $("#urgent_noti_elder_list_page .urgent_noti_page_header .title").hide();
      $("#urgent_noti_elder_list_page .content p").show();
    }
  }
);
// select elder
$("#urgent_noti_elder_list_page .contact_items")
  .find("li")
  .each(function (index) {
    $(this).click(function () {
      changePage("urgent_noti_page", function () {
        $("#urgent_noti_page .mapContent").removeClass("active");
        $("#urgent_noti_page .notifications-card-body").addClass("active");
        $("#urgent_noti_page .swiper_elder_content").show();
        $("#urgent_noti_page .DetailElder").show();
        $("#urgent_noti_page .content").removeClass("active");
        $("#urgent_noti_page .content .backformap").hide();
        MarkerUrgentNotiPage(
          "ชัยสิทธิ์ มิตรมงคลกุล",
          featuresUrgentNoti[0].position
        );
        enabledElderUrgentNotiPageFunc();
      });
    });
  });
/* ----------------------------------------------------------------------------- start : urgent_noti_elder_list_page ----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------- start : notifications_detail_urgent_noti_page ----------------------------------------------------------------------------- */

function initialNotificationDetailUrgentNotiPageFunc() {
  $("#urgent_noti_page .urgent_noti_page_header").hide();
  $("#urgent_noti_page .urgent_detail_noti_page_header").show();
  $("#urgent_noti_page .mapContent").removeClass("active");
  $("#urgent_noti_page .notifications-card-body").removeClass("active");
  $("#urgent_noti_page .swiper_elder_content").hide();
  $("#urgent_noti_page .swiper_elder_content_fixed").show();
  $("#urgent_noti_page .DetailElder").hide();
  $("#urgent_noti_page .content .backformap").show();
  $("#urgent_noti_page .content .backformap button").hide();
  $(
    "#urgent_noti_page .content .backformap .backformap_to_notifications_page_btn"
  ).show();
  $("#urgent_noti_page .urgent_noti_page_header .title").hide();
  $("#urgent_noti_page .urgent_noti_page_header .noti_header_btn").hide();
  $("#urgent_noti_page .content .backformap .card-body").eq(0).hide();
  MarkerUrgentNotiPage("ชัยสิทธิ์ มิตรมงคลกุล", featuresUrgentNoti[0].position);
  $("#urgent_noti_page .UrgentDetailElder").show();
  $("#urgent_noti_page .UrgentDetailElder #edit_title_text").addClass(
    "edit_title_text"
  );
  $("#urgent_noti_page .UrgentDetailElder #edit_title").addClass(
    "edit_title_disabled"
  );
  $("#urgent_noti_page .UrgentDetailElder #edit_icon").attr(
    "src",
    "img/edit_icon_disabled.png"
  );
  if (directionsRenderer) {
    directionsRenderer.setDirections({ routes: [] });
  }
  if (markerOriginal) {
    markerOriginal.setOptions({ visible: false });
  }
  if (infowindowOriginal) {
    infowindowOriginal.close();
  }
}

// select elder
$("#notifications_urgent_noti_page .contact_items")
  .find("li")
  .each(function (index) {
    $(this).click(function () {
      changePage("urgent_noti_page", function () {
        initialNotificationDetailUrgentNotiPageFunc();
      });
    });
  });
// ปุ่ม back
$("#urgent_noti_page .urgent_detail_noti_page_header .back_header_btn").on(
  "click",
  function () {
    changePage("notifications_urgent_noti_page", function () {});
  }
);
// ปุ่ม กลับหน้าnotifications_detail
$(
  "#urgent_noti_page .content .backformap .backformap_to_notifications_page_btn"
).on("click", function () {
  changePage("notifications_urgent_noti_page", function () {});
});
// ปุ่ม backtomapหน้าnotifications_detail
$("#urgent_noti_page .content .backformap .backformap_urgent_detail_btn").on(
  "click",
  function () {
    initialNotificationDetailUrgentNotiPageFunc();
  }
);
/* ----------------------------------------------------------------------------- end : notifications_detail_urgent_noti_page ----------------------------------------------------------------------------- */

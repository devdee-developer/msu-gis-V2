let map, infoWindow;
var swiper;
var swiper2;
var loading = new Loading();
var topMenu = new TopMenu();
var swiper_timer = setInterval(function () {}, 3000);
var swiper_timer2 = setInterval(function () {}, 3000);
$(function () {
  FastClick.attach(document.body);
  if (localStorage.getItem("vhv_app_user_token") === null) {
    changePage("splash_page", function () {});
  } else {
    changePage("home_page", function () {
      calHomeButtonPosition();
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
      initSlideHomePage();
    });
  }

  $(".btn_splash").on("click", function () {
    changePage("login_page", function () {
      var _h = $(".header_login").height();
      $(".form_login").css("top", _h + "px");
    });
  });
  $(".btn_submit_login").on("click", function () {
    localStorage.setItem("vhv_app_user_token", "xxx");
    loading.show();
    setTimeout(function () {
      loading.hide();
      changePage("home_page", function () {
        calHomeButtonPosition();
        initSlideHomePage();
      });
    }, 500);
  });
  $(".menu_home_page").on("click", function () {
    changePage("home_page", function () {
      calHomeButtonPosition()
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
      swiper.destroy();
      initSlideHomePage();
    });
  });
  $(".menu_contact_page").on("click", function () {
    changePage("contact_page", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
    });
  });
  $(".menu_map_page").on("click", function () {
    changePage("map_page", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
    });
  });
  $("#news_detail_page .header .back_header_btn").on("click",function(){
    changePage("news_page", function () {
      
    });
  })
  $(".menu_news_page").on("click", function () {
    changePage("news_page", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
        initSlideNewsPage();
      }, 500);
    });
  });
  $(".menu_analytics_page").on("click", function () {
    changePage("analytics_page", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
    });
  });
  $(".news_item").on("click",function(){
    changePage("news_detail_page", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
    });
  })
  $(".swiper-slide").on("click", function () {
    changePage("news_detail_page", function () {
      loading.show();
      setTimeout(function () {
        loading.hide();
      }, 500);
    });
  });
  $(".profile_header_wrapper").on("click", function () {
    topMenu.show();
  });
  $(".top_menu_wrapper,.close_top_menu").on("click", function () {
    topMenu.hide();
  });
  $(".top_menu_item_wrapper").on("click", function (event) {
    event.preventDefault();
    return false;
  });
  $("#logout").on("click", function () {
    $(".close_top_menu").click();
    localStorage.clear();
    loading.show();
    setTimeout(function () {
      loading.hide();
      window.location = "";
    }, 500);
  });
  $( window ).resize(function() {
    initSlideHomePage();
    calHomeButtonPosition();
  });
  $('.modal-dismiss').on('click',function () {
    $(".modal").hide()
    $('body').removeClass('modal-open')
})
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {}


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-33.91722, 151.23064),
    zoom: 16,
    disableDefaultUI: true,
    mapTypeControl:true,
    mapTypeControlOptions: {

      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    
  });

  const icons = {
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
  const features = [
    {
      position: new google.maps.LatLng(-33.91721, 151.2263),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91539, 151.2282),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.9191, 151.22907),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.9179, 151.23463),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.916988, 151.23364),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      type: "library",
    },
  ];

  // Create markers.
  for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }
}
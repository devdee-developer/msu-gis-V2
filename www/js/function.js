function changePage(_page, _callback = function () {}) {
  $(".pages").hide();
  $("#" + _page).show();
  _callback();
}

function initSlideHomePage() {
  clearInterval(swiper_timer);
  swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  swiper_timer = setInterval(function () {
    $(".swiper-button-next").click();
  }, 5000);
}
function initSlideNewsPage() {
  clearInterval(swiper_timer2);
  swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
  });
  swiper_timer2 = setInterval(function () {
    $(".swiper-button-next2").click();
  }, 5000);
}
function calHomeButtonPosition() {
  var total_w = $(".main_home_menu_item_wrapper").width();
  var _w = total_w / 2 - 5;
  $(".main_home_menu_item_wrapper img").width(_w);
  $(".main_home_menu_item_wrapper img").eq(1).css("margin-left", "10px");
  $(".main_home_menu_item_wrapper img").eq(3).css("margin-left", "10px");
}
function showModal(_modal, _callback = function () {}) {
  $("#" + _modal).fadeIn(200, () => {
    $("body").addClass("modal-open");
  });
  _callback();
}
function getAccessToken() {
  $.ajax({
    url: api_base_url + "/auth/login",
    type: "POST",
    data: {
      partner_id: partner_id,
      partner_key: partner_key,
    },
    success: function (response) {
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
    },
    error: function () {
      alert("เกิดข้อผิดพลาด");
    },
  });
}
function login(username, password, _success, _error) {
  $.ajax({
    url: api_base_url + "/vhvLogin",
    type: "POST",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token.getAccessToken());
    },
    data: {
      user: username,
      pass: password,
    },
    success: function (response) {
      if (response.status == true) {
        localStorage.setItem("user_token", response.data);
        _success(response);
      } else {
        _error(response.status);
      }
    },
    error: function (e) {
      if (e.responseJSON.status == false) {
        _error("ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง");
      } else {
        _error("เกิดข้อผิดพลาด");
      }
    },
  });
}
// yyyy-mm-dd
function getAge(dateString) {
  if (dateString != null) {
    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
    var dob = new Date(
      dateString.substring(0, 4),
      dateString.substring(5, 7) - 1,
      dateString.substring(8, 10)
    );

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";

    yearAge = yearNow - yearDob;

    if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      var dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    age = {
      years: yearAge,
      months: monthAge,
      days: dateAge,
    };

    if (age.years > 1) yearString = " ปี";
    else yearString = " year";
    if (age.months > 1) monthString = " เดือน";
    else monthString = " month";
    if (age.days > 1) dayString = " days";
    else dayString = " day";

    if (age.years > 0 && age.months > 0)
      ageString =
        "อายุ " + age.years + yearString + ", " + age.months + monthString;
    else if (age.years == 0 && age.months == 0 && age.days > 0)
      ageString = "อายุ " + age.days + dayString;
    else if (age.years > 0 && age.months > 0 && age.days == 0)
      ageString =
        "อายุ " + age.years + yearString + ", " + age.months + monthString;
    else if (age.years == 0 && age.months > 0 && age.days > 0)
      ageString =
        "อายุ " + age.years + yearString + ", " + age.months + monthString;
    else if (age.years > 0 && age.months == 0 && age.days > 0)
      ageString =
        "อายุ " + age.years + yearString + ", " + age.months + monthString;
    else if (age.years == 0 && age.months > 0 && age.days == 0)
      ageString = "อายุ " + age.months + monthString;
    else ageString = "ไม่มีข้อมูลอายุ";
  } else ageString = "ไม่มีข้อมูลอายุ";
  return ageString;
}
function renderElderCard(elderData) {
  return `<li ELDER_ID="${elderData.ID}">
  <div class="card-body">
    <img class="card-body-thumbnail" src="${elderData.ELDER_AVATAR}" />
    <div class="card-body-content">
      <h4 class="name">${elderData.ELDER_NAME}</h4>
      <h5 class="age">${getAge(elderData.ELDER_BIRTHDATE)}</h5>
      <p class="address">${elderData.ELDER_HOUSE_NO}</p>
    </div>
    <i class="right-icon fa fa-chevron-right"></i>
  </div>
  <div class="card-footer">
    <span class="status patient-in-bed"><p>ติดเตียง</p> </span>
    <span class="status inprogress-evaluate"><p>กำลังประเมิน...</p></span>
    <span class="status wait-for-visit"><p>รอออกเยี่ยม...</p></span>
  </div>
</li>`
}

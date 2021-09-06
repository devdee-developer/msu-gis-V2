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
function getAccessToken(_success, _error) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api_base_url + "/auth/login",
      type: "POST",
      data: {
        partner_id: partner_id,
        partner_key: partner_key,
      },
      success: function (response) {
        localStorage.setItem("access_token", response.access_token);
        resolve(response.access_token);
      },
      error: function () {
        reject("เกิดข้อผิดพลาด");
      },
    });
  });
}
async function login(username, password, _success, _error) {
  try {
    await getAccessToken();
    $.ajax({
      url: api_base_url + "/vhvLogin",
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + token.getAccessToken()
        );
      },
      data: {
        user: username,
        pass: password,
      },
      success: function (response) {
        console.log(response);
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
  } catch (error) {
    _error("เกิดข้อผิดพลาด");
  }
}
async function callAPI(enpoint, method, data, _success, _error) {
  try {
    $.ajax({
      url: enpoint,
      type: method,
      contentType: 'application/json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + token.getAccessToken()
        );
      },
      data: data,
      success: function (response) {
        console.log(response);
        if (response.status == true) {
          _success(response);
        } else {
          _error(response.status);
        }
      },
      error: function (e) {
        if (e.responseJSON.status == false) {
          _error("เกิดข้อผิดพลาด");
        } else {
          _error("เกิดข้อผิดพลาด");
        }
      },
    });
  } catch (error) {
    _error("เกิดข้อผิดพลาด");
  }
}
function getInitial() {
  $.ajax({
    url: api_base_url + "/getIntial",
    type: "POST",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token.getAccessToken());
    },
    data: {
      token: token.getUserToken(),
    },
    success: function (response) {
      console.log(response);
      //  response.data = CryptoJS.AES.decrypt(response.data, "MsU2021APPlcation");
      response.data = CryptoJSAesJson.decrypt(response.data, secret_key_aes);
      var data = response.data;
      if (response.status == true) {
        clearInitial();
        db.transaction(function (tx) {
          $.each(data.elder, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_ELDER (ID,GUID,ELDER_NAME,ELDER_HOUSE_NO,ELDER_SEX,ELDER_AVATAR,ELDER_BIRTHDATE,ELDER_STRESS,ELDER_KNOWLEDGE,ELDER_CONSUME,ELDER_ACTIVITY,SHPH_ID,SHPH_MOOID,ELDER_LAT,ELDER_LONG,HEALTH_STATUS,VISIT_STATUS,EVALUATE_STATUS,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.ELDER_NAME +
                "','" +
                row.ELDER_HOUSE_NO +
                "','" +
                row.ELDER_SEX +
                "','" +
                row.ELDER_AVATAR +
                "','" +
                row.ELDER_BIRTHDATE +
                "','" +
                row.ELDER_STRESS +
                "','" +
                row.ELDER_KNOWLEDGE +
                "','" +
                row.ELDER_CONSUME +
                "','" +
                row.ELDER_ACTIVITY +
                "','" +
                row.SHPH_ID +
                "','" +
                row.SHPH_MOOID +
                "','" +
                row.ELDER_LAT +
                "','" +
                row.ELDER_LONG +
                "','" +
                row.HEALTH_STATUS +
                "','" +
                row.VISIT_STATUS +
                "','" +
                row.EVALUATE_STATUS +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });

        db.transaction(function (tx) {
          $.each(data.elvaluate, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_MA_EVALUATE (ID,GUID,EVALUATE_NO,EVALUATE_SUBNO,EVALUATE_MIN,EVALUATE_MAX,EVALUATE_RESULT,EVALUATE_FLAG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.EVALUATE_SUBNO +
                "','" +
                row.EVALUATE_MIN +
                "','" +
                row.EVALUATE_MAX +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.emergency, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EMERGENCY (ID,GUID,VHV_ID,ELDER_ID,EMC_DATE,EMC_TYPE,EMC_TOPIC,EMC_DESC,EMC_PIC1,EMC_PIC2,EMC_PIC3,EMC_PIC4,EMC_PIC5,ADMIN_ID,ADMIN_DATE,ADMIN_DESC,ADMIN_SEND,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EMC_DATE +
                "','" +
                row.EMC_TYPE +
                "','" +
                row.EMC_TOPIC +
                "','" +
                row.EMC_DESC +
                "','" +
                row.EMC_PIC1 +
                "','" +
                row.EMC_PIC2 +
                "','" +
                row.EMC_PIC3 +
                "','" +
                row.EMC_PIC4 +
                "','" +
                row.EMC_PIC5 +
                "','" +
                row.ADMIN_ID +
                "','" +
                row.ADMIN_DATE +
                "','" +
                row.ADMIN_DESC +
                "','" +
                row.ADMIN_SEND +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate1, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE1 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,DTX,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.DTX +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate2, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE2 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,SBP,DBP,FLAGSBP,RESULTSBP,SCORESBP,FLAGDBP,RESULTDBP,SCOREDBP,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.SBP +
                "','" +
                row.DBP +
                "','" +
                row.FLAGSBP +
                "','" +
                row.RESULTSBP +
                "','" +
                row.SCORESBP +
                "','" +
                row.FLAGDBP +
                "','" +
                row.RESULTDBP +
                "','" +
                row.SCOREDBP +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate3, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE3 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,CVD1,CVD2,CVD3,CVD4,CVD5,CVD6,CVD7,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.CVD1 +
                "','" +
                row.CVD2 +
                "','" +
                row.CVD3 +
                "','" +
                row.CVD4 +
                "','" +
                row.CVD5 +
                "','" +
                row.CVD6 +
                "','" +
                row.CVD7 +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate4, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE4 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,COG1A,COG1B,COG1C_PIC,COG2A,COG2B,COG2C,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.COG1A +
                "','" +
                row.COG1B +
                "','" +
                row.COG1C_PIC +
                "','" +
                row.COG2A +
                "','" +
                row.COG2B +
                "','" +
                row.COG2C +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate5, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE5 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,P2Q1,P2Q2,P9Q1,P9Q2,P9Q3,P9Q4,P9Q5,P9Q6,P9Q7,P9Q8,P9Q9,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.P2Q1 +
                "','" +
                row.P2Q2 +
                "','" +
                row.P9Q1 +
                "','" +
                row.P9Q2 +
                "','" +
                row.P9Q3 +
                "','" +
                row.P9Q4 +
                "','" +
                row.P9Q5 +
                "','" +
                row.P9Q6 +
                "','" +
                row.P9Q7 +
                "','" +
                row.P9Q8 +
                "','" +
                row.P9Q9 +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate6, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE6 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,OST1,OST2,OST3,OST4,OST5,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.OST1 +
                "','" +
                row.OST2 +
                "','" +
                row.OST3 +
                "','" +
                row.OST4 +
                "','" +
                row.OST5 +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate7, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE7 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,TUG,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.TUG +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate8, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE8 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,EYE1,EYE2,EYE3L,EYE3R,EYE4L,EYE4R,EYE5L,EYE5R,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.EYE1 +
                "','" +
                row.EYE2 +
                "','" +
                row.EYE3L +
                "','" +
                row.EYE3R +
                "','" +
                row.EYE4L +
                "','" +
                row.EYE4R +
                "','" +
                row.EYE5L +
                "','" +
                row.EYE5R +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate9, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE9 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,RUBL,RUBR,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.RUBL +
                "','" +
                row.RUBR +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate10, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE10 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,OSR1A,OSR1B,OSR1C,OSR1D,OSR2,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.OSR1A +
                "','" +
                row.OSR1B +
                "','" +
                row.OSR1C +
                "','" +
                row.OSR1D +
                "','" +
                row.OSR2 +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate11, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE11 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,ORAL1A,ORAL1B,ORAL1C,ORAL2A,ORAL2B,ORAL2C,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.ORAL1A +
                "','" +
                row.ORAL1B +
                "','" +
                row.ORAL1C +
                "','" +
                row.ORAL2A +
                "','" +
                row.ORAL2B +
                "','" +
                row.ORAL2C +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate12, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE12 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,NUTRI1,NUTRI2,MNA1A,MNA1B,MNA1C,MNA1D,MNA1E,MNA1F,MNA1G,MNA2A,MNA2B,MNA2C,MNA2D,MNA2EA,MNA2EB,MNA2EC,MNA2F,MNA2G,MNA2H,MNA2I,MNA2J,MNA2K,MNA2L,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.NUTRI1 +
                "','" +
                row.NUTRI2 +
                "','" +
                row.MNA1A +
                "','" +
                row.MNA1B +
                "','" +
                row.MNA1C +
                "','" +
                row.MNA1D +
                "','" +
                row.MNA1E +
                "','" +
                row.MNA1F +
                "','" +
                row.MNA1G +
                "','" +
                row.MNA2A +
                "','" +
                row.MNA2B +
                "','" +
                row.MNA2C +
                "','" +
                row.MNA2D +
                "','" +
                row.MNA2EA +
                "','" +
                row.MNA2EB +
                "','" +
                row.MNA2EC +
                "','" +
                row.MNA2F +
                "','" +
                row.MNA2G +
                "','" +
                row.MNA2H +
                "','" +
                row.MNA2I +
                "','" +
                row.MNA2J +
                "','" +
                row.MNA2K +
                "','" +
                row.MNA2L +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.evaluate13, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_EVALUATE13 (ID,GUID,VHV_ID,ELDER_ID,EVALUATE_DATE,EVALUATE_NO,ADL1,ADL2,ADL3,ADL4,ADL5,ADL6,ADL7,ADL8,ADL9,ADL10,EVALUATE_FLAG,EVALUATE_SCORE,EVALUATE_RESULT,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_ID +
                "','" +
                row.ELDER_ID +
                "','" +
                row.EVALUATE_DATE +
                "','" +
                row.EVALUATE_NO +
                "','" +
                row.ADL1 +
                "','" +
                row.ADL2 +
                "','" +
                row.ADL3 +
                "','" +
                row.ADL4 +
                "','" +
                row.ADL5 +
                "','" +
                row.ADL6 +
                "','" +
                row.ADL7 +
                "','" +
                row.ADL8 +
                "','" +
                row.ADL9 +
                "','" +
                row.ADL10 +
                "','" +
                row.EVALUATE_FLAG +
                "','" +
                row.EVALUATE_SCORE +
                "','" +
                row.EVALUATE_RESULT +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.userInfo, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_TR_VHV (ID,GUID,VHV_USER,VHV_IDCARD,VHV_USERID,VHV_PASSWORD,VHV_SEX,VHV_BIRTHDATE,VHV_ADDR,SHPH_ID,SHPH_MOOID,VHV_LAT,VHV_LONG,MB_VERSION,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES (" +
                row.ID +
                ",'" +
                row.GUID +
                "','" +
                row.VHV_USER +
                "','" +
                row.VHV_IDCARD +
                "','" +
                row.VHV_USERID +
                "','" +
                row.VHV_PASSWORD +
                "','" +
                row.VHV_SEX +
                "','" +
                row.VHV_BIRTHDATE +
                "','" +
                row.VHV_ADDR +
                "','" +
                row.SHPH_ID +
                "','" +
                row.SHPH_MOOID +
                "','" +
                row.VHV_LAT +
                "','" +
                row.VHV_LONG +
                "','" +
                row.MB_VERSION +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.gisProvince, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_MA_GIS_PROVINCE (ID,GUID,GIS_PROVINCENAME,GIS_LAT,GIS_LONG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES ('" +
                row.ID +
                "','" +
                row.GUID +
                "','" +
                row.GIS_PROVINCENAME +
                "','" +
                row.GIS_LAT +
                "','" +
                row.GIS_LONG +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.gisDistrict, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_MA_GIS_DISTRICT (ID,GUID,GIS_PROVINCE,GIS_DISTRICTNAME,GIS_LAT,GIS_LONG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES ('" +
                row.ID +
                "','" +
                row.GUID +
                "','" +
                row.GIS_PROVINCE +
                "','" +
                row.GIS_DISTRICTNAME +
                "','" +
                row.GIS_LAT +
                "','" +
                row.GIS_LONG +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.gisTumbol, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_MA_GIS_TUMBOL (ID,GUID,GIS_PROVINCE,GIS_DISTRICT,GIS_TUMBOLNAME,GIS_LAT,GIS_LONG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES ('" +
                row.ID +
                "','" +
                row.GUID +
                "','" +
                row.GIS_PROVINCE +
                "','" +
                row.GIS_DISTRICT +
                "','" +
                row.GIS_TUMBOLNAME +
                "','" +
                row.GIS_LAT +
                "','" +
                row.GIS_LONG +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
        db.transaction(function (tx) {
          $.each(data.shphMoo, function (index, row) {
            tx.executeSql(
              "INSERT INTO VHV_MA_SHPH_MOO (ID,GUID,SHPH_ID,SHPH_MOO,SHPH_MOONAME,SHPH_LAT,SHPH_LONG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES ('" +
                row.ID +
                "','" +
                row.GUID +
                "','" +
                row.SHPH_ID +
                "','" +
                row.SHPH_MOO +
                "','" +
                row.SHPH_MOONAME +
                "','" +
                row.SHPH_LONG +
                "','" +
                row.GIS_LONG +
                "','" +
                row.DELETE_FLAG +
                "','" +
                row.CREATE_USER +
                "','" +
                row.CREATE_DATE +
                "','" +
                row.UPDATE_USER +
                "','" +
                row.UPDATE_DATE +
                "')"
            );
          });
        });
      } else {
        _error("เกิดข้อผิดพลาด");
      }
    },
    error: function (e) {
      _error("เกิดข้อผิดพลาด");
    },
  });
}
function getNewId() {
  return Date.now();
}
function sqlInsert(table, data, _callback) {
  var inserted_id = getNewId();
  var column = "";
  for (var i = 0; i < Object.keys(data).length; i++) {
    column += Object.keys(data)[i] + ",";
  }
  column = "ID," + column.slice(0, -1);

  var value = "";
  for (var i = 0; i < Object.keys(data).length; i++) {
    value += "'" + data[Object.keys(data)[i]] + "',";
  }
  value = inserted_id + "," + value.slice(0, -1);
  db.transaction(function (tx) {
    var insert_string =
      "INSERT INTO " + table + " (" + column + ") VALUES (" + value + ")";
    console.log(insert_string);
    tx.executeSql(insert_string);
  });
  _callback(inserted_id);
}
function queryByID(TABLE, ID, _callback) {
  var arr = [];
  console.log("SELECT rowid,* FROM " + TABLE + " WHERE rowid=" + ID)
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM " + TABLE + " WHERE ID=" +  ID,
      [],
      function (tx, results) {
        var len = results.rows.length,
          i;

        for (i = 0; i < len; i++) {
          console.log(results.rows.item(i))
          _callback(results.rows.item(i));
        }
      },
      null
    );
  });
}
function sqlUpdate(TABLE, data, ID, _callback) {
  var str = "";
  for (var i = 0; i < Object.keys(data).length; i++) {
    str += Object.keys(data)[i] + "='" + data[Object.keys(data)[i]] + "',";
  }
  str = str.slice(0, -1);

  let update_query = "UPDATE " + TABLE + " SET " + str + " WHERE ID=" + ID;
  db.transaction(function (tx) {
    tx.executeSql(update_query);
    _callback(ID);
  });
}
function sqlDelete(TABLE, ID, _callback) {
  let str = "DELETE FROM " + TABLE + " WHERE ID=" + ID;
  console.log(str);
  db.transaction(function (tx) {
    tx.executeSql(str);
    _callback(ID);
  });
}
function queryALL(TABLE, _callback) {
  var arr = [];
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT rowid,* FROM " + TABLE,
      [],
      function (tx, results) {
        var len = results.rows.length,
          i;

        for (i = 0; i < len; i++) {
          arr.push(results.rows.item(i));
        }
        _callback(arr);
      },
      null
    );
  });
}

function listElderEvaluate(_callback) {
  var waitForEvaluate = [];
  var evaluated = [];
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT distinct elder.* FROM VHV_TR_ELDER as elder 
                      LEFT JOIN VHV_TR_EVALUATE1 as eva1 on elder.ID = eva1.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE2 as eva2 on elder.ID = eva2.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE3 as eva3 on elder.ID = eva3.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE4 as eva4 on elder.ID = eva4.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE5 as eva5 on elder.ID = eva5.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE6 as eva6 on elder.ID = eva6.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE7 as eva7 on elder.ID = eva7.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE8 as eva8 on elder.ID = eva8.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE9 as eva9 on elder.ID = eva9.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE10 as eva10 on elder.ID = eva10.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE11 as eva11 on elder.ID = eva11.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE12 as eva12 on elder.ID = eva12.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE13 as eva13 on elder.ID = eva13.ELDER_ID
                      WHERE 
                      eva1.ELDER_ID is null or
                      eva2.ELDER_ID is null or
                      eva3.ELDER_ID is null or
                      eva4.ELDER_ID is null or
                      eva5.ELDER_ID is null or
                      eva6.ELDER_ID is null or
                      eva7.ELDER_ID is null or
                      eva8.ELDER_ID is null or
                      eva9.ELDER_ID is null or
                      eva10.ELDER_ID is null or
                      eva11.ELDER_ID is null or
                      eva12.ELDER_ID is null or
                      eva13.ELDER_ID is null
                      `,
      [],
      function (tx, results) {
        var len = results.rows.length,
          i;
        for (i = 0; i < len; i++) {
          waitForEvaluate.push(results.rows.item(i));
        }
      },
      null
    );
    tx.executeSql(
      `SELECT distinct elder.* FROM VHV_TR_ELDER as elder 
                      LEFT JOIN VHV_TR_EVALUATE1 as eva1 on elder.ID = eva1.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE2 as eva2 on elder.ID = eva2.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE3 as eva3 on elder.ID = eva3.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE4 as eva4 on elder.ID = eva4.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE5 as eva5 on elder.ID = eva5.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE6 as eva6 on elder.ID = eva6.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE7 as eva7 on elder.ID = eva7.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE8 as eva8 on elder.ID = eva8.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE9 as eva9 on elder.ID = eva9.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE10 as eva10 on elder.ID = eva10.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE11 as eva11 on elder.ID = eva11.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE12 as eva12 on elder.ID = eva12.ELDER_ID
                      LEFT JOIN VHV_TR_EVALUATE13 as eva13 on elder.ID = eva13.ELDER_ID
                      WHERE 
                      eva1.ELDER_ID is not null and
                      eva2.ELDER_ID is not null and
                      eva3.ELDER_ID is not null and
                      eva4.ELDER_ID is not null and
                      eva5.ELDER_ID is not null and
                      eva6.ELDER_ID is not null and
                      eva7.ELDER_ID is not null and
                      eva8.ELDER_ID is not null and
                      eva9.ELDER_ID is not null and
                      eva10.ELDER_ID is not null and
                      eva11.ELDER_ID is not null and
                      eva12.ELDER_ID is not null and
                      eva13.ELDER_ID is not null
                      `,
      [],
      function (tx, results) {
        var len = results.rows.length,
          i;
        for (i = 0; i < len; i++) {
          evaluated.push(results.rows.item(i));
        }
        _callback(waitForEvaluate, evaluated);
      },
      null
    );
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
</li>`;
}
function getCurrentDate() {
  const date = new Date();
  return `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(
    date.getDate(),
    2
  )} ${pad(date.getHours(),2)}:${pad(date.getMinutes(),2)}:${pad(date.getSeconds(),2)}`;
}
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
function clearInitial() {
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_ELDER");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_EVALUATE");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_GIS_DISTRICT");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_GIS_PROVINCE");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_GIS_TUMBOL");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_HEADER");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_JOB ");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_OFFICE ");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_OFFICETYPE");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_SHPH");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_MA_SHPH_MOO ");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_TR_CONTENT ");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM  VHV_TR_CONTENTLINK ");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EMERGENCY ");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE1");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE2");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE3");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE4");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE5");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE6");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE7 ");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE8");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE9");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE10");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE11 ");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE12 ");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_EVALUATE13 ");
  });

  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_READCONTENT");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_SOLVE");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_VHV ");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_VHV_ELDER");
  });
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM VHV_TR_VISIT");
  });
}

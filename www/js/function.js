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
      clickable: true
    }
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
      clickable: true
    }
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
function getAccessToken(_success, _error) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api_base_url + "/auth/login",
      type: "POST",
      data: {
        partner_id: partner_id,
        partner_key: partner_key
      },
      success: function (response) {
        localStorage.setItem("access_token", response.access_token);
        resolve(response.access_token);
      },
      error: function () {
        reject("เกิดข้อผิดพลาด");
      }
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
        xhr.setRequestHeader("Authorization","Bearer " + token.getAccessToken());
      },
      data: {
        user: username,
        pass: password
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
      }
    });
  } catch (error) {
    _error("เกิดข้อผิดพลาด");
  }
}
function getInitial(){

  $.ajax({
    url: api_base_url+"/getIntial",
    type:"POST",
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer '+token.getAccessToken()); },
    data:{
      token:token.getUserToken()
    },
    success: function( response ) {
       console.log(response);
    //  response.data = CryptoJS.AES.decrypt(response.data, "MsU2021APPlcation");
      response.data =CryptoJSAesJson.decrypt(response.data, secret_key_aes);
       var data = response.data;
       if(response.status==true){
         console.log(data);
       
        db.transaction(function (tx) {   
            $.each(data.elder, function( index, row ) {
              tx.executeSql("INSERT INTO VHV_TR_ELDER (ID,GUID,ELDER_NAME,ELDER_HOUSE_NO,ELDER_SEX,ELDER_AVATAR,ELDER_BIRTHDATE,ELDER_STRESS,ELDER_KNOWLEDGE,ELDER_CONSUME,ELDER_ACTIVITY,SHPH_ID,SHPH_MOOID,ELDER_LAT,ELDER_LONG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES ('"+row.ID+"','"+row.GUID+"','"+row.ELDER_NAME+"','"+row.ELDER_HOUSE_NO+"','"+row.ELDER_SEX+"','"+row.ELDER_AVATAR+"','"+row.ELDER_BIRTHDATE+"','"+row.ELDER_STRESS+"','"+row.ELDER_KNOWLEDGE+"','"+row.ELDER_CONSUME+"','"+row.ELDER_ACTIVITY+"','"+row.SHPH_ID+"','"+row.SHPH_MOOID+"','"+row.ELDER_LAT+"','"+row.ELDER_LONG+"','"+row.DELETE_FLAG+"','"+row.CREATE_USER+"','"+row.CREATE_DATE+"','"+row.UPDATE_USER+"','"+row.UPDATE_DATE+"')");
           });
        });

        db.transaction(function (tx) {   
          $.each(data.elvaluate, function( index, row ) {
            tx.executeSql("INSERT INTO VHV_MA_EVALUATE (ID,GUID,EVALUATE_NO,EVALUATE_SUBNO,EVALUATE_MIN,EVALUATE_MAX,EVALUATE_RESULT,EVALUATE_FLAG,DELETE_FLAG,CREATE_USER,CREATE_DATE,UPDATE_USER,UPDATE_DATE) VALUES ('"+row.ID+"','"+row.GUID+"','"+row.EVALUATE_NO+"','"+row.EVALUATE_SUBNO+"','"+row.EVALUATE_MIN+"','"+row.EVALUATE_MAX+"','"+row.EVALUATE_RESULT+"','"+row.EVALUATE_FLAG+"','"+row.DELETE_FLAG+"','"+row.CREATE_USER+"','"+row.CREATE_DATE+"','"+row.UPDATE_USER+"','"+row.UPDATE_DATE+"')");
         });
      });
            
           

       }else{
        _error("เกิดข้อผิดพลาด");
       }
       
    },
    error:function(e){
        _error("เกิดข้อผิดพลาด");

    }
});
}
function getNewId(){
return Date.now();
}
function sqlInsert(table,data,_callback){
  var column = "";
  for(var i=0;i<Object.keys(obj).length;i++){
      column += Object.keys(obj)[i]+",";
  }
  column = column.slice(0, -1);

  var value = "";
  for(var i=0;i<Object.keys(obj).length;i++){
      value += "'"+obj[Object.keys(obj)[i]]+"',";
  }
  value = value.slice(0, -1);
  db.transaction(function (tx) { 
      var insert_string = "INSERT INTO "+table+" ("+column+") VALUES ("+value+")";
      console.log(insert_string);
      tx.executeSql(insert_string); 
  }); 
  _callback(data.ID);
}

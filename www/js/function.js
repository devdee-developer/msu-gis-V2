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
  var inserted_id = getNewId();
  var column = "";
  for(var i=0;i<Object.keys(data).length;i++){
      column += Object.keys(data)[i]+",";
  }
  column = "ID,"+column.slice(0, -1);

  var value = "";
  for(var i=0;i<Object.keys(data).length;i++){
      value += "'"+data[Object.keys(data)[i]]+"',";
  }
  value = inserted_id+","+value.slice(0, -1);
  db.transaction(function (tx) { 
      var insert_string = "INSERT INTO "+table+" ("+column+") VALUES ("+value+")";
      console.log(insert_string);
      tx.executeSql(insert_string); 
  }); 
  _callback(inserted_id);
}
function queryByID(TABLE,ID,_callback){
  var arr = [];
  db.transaction(function (tx) { 
     tx.executeSql('SELECT * FROM '+TABLE+' WHERE ID='+ID, [], function (tx, results) { 
        var len = results.rows.length, i; 
    
        for (i = 0; i < len; i++) { 
         
           _callback(results.rows.item(i)); 
          
        } 
          
    
     }, null); 
  });
  }
function sqlUpdate(TABLE,data,ID,_callback){

    var str = "";
     for(var i=0;i<Object.keys(data).length;i++){
         str += Object.keys(data)[i]+"='"+data[Object.keys(data)[i]]+"',";
     }
     str = str.slice(0, -1);
   
     let update_query = "UPDATE "+TABLE+" SET " +str+ " WHERE ID=" + ID;
       db.transaction(function (tx) {
           tx.executeSql(update_query);
           _callback(ID);
       });
     
   }
   function sqlDelete(TABLE,ID,_callback){
    let str = 'DELETE FROM '+TABLE+' WHERE ID='+ID;
    console.log(str);
    db.transaction(function (tx) {
       tx.executeSql(str);
       _callback(ID);
    });
}
function queryALL(TABLE,_callback){
  var arr = [];
  db.transaction(function (tx) { 
     tx.executeSql('SELECT * FROM '+TABLE, [], function (tx, results) { 
        var len = results.rows.length, i; 
       
    
        for (i = 0; i < len; i++) { 
           arr.push(results.rows.item(i)); 
          
        } 
_callback(arr);
          
    
     }, null); 
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
function getCurrentDate(){
      function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
      }
      const date = new Date()
     return `${date.getFullYear()}-${pad(date.getMonth()+1,2)}-${pad(date.getDate(),2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

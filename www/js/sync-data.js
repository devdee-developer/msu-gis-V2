$(function () {
  async function syncData() {
    try {
      let result = await Promise.all([
        syncTableToServer("VHV_TR_EVALUATE1", "/saveEvaluate1s"),
        syncTableToServer("VHV_TR_EVALUATE2","/saveEvaluate2s"),
        syncTableToServer("VHV_TR_EVALUATE3","/saveEvaluate3s"),
        syncTableToServer("VHV_TR_EVALUATE4","/saveEvaluate4s"),
        syncTableToServer("VHV_TR_EVALUATE5","/saveEvaluate5s"),
        syncTableToServer("VHV_TR_EVALUATE6","/saveEvaluate6s"),
        syncTableToServer("VHV_TR_EVALUATE7","/saveEvaluate7s"),
        syncTableToServer("VHV_TR_EVALUATE8","/saveEvaluate8s"),
        syncTableToServer("VHV_TR_EVALUATE9","/saveEvaluate9s"),
        syncTableToServer("VHV_TR_EVALUATE10","/saveEvaluate10s"),
        syncTableToServer("VHV_TR_EVALUATE11","/saveEvaluate11s"),
        syncTableToServer("VHV_TR_EVALUATE12","/saveEvaluate12s"),
        syncTableToServer("VHV_TR_EVALUATE13","/saveEvaluate13s"),
      ]);
      console.log(`sync all result`, result);
      //ถ้า sycn สำเร็จ Initial ใหม่
      queryALL("VHV_TR_VHV", function (vhv_tr_vhv) {
          console.log(vhv_tr_vhv)
        let serverVersion = result.find((item)=>item.status==true).CURRENT_VERSION
        let clientVersion =vhv_tr_vhv[0].MB_VERSION!="null"?vhv_tr_vhv[0].MB_VERSION:0;
        console.log(
          `local version :${clientVersion} ,server version:${serverVersion}`
        );
        //ถ้า version ไม่เท่ากัน Initial ใหม่
        if (clientVersion < serverVersion) {
          getInitial();
        }
      });
    } catch (error) {
      console.log(`sync all result error`, error);
    }
  }
  function syncTableToServer(table, url) {
    return new Promise(function (resolve, reject) {
      queryALL(table, function (result) {
        let data = result.filter((row) => row.GUID == "" || row.GUID == null);
        console.log(`sync ${table}`, data);

        if (data.length != 0) {
          // data[0].ELDER_ID="test"
          console.log(token.getUserToken())
          let postData = {
            datas:data ,
            datas: JSON.parse(CryptoJSAesJson.encrypt(data, secret_key_aes)),
            token: token.getUserToken(),
            cybertext: "1",
          };
          console.log(postData);
          callAPI(
            `${api_base_url}${url}`,
            "POST",
            JSON.stringify(postData)
            ,
            (res) => {
              console.log(`sync success ${table}`, res);
              resolve(res);
            },
            (err) => {
              console.log(`sync error ${table}`, err);
              reject(err);
            }
          );
        } else {
          resolve(`${table} no data to sync`);
          console.log(`${table} no data to sync`);
        }
      });
    });
  }
  let syncDataInterval = setInterval(function () {
    syncData();
  }, 60000 * 5);
  syncData();
});

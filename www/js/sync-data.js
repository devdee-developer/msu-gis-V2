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
        syncTableToServer("VHV_TR_ELDER","/saveElders"),
        syncTableVisitSolves(),
      ]);
      console.log(`sync all result`, result);
      //ถ้า sycn สำเร็จ Initial ใหม่
      queryALL("VHV_TR_VHV", function (vhv_tr_vhv) {
        // console.log(vhv_tr_vhv)
        let serverVersion = result.find((item) => item.status == true);
        let clientVersion =
          vhv_tr_vhv[0].MB_VERSION != "null" ? vhv_tr_vhv[0].MB_VERSION : 0;
        if (serverVersion) {
          console.log(
            `local version :${clientVersion} ,server version:${serverVersion.CURRENT_VERSION}`
          );
          //ถ้า version ไม่เท่ากัน Initial ใหม่
          if (clientVersion < serverVersion.CURRENT_VERSION) {
            getInitial();
          }
        }
      });
    } catch (error) {
      console.log(`sync all result error`, error);
    }
  }
  function syncTableVisitSolves() {
    return new Promise(function (resolve, reject) {
      queryALL("VHV_TR_VISIT", function (vhv_tr_visit) {
        queryALL("VHV_TR_SOLVE", function (vhv_tr_solve) {
          let data = vhv_tr_visit.filter(
            (row) => row.GUID == "" || row.GUID == null
          );
          data = data.map(row=>({...row,solvedatas:vhv_tr_solve.filter(solve=>solve.VISIT_ID==row.ID)}))
          console.log(data);

          setTimeout(() => {
            console.log(`sync VHV_TR_VISIT`, data);
          }, 5000);

          if (data.length != 0) {
            // data[0].ELDER_ID="test"
            console.log(token.getUserToken());
            let postData = {
              // datas:data ,
              datas: JSON.parse(CryptoJSAesJson.encrypt(data, secret_key_aes)),
              token: token.getUserToken(),
              cybertext: "1",
            };
            console.log(postData);
            callAPI(
              `${api_base_url}/saveVisitSolves`,
              "POST",
              JSON.stringify(postData)
              ,
              (res) => {
                console.log(`sync success VHV_TR_VISIT`, res);
                resolve(res);
              },
              (err) => {
                console.log(`sync error VHV_TR_VISIT`, err);
                reject(err);
              }
            );
          } else {
            resolve(`VHV_TR_VISIT no data to sync`);
            console.log(`VHV_TR_VISIT no data to sync`);
          }
        });
      });
    });
  }
  function syncTableToServer(table, url) {
    return new Promise(function (resolve, reject) {
      queryALL(table, function (result) {
        let data = result.filter((row) => row.GUID == "" || row.GUID == null);
        if (table == "VHV_TR_ELDER") {
          data = result.filter((row) => row.UPDATE_FLAG == 1);
        }

        console.log(`sync ${table}`, data);

        if (data.length != 0) {
          // data[0].ELDER_ID="test"
          console.log(token.getUserToken());
          let postData = {
            // datas:data ,
            datas: JSON.parse(CryptoJSAesJson.encrypt(data, secret_key_aes)),
            token: token.getUserToken(),
            cybertext: "1",
          };
          console.log(postData);
          callAPI(
            `${api_base_url}${url}`,
            "POST",
            JSON.stringify(postData),
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
  let syncDataInterval;
  if (sync_data) {
    syncDataInterval = setInterval(function () {
      syncData();
    }, 60000 * 5);
    syncData();
  }
});

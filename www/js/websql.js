var db = openDatabase("mydb", "1.0", "Test DB", 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql("CREATE TABLE IF NOT EXISTS tb_logs (id unique, log)");
});

const sqlite3 = require("sqlite3").verbose();
const xlsx = require("xlsx");

function insertExcelToSQLite(excelFilePath, sheetName, dbName, tableName) {
  const workbook = xlsx.readFile(excelFilePath);
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log(`Connected to SQLite database: ${dbName}`);

      jsonData.forEach((row) => {
        const columns = Object.keys(row).join(", ");
        const placeholders = Object.keys(row)
          .map(() => "?")
          .join(", ");
        const values = Object.values(row);

        console.log("columns:", row);

        const sql = `INSERT INTO countries (${columns}) VALUES (${placeholders})`;

        db.run(sql, values, (err) => {
          if (err) {
            // console.error("Error inserting data:", err.message);
          } else {
            console.log("Row inserted successfully");
          }
        });
      });

      db.close((err) => {
        if (err) {
          console.error("Error closing the database:", err.message);
        } else {
          console.log("Database connection closed.");
        }
      });
    }
  });
}

const excelFilePath = "Final manufactured plastics goods - Import_0.csv";
const sheetName = "Sheet1";
const dbName = "data.db";
const tableName = "countries";

insertExcelToSQLite(excelFilePath, sheetName, dbName, tableName);

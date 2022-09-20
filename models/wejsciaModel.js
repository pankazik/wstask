const db = require("../db");

class Wejscie {
  constructor(wejscie) {
    this.bramkaId = wejscie.bramkaId;
    this.kierunek = wejscie.kierunek;
    this.dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  async add() {
    const sql = `INSERT INTO wejscia(kierunek,bramka_id,data) VALUES('${this.kierunek}','${this.bramkaId}','${this.dateNow}') `;
    const newWejscie = await db.execute(sql);

    return newWejscie;
  }

  static delete(id) {
    const sql = `DELETE FROM wejscia where wejscie_id=${id}`;
    return db.execute(sql);
  }

  static countWejscia(dataTime, global = false) {
    const sql2 = `SELECT CONCAT(HOUR(data), ':00-', HOUR(data)+1, ':00') AS Hours,COUNT(*) AS 'usage',kierunek,bramka_id FROM wejscia ${
      !global ? `WHERE date(data)='${dataTime}'` : ""
    } GROUP BY HOUR(data),kierunek,bramka_id;`;
    return db.execute(sql2);
  }
}

module.exports = Wejscie;

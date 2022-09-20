const db = require("../db");

class Bramka {
  constructor(bramka) {
    this.name = bramka.name;
  }

  async add() {
    const sql = `INSERT INTO bramki(bramka_name) VALUES('${this.name}') `;
    const newBramka = await db.execute(sql);

    return newBramka;
  }

  static findAll() {
    const sql = `SELECT * FROM bramki`;
    return db.execute(sql);
  }

  static delete(id) {
    const sql = `DELETE FROM bramki where bramka_id=${id}`;
    return db.execute(sql);
  }

  static update(id, name) {
    const sql = `UPDATE bramki SET bramka_name ='${name}' WHERE bramka_id = ${id}`;
    return db.execute(sql);
  }
}

module.exports = Bramka;

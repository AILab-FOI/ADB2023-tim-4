const Database = require("./database.js");

class VideoDAO {

	constructor() {
		this.database = new Database();
	}

    fetchAll = async function () {
		this.database.connectToDb();
		let sql = "SELECT * FROM video;"
		var data = await this.database.executeQuery(sql, []);
		this.database.closeConectionToDb();
		return data;
	}

    fetchById = async function (id) {
		this.database.connectToDb();
		let sql = "SELECT * FROM video WHERE id =?;"
		var data = await this.database.executeQuery(sql, [id]);
		this.database.closeConectionToDb();
		return data;
	}
}

module.exports = VideoDAO;

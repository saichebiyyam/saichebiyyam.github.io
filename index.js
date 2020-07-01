const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql');

// File path.
readXlsxFile('test.xlsx').then((rows) => {
	console.log(rows);
	
	
	
	// Remove Header ROW
	rows.shift();

	// Create a connection to the database
	const connection = mysql.createConnection({
			host: '127.0.0.1',
            user: 'root',
            database: 'uploadfile',
            password: '',
            port: '3306'
	});

	// Open the MySQL connection
	connection.connect((error) => {
		if (error) {
			console.error(error);
		} else {
			let query = 'INSERT INTO sales ( Transaction_date ,Product, Price, Payment_Type, Name, City, State, Country, Account_Created, Last_Login, Latitude, Longitude) VALUES ?';
			connection.query(query, [rows], (error, response) => {
				console.log(error || response);
				
				/**
					OkPacket {
					  fieldCount: 0,
					  affectedRows: 5,
					  insertId: 0,
					  serverStatus: 2,
					  warningCount: 0,
					  message: '&Records: 5  Duplicates: 0  Warnings: 0',
					  protocol41: true,
					  changedRows: 0 }				
				*/
			});
		}
	});
})
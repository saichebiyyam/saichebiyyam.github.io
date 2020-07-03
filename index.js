const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql');

/*----------------------RANDOM NAME GENERATOR----------------------------------------*/
var random_name = require('node-random-name');
var name_last=random_name({ last: true });
/*----------------------RANDOM NAME GENERATOR----------------------------------------*/


// File path.
readXlsxFile('test.xlsx').then((rows) => {
	console.log(rows);
	let heading=rows[0].join(',');
	let heading1=rows[0];
	
	//console.log(rows[0].length);

	/*----------------------TO PRODUCE THE HEADING--------------------------*/
	let b="";
	for(var i=0;i<heading1.length;i++){
		if(i == heading1.length-1){
			b+=heading1[i]+" VARCHAR(255)";
			continue;
		}
		b+=heading1[i]+" VARCHAR(255),";
	}
	let tablename=name_last;
	let sql='CREATE TABLE '+tablename+'('+b+')';
	/* ----------------------------TO PRODUCE THE HEADING----------------------------------------------------*/
	
	// console.log(sql);
	
	
	// Remove Header ROW
	rows.shift();


	// Create a connection to the database
	/*
	*/
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
			//to create a table
			connection.query(sql, [rows], (error, response) => {
				console.log(error || response);
								
			});
			//add into the table
			let query = 'INSERT INTO '+tablename+' ('+heading+') VALUES ?';
			connection.query(query, [rows], (error, response) => {
				console.log(error || response);
								
			});
		}
	});
})
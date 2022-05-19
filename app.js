const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'sport'
});

async function getInfo(request, response) {
    try{
        connection.query("SELECT * FROM users WHERE id = ?", ['d74155fb-732d-4c40-bdc8-9b2374c8d941'], (err, filds) => {
            if(err) return console.log(err), response.status(400).json({ error: err.message });

            return response.status(200).json({ status: true, data: filds });
        });
    }catch(e){
        console.log(e);
        return response.status(500).json({ error: e.message });
    }
}

app.get('/', getInfo)

app.listen(3000, () => console.log('server started port 3000'))
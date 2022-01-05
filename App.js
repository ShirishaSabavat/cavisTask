const express = require("express");
const sqlite = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "userData.db");

const app = express();
app.use(express.json());

let db = null;

//Initialize the db and server

let initializeDbAndServer = async () => {
    try {
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(3004, () => {
            console.log("Server running at http://localhost:3004");
        });
    } catch (e) {
        console.log(`DB Error:${e.message}`);
        process.exit(1);
    }
};

initializeDbAndServer();

//Personal Details

app.post("/savedraft", async (request, response) => {
    const { fullName, email, number, permanentAddress, currentAddress } = request.body;

    const getUserQuery = `SELECT * FROM user WHERE username = '${fullName}';`;

    const userDB = await db.get(getUserQuery);
    console.log(userDB);

    const registerQuery = `
      INSERT INTO 
        user (fullname,email,number,permanentaddress,currentaddress)
      VALUES
        (
         '${fullName}',
         '${email}',
         '${number}',
         '${permanentAddress}',
         '${currentAddress}'
        );`;
    await db.run(registerQuery);
    //response.status(200);
    response.send("Data Saved successfully");
});

app.get('/', (req, res)=>{
    res.send('<h1>Hello............</h1>')
})
app.post("/next", async (request, response) => {
    const { fullName, email, number, permanentAddress, currentAddress } = request.body;

    const getUserQuery = `SELECT * FROM user WHERE username = '${fullName}';`;

    const userDB = await db.get(getUserQuery);
    console.log(userDB);

    const registerQuery = `
      INSERT INTO 
        user (fullname,email,number,permanentaddress,currentaddress)
      VALUES
        (
         '${fullName}',
         '${email}',
         '${number}',
         '${permanentAddress}',
         '${currentAddress}'
        );`;
    await db.run(registerQuery);
    //response.status(200);
    response.send("Data Saved successfully");
});
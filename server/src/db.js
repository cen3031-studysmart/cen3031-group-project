import db from 'oracledb';
import sql from 'sql-template-tag';
// import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({path: "../.env"});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
// console.log({dbUser, dbPassword});

async function createConnection() {
    try {
        const connection = await db.getConnection({
            user: dbUser,
            password: dbPassword,
            connectString: 'oracle.cise.ufl.edu:1521/orcl'
        });

        return connection;
    } catch (e) {
        console.error('Could not connect to Oracle');
    }

    return null;
}

// async function connect() {
//     const connection = await db.getConnection({
//         user: dbUser,
//         password: dbPassword,
//         connectString: 'oracle.cise.ufl.edu:1521/orcl'
//     });

//     console.log("connected to Oracle");
//     // console.log(connection);

//     const result = await connection.execute('SELECT * FROM "EMMANUELNIFAKOS".student');
//     console.log(result.rows);

//     connection.close();
// }

export async function createUser(userId) {
    try {
        const connection = await createConnection();

        // const result = await connection.execute(sql`SELECT COUNT(*) FROM "EMMANUELNIFAKOS".studysmart_user`);
        // const result = await connection.execute(sql`SELECT * FROM "EMMANUELNIFAKOS".studysmart_user`);
        const result = await connection.execute(sql`SELECT * FROM studysmart_user`);
        // const result = await connection.execute(sql`SELECT * FROM old_team`);
        // const result = await connection.execute(sql`SELECT table_name FROM user_tables`);
        console.log('result:');
        console.log(result.rows);
        connection.close();

        // const result = await connection.execute(sql`INSERT INTO "EMMANUELNIFAKOS".studysmart_user VALUES (${userId})`);
    } catch (e) {
        console.error(`User id ${userId} could not be created`);
    }
}

await createUser('user_34567');

export function getUsers() {

}

export function getResources() {

}

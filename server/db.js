import db from 'oracledb';
import sql from 'sql-template-tag';
import dotenv from 'dotenv';
dotenv.config({path: ".env"});

/**
 * @type {string}
 */
const user = process.env.DB_USER;

/**
 * @type {string}
 */
const password = process.env.DB_PASSWORD;

/**
 * @type {string}
 */
const connectString = 'oracle.cise.ufl.edu:1521/orcl';

/**
 * Creates and returns a database connection instance
 * @returns{db.Connection} - Oracle instance
 */
async function createConnection() {
    try {
        const connection = await db.getConnection({ user, password, connectString });
        return connection;
    } catch (e) {
        console.error(e);
    }

    return null;
}

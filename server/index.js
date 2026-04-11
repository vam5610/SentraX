import express from 'express';
import pool from './db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());



async function startServer() {
	try {
		const client = await pool.connect();
		try {
			await client.query('SELECT 1');
			console.log('✅ PostgreSQL connected');
		} finally {
			client.release();
		}
	} catch (err) {
		console.error('❌ DB connection failed:', err.message || err);
		process.exit(1);
	}

	const PORT = process.env.PORT || 3000;
	app.get('/', (req, res) => res.json({ message: 'API is running' }));
	app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

startServer();
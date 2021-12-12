const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
	try {
		const mongo_uri =
			process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shop';
		console.log(mongo_uri);
		const conn = await mongoose.connect(mongo_uri);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;

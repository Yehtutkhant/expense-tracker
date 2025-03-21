import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			ssl: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
};

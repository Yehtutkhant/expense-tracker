import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	category: {
		type: String,
		enum: ["expense", "investment", "saving"],
		required: true,
	},
	paymentType: {
		type: String,
		enum: ["cash", "card"],
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		default: "N/A",
	},
	date: {
		type: Date,
		required: true,
	},
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

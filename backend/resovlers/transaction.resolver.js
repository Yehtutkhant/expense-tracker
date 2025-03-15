import Transaction from "../models/transaction.model.js";

const transactionResolver = {
	Query: {
		transactions: async (_, __, context) => {
			try {
				const user = await context.getUser();
				if (!user) {
					throw new Error("User not authenticated");
				}

				const transactions = await Transaction.find({ userId: user._id });
				return transactions;
			} catch (err) {
				console.log("Error in transactions resovler: " + err);
				throw new Error(err.message);
			}
		},
		transaction: async (_, { transactionId }) => {
			try {
				const transaction = await Transaction.findbyId(transactionId);
				return transaction;
			} catch (err) {
				console.error("Error in transaction resovler: " + err);
				throw new Error(err.message);
			}
		},
	},

	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const user = await context.getUser();
				if (!user) {
					throw new Error("User not authenticated");
				}

				const transaction = new Transaction({
					...input,
					userId: user._id,
				});
				const newTransaction = await transaction.save();
				return newTransaction;
			} catch (err) {
				console.error("Error in createTransaction resovler: " + err);
				throw new Error(err.message);
			}
		},
		updateTransaction: async (_, { input }, context) => {
			try {
				const user = await context.getUser();
				if (!user) {
					throw new Error("User not authenticated");
				}

				const updatedTransaction = await Transaction.findbyIdAndUpdate(
					input.transactionId,
					input,
					{ new: true },
				);
				return updatedTransaction;
			} catch (err) {
				console.error("Error in update resovler: " + err);
				throw new Error(err.message);
			}
		},

		deleteTransaction: async (_, { transactionId }, context) => {
			try {
				const user = await context.getUser();
				if (!user) {
					throw new Error("User not authenticated");
				}
				const deletedTransaction = await Transaction.findbyIdAndDelete(
					transactionId,
				);
				return deletedTransaction;
			} catch (err) {
				console.error("Error in deleteTransaction resolver: " + err);
				throw new Error(err.message);
			}
		},
	},
};

export default transactionResolver;

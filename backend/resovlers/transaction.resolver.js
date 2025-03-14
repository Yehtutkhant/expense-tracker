import { transactions } from "../data/dummyData.js";

const transactionResolver = {
	Query: {
		transactions: () => transactions,
		transaction: (_, { transactionId }) =>
			transactions.map((transaction) => transaction._id === transactionId),
	},
};

export default transactionResolver;

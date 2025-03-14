const transactionTypeDef = `#graphql

 type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    category: String!
    paymentType: String!
    amount: Float!
    location: String
    date: String!
    user: User!
 }

 type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
 }

 type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction( input: UpdateTransactionInput!): Transaction!
    deleteTransaction( transactionId: ID!): Transaction!
 }

 input CreateTransactionInput {
    description: String!
    category: String!
    paymentType: String!
    amount: Float!
    location: String
    date: String!
 }

 input UpdateTransactionInput {
    transactionId: ID!
    description: String!
    category: String!
    paymentType: String!
    amount: Float!
    location: String
    date: String!
 }

`;

export default transactionTypeDef;

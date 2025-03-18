// core libraries
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

// auth libraries
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import passport from "passport";

// Graphql Apollo libraries
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// local imports
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resovlers/index.js";
import { connectDB } from "./db/connectDB.js";
import { passportConfig } from "./passport/passport.config.js";
import { buildContext } from "graphql-passport";

//env
dotenv.config();

// express setup
const app = express();
const httpServer = http.createServer(app);

// session and mongo session setup

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
	uri: process.env.MONGODB_URI,
	collection: "sessions",
});
store.on("error", (err) => {
	console.log("MongoDB session store error!");
});

app.use(
	session({
		secret: process.env.SESSION_SECRETE,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		},
		store: store,
	}),
);

// passport setup

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// Apollo server setup

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugin: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	"/graphql",
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
	express.json(),
	expressMiddleware(server, {
		context: async ({ req, res }) => buildContext({ req, res }),
	}),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

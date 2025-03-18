import passport from "passport";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";

export const passportConfig = () => {
	passport.serializeUser((user, done) => {
		console.log("Serializing user");
		done(null, user._id);
	});
	passport.deserializeUser(async (id, done) => {
		console.log("Deserializing user");
		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (err) {
			console.error(err);
			done(err, null);
		}
	});
	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("Invalid username");
				}
				const isValidPassword = await bcrypt.compare(password, user.password);
				if (!isValidPassword) {
					throw new Error("Invalid password");
				}
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}),
	);
};

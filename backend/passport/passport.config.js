import passport from "passport";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";

export const passportConfig = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("Invalid username");
				}
				const isValidPassword = bcrypt.compare(password, user.password);
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

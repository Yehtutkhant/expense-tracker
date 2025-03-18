import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const userResolver = {
	Query: {
		authUser: async (_, __, context) => {
			try {
				const authUser = await context.getUser();
				return authUser;
			} catch (err) {
				console.error("Error in authUser resolver: " + err);
				throw new Error(err.message);
			}
		},
		user: async (_, { userId }, __) => {
			try {
				const user = await User.findbyId(userId);
				return user;
			} catch (error) {
				console.error("Error in user resolver: " + err);
				throw new Error(err.message);
			}
		},
	},

	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, name, password, gender } = input;
				if (!username || !name || !password || !gender) {
					throw new Error("All fields are required");
				}
				const existingUser = await User.findOne({
					username,
				});
				if (existingUser) {
					throw new Error("Username already exists");
				}

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

				const newUser = new User({
					username,
					name,
					password: hashedPassword,
					gender,
					profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
				});

				await newUser.save();
				await context.login(newUser);
				return await context.getUser();
			} catch (err) {
				console.error("Error in signUp resolver: ", err);
				throw new Error(err.message);
			}
		},
		login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				if (!username || !password) {
					throw new Error("All fields are required");
				}
				const authUser = await context.authenticate("graphql-local", {
					username,
					password,
				});

				await context.login(authUser.user);

				return authUser.user;
			} catch (err) {
				console.error("Error in login resolver: ", err);
				throw new Error(err.message);
			}
		},
		logout: async (_, __, context) => {
			try {
				await context.logout();
				context.req.session.destroy((err) => {
					if (err) throw err;
				});
				context.res.clearCookie("connect.sid");
				return { message: "Logged out successfully" };
			} catch (err) {
				console.error("Error in logout resolver: ", err);
				throw new Error(err.message);
			}
		},
	},
};

export default userResolver;

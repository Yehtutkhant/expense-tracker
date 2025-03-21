import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unqiue: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female"],
		},
		profilePicture: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true },
);
const User = mongoose.model("User", userSchema);

export default User;

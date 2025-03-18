import React from "react";

const ErrorPage = () => {
	return (
		<div className="max-w-screen mx-auto flex items-center justify-center py-10 px-3 h-screen z-100">
			<div className="md:text-4xl text-xl font-bold relative z-50">
				<p className="bg-gradient-to-r from-red-500 to-red-800 text-transparent bg-clip-text">
					Error occurred please refresh the page!
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;

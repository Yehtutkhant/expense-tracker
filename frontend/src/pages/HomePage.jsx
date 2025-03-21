import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/ui/Cards";
import TransactionForm from "../components/ui/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_AUTH_USER } from "../graphql/queries/user.query";
import toast from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const [logout] = useMutation(LOGOUT, {
		refetchQueries: [GET_AUTH_USER],
	});

	const { data: authUser } = useQuery(GET_AUTH_USER);
	const chartData = {
		labels: ["Saving", "Expense", "Investment"],
		datasets: [
			{
				label: "%",
				data: [13, 8, 3],
				backgroundColor: [
					"rgba(75, 192, 192)",
					"rgba(255, 99, 132)",
					"rgba(54, 162, 235)",
				],
				borderColor: [
					"rgba(75, 192, 192)",
					"rgba(255, 99, 132)",
					"rgba(54, 162, 235, 1)",
				],
				borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	};

	const handleLogout = async () => {
		try {
			const { message } = await logout();
			toast.success(message);
		} catch (err) {
			console.error(err);
			toast.error(err.message);
		}
	};

	const loading = false;

	return (
		<>
			<div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
				<div className="flex items-center mb-4">
					<p className="md:text-4xl text-2xl font-bold text-center relative z-50  mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
						Spend wisely, track wisely
					</p>
					<img
						src={authUser?.authUser.profilePicture}
						className="w-11 h-11 rounded-full border cursor-pointer"
						alt="Avatar"
					/>
					{!loading && (
						<MdLogout
							className="mx-2 w-5 h-5 cursor-pointer"
							onClick={handleLogout}
						/>
					)}
					{/* loading spinner */}
					{loading && (
						<div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
					)}
				</div>
				<div className="flex flex-wrap w-full justify-center items-center gap-6">
					<div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
						<Doughnut data={chartData} />
					</div>

					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;

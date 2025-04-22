// import { DataTable } from "@/components/table/data-table";
// import { Payment } from "@/types/payment-type";

// const column = [
// 	{
// 		accessorKey: "status",
// 		header: "Status",
// 	},
// 	{
// 		accessorKey: "email",
// 		header: "Email",
// 	},
// 	{
// 		accessorKey: "amount",
// 		header: "Amount",
// 	},
// 	{
// 		accessorKey: "bool",
// 		header: "Bool",
// 		enableSorting: false,
// 	},
// 	{
// 		id: "actions",
// 	},
// ];

// const data: Payment[] = [
// 	{
// 		id: "1",
// 		amount: 100,
// 		status: "pending",
// 		email: "aaa@gmail.com",
// 		bool: true,
// 	},
// 	{
// 		id: "2",
// 		amount: 200,
// 		status: "processing",
// 		email: "bbb@gmail.com",
// 		bool: false,
// 	},
// 	{
// 		id: "3",
// 		amount: 300,
// 		status: "success",
// 		email: "ccc@gmail.com",
// 		bool: true,
// 	},
// 	{
// 		id: "4",
// 		amount: 4,
// 		status: "failed",
// 		email: "ddd@gmail.com",
// 		bool: false,
// 	},
// 	{
// 		id: "5",
// 		amount: 500,
// 		status: "pending",
// 		email: "eee@gmail.com",
// 		bool: true,
// 	},
// 	{
// 		id: "6",
// 		amount: 50,
// 		status: "processing",
// 		email: "aba@gmail.com",
// 		bool: false,
// 	},
// 	{
// 		id: "7",
// 		amount: 50,
// 		status: "success",
// 		email: "abA@gmail.com",
// 		bool: true,
// 	},
// ];

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center p-9 h-auto w-full pb-28">
			<h1 className="text-4xl font-bold">Hello, World!</h1>
			<p className="my-4 text-lg">Welcome to my Pro Page!!!!!</p>
			{/* <DataTable data={data} column={column} /> */}
		</div>
	);
}

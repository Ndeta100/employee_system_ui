import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Employee from "./Employee";

const EmployeeList = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [employees, setEmployees] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await EmployeeService.getEmployees();
				setEmployees(response.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	const deleteEmployee = (e, id) => {
		e.preventDefault();
		EmployeeService.deleteEmployee(id).then((res) => {
			if (employees) {
				setEmployees((prevElement) => {
					return prevElement.filter((employee) => employee.id !== id);
				});
			}
		});
	};

	return (
		<div className="container mx-auto my-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">List of employees</h1>
				<button
					onClick={() => navigate("/addEmployee")}
					className="rounded bg-blue-500 text-white px-6 py-2 font-semibold hover:bg-blue-600 transition-colors"
				>
					Add Employee
				</button>
			</div>
			<div className="bg-white shadow-md rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-6 py-4 text-left text-gray-600 uppercase">
								First Name
							</th>
							<th className="px-6 py-4 text-left text-gray-600 uppercase">
								Last Name
							</th>
							<th className="px-6 py-4 text-left text-gray-600 uppercase">
								Email ID
							</th>
							<th className="px-6 py-4 text-right text-gray-600 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					{!loading && (
						<tbody className="divide-y divide-gray-200">
							{employees.map((employee) => (
								<Employee
									employee={employee}
									deleteEmployee={deleteEmployee}
									key={employee.id}
								></Employee>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default EmployeeList;

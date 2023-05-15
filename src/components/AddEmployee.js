import EmployeeService from "../services/EmployeeService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
	const [employee, setEmployee] = useState({
		id: "",
		firstName: "",
		lastName: "",
		emailId: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const value = e.target.value;
		setEmployee({ ...employee, [e.target.name]: value });
	};

	const saveEmployee = (e) => {
		e.preventDefault();
		EmployeeService.saveEmployee(employee)
			.then((response) => {
				console.log(response);
				navigate("/employeeList");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const reset = (e) => {
		e.preventDefault();
		setEmployee({
			id: "",
			firstName: "",
			lastName: "",
			emailId: "",
		});
	};

	return (
		<div className="flex max-w-2xl mx-auto shadow-lg rounded-md">
			<div className="px-8 py-8">
				<div className="font-semibold text-3xl tracking-wider text-gray-800 mb-6">
					Add New Employee
				</div>
				<div className="mb-6">
					<label className="block text-gray-600 text-sm font-normal mb-2">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						value={employee.firstName}
						onChange={(e) => handleChange(e)}
						className="h-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
					></input>
				</div>
				<div className="mb-6">
					<label className="block text-gray-600 text-sm font-normal mb-2">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						value={employee.lastName}
						onChange={(e) => handleChange(e)}
						className="h-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
					></input>
				</div>
				<div className="mb-6">
					<label className="block text-gray-600 text-sm font-normal mb-2">
						Email
					</label>
					<input
						type="email"
						name="emailId"
						value={employee.emailId}
						onChange={(e) => handleChange(e)}
						className="h-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
					></input>
				</div>
				<div className="flex justify-center items-center mt-8">
					<button
						onClick={saveEmployee}
						className="rounded-md text-white font-semibold bg-green-500 hover:bg-green-700 py-2 px-6 mr-4 transition-colors"
					>
						Save
					</button>
					<button
						onClick={reset}
						className="rounded-md text-white font-semibold bg-red-500 hover:bg-red-700 py-2 px-6 transition-colors"
					>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddEmployee;

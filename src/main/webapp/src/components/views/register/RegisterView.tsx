import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, TextField } from "@mui/material";
import { useState } from "react";
import { Errors, Form, validators } from "react-decorate-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

interface IRegisterForm {
	username: string;
	password: string;
	confirmPassword: string;
}

class RegisterForm implements IRegisterForm {
	@validators.string.Size({ min: 5 })
	username!: string;
	@validators.string.Size({ min: 5 })
	password!: string;
	@validators.string.Size({ min: 5 })
	confirmPassword!: string;
	@validators.boolean.AssertTrue("Passwords must match")
	get passwordsMatch(): boolean {
		return this.password === this.confirmPassword;
	}
}

export default function RegisterView() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | undefined>();

	const [value, setValue] = useState<IRegisterForm>({
		username: "",
		password: "",
		confirmPassword: "",
	});

	async function handleSubmit(data: RegisterForm) {
		try {
			await AuthService.register(data);
			alert("Successful registration. Please login.");
			navigate("/login");
		} catch (err: any) {
			setError(err.response.data.errors[0] as string);
		}
	}

	function onInputChange(e: any) {
		const { name, value: inputValue } = e.target;
		setValue({
			...value,
			[name]: inputValue,
		});
	}

	return (
		<Card className="p-4">
			<Form
				className="flex flex-col gap-4"
				handleSubmit={handleSubmit}
				model={RegisterForm}
				value={value}
			>
				<span className="font-bold text-2xl text-center">SIGN UP</span>
				<Input name="username">
					<TextField
						name="username"
						label="Username"
						variant="outlined"
						className="w-full"
						placeholder="Username"
						onChange={(e) => onInputChange(e)}
					/>
				</Input>
				<Input name="password">
					<TextField
						name="password"
						label="Password"
						variant="outlined"
						className="w-full"
						type="password"
						placeholder="Password"
						onChange={(e) => onInputChange(e)}
					/>
				</Input>
				<Input name="confirmPassword">
					<TextField
						name="confirmPassword"
						label="Confirm password"
						variant="outlined"
						className="w-full"
						type="password"
						placeholder="Confirm password"
						onChange={(e) => onInputChange(e)}
					/>
					<Errors name="passwordsMatch" />
				</Input>
				<Button
					tailwindColor="green"
					iconType={faUserPlus}
					text="Submit"
					type="submit"
				/>
				{error && <span className="text-red-500 text-center">{error}</span>}
			</Form>
		</Card>
	);
}

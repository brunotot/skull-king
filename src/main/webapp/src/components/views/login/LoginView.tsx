import {
	faRightToBracket,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Card, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Form, validators } from "react-decorate-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { LoginDto } from "../../../dto/LoginDto";
import AuthService from "../../../services/AuthService";
import SocketService from "../../../services/SocketService";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const USER_LOGINS: LoginDto[] = [
	{
		username: "bruno",
		password: "bruno",
	},
	{
		username: "tihana",
		password: "tihana",
	},
	{
		username: "stjepan",
		password: "stjepan",
	},
	{
		username: "sanja",
		password: "sanja",
	},
];

interface ILoginForm {
	username: string;
	password: string;
}

class LoginForm implements ILoginForm {
	@validators.string.Size({ min: 5 })
	username!: string;
	@validators.string.Size({ min: 5 })
	password!: string;
}

export default function LoginView() {
	const navigate = useNavigate();
	const { auth, setAuth } = useContext(UserContext);
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	async function loginAs(loginDto: LoginDto) {
		const userDto = await AuthService.login(loginDto);
		await SocketService.disconnect();
		await SocketService.connect();
		setAuth(userDto);
		navigate("/");
	}

	const [value, setValue] = useState<ILoginForm>({
		username: "",
		password: "",
	});

	async function handleSubmit(data: LoginForm) {
		try {
			await loginAs(data);
		} catch (err) {
			setInvalidCredentials(true);
		}
	}

	function onInputChange(e: any) {
		const { name, value: inputValue } = e.target;
		setValue({
			...value,
			[name]: inputValue,
		});
	}

	if (import.meta.env.VITE_EASY_LOGIN === "true") {
		return (
			<div className="bg-white rounded p-4 flex flex-col gap-4">
				<span className="font-bold text-xl">Choose user</span>
				<div className="flex flex-col gap-2">
					{USER_LOGINS.map((loginDto) => (
						<Button
							tailwindColor="slate"
							onClick={() => loginAs(loginDto)}
							key={loginDto.username}
							text={loginDto.username}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<Card className="p-4">
			<Form
				className="flex flex-col gap-4"
				handleSubmit={handleSubmit}
				model={LoginForm}
				value={value}
			>
				<span className="font-bold text-2xl text-center">LOGIN</span>
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
				<Button
					tailwindColor="green"
					iconType={faRightToBracket}
					text="Login"
					type="submit"
				/>
				<Button
					tailwindColor="orange"
					iconType={faUserPlus}
					text="Sign Up"
					onClick={() => navigate("/register")}
				/>
				{invalidCredentials && (
					<span className="text-red-500 text-center">Invalid credentials</span>
				)}
			</Form>
		</Card>
	);
}

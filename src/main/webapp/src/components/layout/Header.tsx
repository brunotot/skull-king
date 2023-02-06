import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../../services/AuthService";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Header() {
	const navigate = useNavigate();
	const { auth, logout } = useContext(UserContext);

	return (
		<header className="flex justify-between w-full border border-1 text-white rounded bg-slate-700 p-2 shadow bg-opacity-50 ">
			<div className="flex gap-2 items-center">
				{auth && (
					<>
						<FontAwesomeIcon color="#fff" icon={faUserCircle} />
						<span>{AuthService.username}</span>
					</>
				)}
			</div>
			{auth ? (
				<Button text="Logout" onClick={() => logout()} />
			) : (
				<Button text="Login" onClick={() => navigate("/login")} />
			)}
		</header>
	);
}

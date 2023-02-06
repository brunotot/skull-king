import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notFoundImage from "./../../assets/img/404.svg";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center flex-col">
			<img width="75%" src={notFoundImage} />
			<span className="text-3xl font-bold text-white text-center">
				Oops, the page you are trying to access does not exist
			</span>
			<Button
				tailwindColor="green"
				classNameAppend="text-2xl font-bold mt-8"
				onClick={() => navigate(-1)}
				text="Back"
				iconType={faLeftLong}
			/>
		</div>
	);
}

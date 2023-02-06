import { Errors } from "react-decorate-form";

export type InputProps = {
	children: React.ReactNode;
	name: string;
};

export default function Input(props: InputProps) {
	const { children, name } = props;
	return (
		<div>
			{children}
			<Errors name={name} />
		</div>
	);
}

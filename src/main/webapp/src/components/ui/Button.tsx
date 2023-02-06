import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type ButtonProps = {
	iconType?: IconProp;
	iconColor?: string;
	text?: string;
	type?: "button" | "submit" | "reset";
	tailwindColor?: "white" | "gray" | "slate" | "green" | "red" | "orange";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	classNameAppend?: string;
	children?: any;
	disabled?: boolean;
};

export default function Button(props: ButtonProps) {
	const {
		iconType,
		iconColor,
		text,
		type = "button",
		tailwindColor = "slate",
		classNameAppend = "",
		disabled = false,
		className: classNameProp,
		children,
		onClick: onClickProp,
	} = props;

	const onClick = disabled ? () => {} : onClickProp;

	let className = classNameProp
		? classNameProp
		: `relative flex items-center justify-center rounded p-2 gap-2 bg-${tailwindColor}-100 ` +
		  `hover:bg-${tailwindColor}-200 hover:outline hover:outline-2 ` +
		  `hover:outline-offset-2 hover:outline-${tailwindColor}-500 ` +
		  `${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

	if (children) {
		className += " flex-col";
		return (
			<button
				disabled={disabled}
				className={`${className} ${classNameAppend}`}
				onClick={onClick}
				type={type}
			>
				{props.children}
			</button>
		);
	}

	return (
		<button
			disabled={disabled}
			className={`${className} ${classNameAppend}`}
			onClick={onClick}
			type={type}
		>
			{iconType && <FontAwesomeIcon color={iconColor} icon={iconType} />}
			{text && <span className="text-black">{text}</span>}
		</button>
	);
}

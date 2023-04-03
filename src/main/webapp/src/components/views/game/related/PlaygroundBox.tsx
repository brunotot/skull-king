export type PlaygroundBoxProps = {
	children: any;
};

export default function PlaygroundBox({ children }: PlaygroundBoxProps) {
	return (
		<div className="mx-8 mt-[7.3rem] lg:mt-2 relative flex items-center justify-center flex-1">
			{children}
		</div>
	);
}

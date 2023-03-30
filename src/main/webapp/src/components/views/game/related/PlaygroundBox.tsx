export type PlaygroundBoxProps = {
	children: any;
};

export default function PlaygroundBox({ children }: PlaygroundBoxProps) {
	return (
		<div className="mt-[8.4rem] lg:mt-0 relative flex items-center justify-center flex-1">
			{children}
		</div>
	);
}

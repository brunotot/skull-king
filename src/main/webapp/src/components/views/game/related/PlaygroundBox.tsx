export type PlaygroundBoxProps = {
	children: any;
};

export default function PlaygroundBox({ children }: PlaygroundBoxProps) {
	return (
		<div className="relative flex items-center justify-center flex-1 border border-4 bg-opacity-50 bg-slate-400 rounded-full">
			{children}
		</div>
	);
}

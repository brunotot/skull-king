import styles from "./../../assets/scss/module/Loader.module.scss";

export default function Loader() {
	return (
		<div className={styles["spinner"]}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

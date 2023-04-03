import React from "react";
import {
	Button,
	Dialog as MUIDialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

export interface DialogProps {
	title: string;
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export default function Dialog(props: DialogProps) {
	const { onClose, open, children, title } = props;

	const handleClose = () => {
		onClose();
	};

	return (
		<MUIDialog onClose={handleClose} open={open}>
			<DialogTitle>{title}</DialogTitle>
			{children}
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>
		</MUIDialog>
	);
}

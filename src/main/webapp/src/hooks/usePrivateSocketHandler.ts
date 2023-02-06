import { useEffect } from "react";
import SocketEvent from "../enum/SocketEvent";
import SocketService from "../services/SocketService";

export default function usePrivateSocketHandler<T>(
	event: SocketEvent,
	handler: (data: T) => void
): void {
	useEffect(() => {
		SocketService.onPrivate(event, handler);
	}, []);
}

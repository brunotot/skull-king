import { Client, Frame, over } from "stompjs";
import SockJS from "sockjs-client";
import AxiosRequestService from "./AxiosRequestService";
import SocketEvent from "../enum/SocketEvent";
import AuthService from "./AuthService";

const DEST_PREFIX_APP = "/topic";
const DEST_PREFIX_USER = "/user";
const DEST_PREFIX_SERVER = "/ws";
const API_URI = "http://192.168.1.68:8080";

function buildStompClient() {
	const stompClient = over(new SockJS(`${API_URI}${DEST_PREFIX_SERVER}`));
	stompClient.debug = () => {};
	return stompClient;
}

class SocketService {
	private stompClient: Client;

	constructor() {
		this.stompClient = buildStompClient();
	}

	get connected() {
		return this.stompClient.connected;
	}

	async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.stompClient.connect(
				AxiosRequestService.headers,
				() => {
					this.onConnectSuccess();
					resolve();
				},
				(error) => {
					this.onConnectError(error);
					reject();
				}
			);
		});
	}

	async disconnect(): Promise<void> {
		return new Promise((resolve) => {
			if (!this.connected) {
				this.onDisconnectSuccess();
				this.stompClient = buildStompClient();
				resolve();
			}
			this.stompClient.disconnect(() => {
				this.onDisconnectSuccess();
				this.stompClient = buildStompClient();
				resolve();
			});
		});
	}

	on<T>(event: SocketEvent, handler: (data: T) => void) {
		this.subscribe(`${DEST_PREFIX_APP}/${event}`, handler);
	}

	onPrivate<T>(event: SocketEvent, handler: (data: T) => void) {
		this.subscribe(
			`${DEST_PREFIX_APP}/${DEST_PREFIX_USER}/${AuthService.username}/${event}`,
			handler
		);
	}

	private subscribe<T>(endpoint: string, handler: (data: T) => void) {
		if (!this.connected) {
			throw new Error(
				"Unable to subscribe to socket event due to the client currently not connected"
			);
		}
		this.stompClient.subscribe(endpoint, (frame: Frame) =>
			handler(JSON.parse(frame.body) as unknown as T)
		);
	}

	private onDisconnectSuccess() {
		console.log("Socket disconnected");
	}

	private onConnectError(error: string | Frame) {
		console.error(error);
	}

	private onConnectSuccess() {
		console.log("Socket connected.");
	}
}

export default new SocketService();

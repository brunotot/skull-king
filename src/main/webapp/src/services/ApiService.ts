import axios from "axios";
import AxiosRequestService from "./AxiosRequestService";

export default abstract class ApiService {
	private uri: string;

	constructor(contextPath: string) {
		this.uri = `${import.meta.env.VITE_API_URI}${contextPath}`;
	}

	protected async get<T>(endpoint: string = "") {
		try {
			return (
				await axios.get(`${this.uri}${endpoint}`, AxiosRequestService.config)
			).data as T;
		} catch (err) {
			alert(JSON.stringify(err));
		}
	}

	protected async post<T>(endpoint: string = "", body: object = {}) {
		try {
			return (
				await axios.post(
					`${this.uri}${endpoint}`,
					body,
					AxiosRequestService.config
				)
			).data as T;
		} catch (err) {
			alert(JSON.stringify(err));
		}
	}
}

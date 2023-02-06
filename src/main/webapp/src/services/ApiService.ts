import axios from "axios";
import AxiosRequestService from "./AxiosRequestService";

const API_URI = "http://192.168.1.68:8080";

export default abstract class ApiService {
	private uri: string;

	constructor(contextPath: string) {
		this.uri = `${API_URI}${contextPath}`;
	}

	protected async get<T>(endpoint: string = "") {
		return (
			await axios.get(`${this.uri}${endpoint}`, AxiosRequestService.config)
		).data as T;
	}

	protected async post<T>(endpoint: string = "", body: object = {}) {
		return (
			await axios.post(
				`${this.uri}${endpoint}`,
				body,
				AxiosRequestService.config
			)
		).data as T;
	}
}

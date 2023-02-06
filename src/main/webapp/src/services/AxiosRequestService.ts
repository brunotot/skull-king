import { AxiosRequestConfig } from "axios";
import { UserDto } from "../dto/UserDto";
import LocalStorageService, { LocalStorageKey } from "./LocalStorageService";

class AxiosRequestService {
	get config(): AxiosRequestConfig {
		return {
			headers: { ...this.headers },
		};
	}

	get headers() {
		const auth = LocalStorageService.get<UserDto>(LocalStorageKey.AUTH);
		return auth
			? {
					Authorization: `Bearer ${auth.token}`,
			  }
			: {};
	}
}

export default new AxiosRequestService();

import ApiService from "./ApiService";
import { UserDto } from "../dto/UserDto";
import { LoginDto } from "../dto/LoginDto";
import LocalStorageService, { LocalStorageKey } from "./LocalStorageService";
import { RegisterDto } from "../dto/RegisterDto";

class AuthService extends ApiService {
	constructor() {
		super("/auth");
	}

	get authenticated(): boolean {
		return LocalStorageService.exists(LocalStorageKey.AUTH);
	}

	get id() {
		return this.user!.id;
	}

	get username() {
		return this.user!.username;
	}

	get token() {
		return this.user!.token;
	}

	get user(): UserDto | undefined {
		return LocalStorageService.get<UserDto>(LocalStorageKey.AUTH);
	}

	async login(loginDto: LoginDto) {
		const userDto = await this.post<UserDto>("/login", loginDto);
		LocalStorageService.set(LocalStorageKey.AUTH, userDto);
		return userDto;
	}

	async register(loginDto: RegisterDto) {
		return await this.post<UserDto>("/register", loginDto);
	}

	logout() {
		LocalStorageService.remove(LocalStorageKey.AUTH);
	}
}

export default new AuthService();

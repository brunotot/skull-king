import { RoomDisplayDto } from "../dto/RoomDisplayDto";
import ApiService from "./ApiService";

class RoomService extends ApiService {
	constructor() {
		super("/room");
	}

	async getAll() {
		return await this.get<RoomDisplayDto[]>() as RoomDisplayDto[];
	}

	async create() {
		return await this.post<RoomDisplayDto>() as RoomDisplayDto;
	}

	async enter(roomId: string) {
		return await this.post<RoomDisplayDto>(`/${roomId}`);
	}

	async leave(roomId: string) {
		await this.post<void>(`/${roomId}/leave`);
	}

	async findById(roomId: string) {
		return await this.get<RoomDisplayDto | undefined>(`/${roomId}`);
	}
}

export default new RoomService();

export const LocalStorageKey = {
	AUTH: "auth",
};

class LocalStorageService {
	get<T>(key: string): T | undefined {
		const value = localStorage.getItem(key);
		if (value == null || value === "null" || value === "undefined") {
			return undefined;
		}
		try {
			return JSON.parse(value) as T;
		} catch (error) {
			console.error("Unable to parse value as JSON", error);
			return undefined;
		}
	}

	set(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	clear() {
		localStorage.clear();
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}

	exists(key: string) {
		return this.get(key) !== undefined;
	}
}

export default new LocalStorageService();

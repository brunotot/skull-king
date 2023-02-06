import { createContext, useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SocketService from "./services/SocketService";
import AuthService from "./services/AuthService";
import { UserDto } from "./dto/UserDto";
import Content from "./components/layout/Content";

export const UserContext = createContext<IUserContext>({} as any);

export type IUserContext = {
	auth: UserDto | undefined;
	setAuth: (auth: UserDto | undefined) => void;
	logout: () => void;
};

function App() {
	const [initialRenderFinish, setInitialRenderFinish] = useState(false);
	const [auth, setAuth] = useState<UserDto | undefined>(undefined);
	const userContext: IUserContext = {
		auth,
		setAuth,
		logout: () => {
			AuthService.logout();
			setAuth(undefined);
		},
	};

	useEffect(() => {
		const initialSocketConnect = async () => {
			const localStorageAuth = AuthService.user;
			if (localStorageAuth) {
				await SocketService.connect();
				setAuth(localStorageAuth);
			}
			setInitialRenderFinish(true);
		};
		initialSocketConnect();
	}, []);

	if (!initialRenderFinish) {
		/* return <Loader />; */
		return <></>;
	}

	return (
		<UserContext.Provider value={userContext}>
			<Router>
				<Header />
				<Content />
				<Footer />
			</Router>
		</UserContext.Provider>
	);
}

export default App;

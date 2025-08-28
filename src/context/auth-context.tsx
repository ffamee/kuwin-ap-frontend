"use client";

import fetcher from "@/lib/fetcher";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface Auth {
	username: string;
	role?: string;
}

interface AuthContextType {
	isLogin: boolean;
	user: Auth | null;
	// loading: boolean;
	// refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	isLogin: false,
	user: null,
	// loading: true,
	// refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<Auth | null>(null);
	const [isLogin, setIsLogin] = useState(false);
	// const [loading, setLoading] = useState(true);

	// Fetch user data from backend
	const fetchUser = async () => {
		try {
			const res = await fetcher("/users/profile", {
				credentials: "include",
			});

			if (res.ok) {
				const data = await res.json();
				setUser({ username: data.username, role: data.role });
				setIsLogin(true);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Error fetching user:", error);
			setUser(null);
		} finally {
			// setLoading(false);
			console.log("Get profile done!");
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, isLogin }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}

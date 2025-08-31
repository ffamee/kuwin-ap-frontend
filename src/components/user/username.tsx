"use client";

import { useAuth } from "@/context/auth-context";

const Username = () => {
	const { user } = useAuth();
	return <>{user?.username || "Guest"}</>;
};

export default Username;

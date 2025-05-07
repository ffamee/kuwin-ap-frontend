export function useLogout() {
	return async () => {
		await fetch("http://localhost:3001/auth/logout", {
			credentials: "include",
		});

		window.location.href = "/pro";
	};
}

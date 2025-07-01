export function useLogout() {
  return async () => {
    await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
      credentials: "include",
    });

    window.location.href = "/monitor";
  };
}

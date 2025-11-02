const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function registerUser(username: string, email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to register");
    return data;
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to login");
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

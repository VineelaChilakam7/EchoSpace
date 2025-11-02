import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ChatLayout } from "./pages/ChatLayout";
import { Toaster } from "sonner";

export default function App() {
  // Keep track of the logged-in user
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
    avatar?: string;
  } | null>(null);

  return (
    <>
      <Routes>
        {/* Landing page (login/register) */}
        <Route
          path="/"
          element={<LandingPage onLoginSuccess={setUser} />}
        />

        {/* Chat page — protected route */}
        <Route
          path="/chat"
          element={user ? <ChatLayout user={user} onLogout={() => setUser(null)} /> : <Navigate to="/" />}
        />

        {/* Catch-all: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster />
    </>
  );
}

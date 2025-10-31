import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { MessageCircle, Users, Zap, Shield, Mail, Lock, User } from "lucide-react";

interface LandingPageProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (username: string, email: string, password: string) => void;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  // State to control which view to show
  const [view, setView] = useState<"home" | "auth">("home");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }

    onRegister(registerUsername, registerEmail, registerPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView("home")}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">EchoSpace</span>
          </div>
          <div className="flex items-center gap-3">
            {view === "home" && (
              <>
                <button 
                  onClick={() => {
                    const featuresEl = document.getElementById("features");
                    featuresEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium hidden md:block"
                >
                  Features
                </button>
                <button 
                  onClick={() => setView("auth")}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium hidden md:block"
                >
                  Sign In
                </button>
              </>
            )}
            {view === "auth" && (
              <button 
                onClick={() => setView("home")}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium"
              >
                Back to Home
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Conditional Content */}
      {view === "home" ? (
        <>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  Real-time messaging made simple
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 mb-6">
                  Connect Instantly with Friends via Chat Rooms
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Create or join chat rooms with simple codes. No complicated setups, 
                  no hassle. Just instant, secure messaging with the people you care about.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto"
                    onClick={() => setView("auth")}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      const featuresEl = document.getElementById("features");
                      featuresEl?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1753102542049-42c67a9406f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwYnViYmxlcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjE0NzY3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Chat illustration"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="bg-white dark:bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-4">
                  Why Choose EchoSpace?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Simple, fast, and secure messaging for teams and friends
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">Instant Access</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create or join rooms with simple 6-digit codes. No complex invitations needed.
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">Team Collaboration</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    See who's online, manage participants, and collaborate in real-time.
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">Secure & Private</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your conversations are protected with end-to-end encryption.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Authentication Section - Shown when view is "auth" */
        <section className="py-20 min-h-[calc(100vh-180px)] flex items-center">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
              {/* Logo and Title */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">Welcome to EchoSpace</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Sign in or create an account to get started
                </p>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Create Account</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="demo@echospace.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="password123"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Login
                    </Button>

                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3 mt-4">
                      <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">Demo Credentials:</p>
                      <p className="text-blue-700 dark:text-blue-400 text-xs">
                        Email: <span className="font-mono">demo@echospace.com</span>
                      </p>
                      <p className="text-blue-700 dark:text-blue-400 text-xs">
                        Password: <span className="font-mono">password123</span>
                      </p>
                    </div>
                  </form>

                  <div className="flex items-center gap-4 my-6">
                    <Separator className="flex-1" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
                    <Separator className="flex-1" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert("Google authentication would be integrated here")}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="register-username"
                          type="text"
                          placeholder="Choose a username"
                          value={registerUsername}
                          onChange={(e) => setRegisterUsername(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {registerError && (
                      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                        <p className="text-red-600 dark:text-red-400 text-sm">{registerError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                © 2025 EchoSpace. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

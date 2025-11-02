import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MessageCircle, Users, Zap, Shield } from "lucide-react";
import { LoginForm } from "./auth/LoginForm";
import { RegisterForm } from "./auth/RegisterForm";

interface LandingPageProps {
  onLoginSuccess: (user: any) => void;
}

export function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [view, setView] = useState<"home" | "auth">("home");

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
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              EchoSpace
            </span>
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
                  src="https://images.unsplash.com/photo-1753102542049-42c67a9406f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
                <FeatureCard
                  icon={<Zap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
                  title="Instant Access"
                  description="Create or join rooms with simple 6-digit codes. No complex invitations needed."
                />
                <FeatureCard
                  icon={<Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
                  title="Team Collaboration"
                  description="See who's online, manage participants, and collaborate in real-time."
                />
                <FeatureCard
                  icon={<Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />}
                  title="Secure & Private"
                  description="Your conversations are protected with end-to-end encryption."
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Authentication Section */
        <section className="py-20 min-h-[calc(100vh-180px)] flex items-center">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">
                  Welcome to EchoSpace
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Sign in or create an account to get started
                </p>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <LoginForm onLoginSuccess={onLoginSuccess} />
                </TabsContent>

                <TabsContent value="register">
                  <RegisterForm />
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

/* Feature card component */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

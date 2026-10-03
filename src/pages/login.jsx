import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(userName, password);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden min-h-[620px] overflow-hidden bg-secondary p-12 text-secondary-foreground lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />

            <div className="relative">
              <div className="mb-16 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground">
                  M
                </div>
                <span className="text-xl font-bold tracking-tight">My Dashboard</span>
              </div>
              <p className="mb-5 max-w-md text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Welcome back
              </p>
              <h2 className="max-w-lg text-5xl font-bold leading-[1.05] tracking-tight">
                Your work, clearly in view.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-secondary-foreground/70">
                Sign in to manage your clients, follow progress, and keep your
                team moving forward.
              </p>
            </div>

            <div className="relative flex items-center gap-3 text-sm text-secondary-foreground/70">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              Secure session-based access
            </div>
          </div>

          <div className="flex min-h-[620px] items-center justify-center p-8 sm:p-14">
            <div className="w-full max-w-md">
              <div className="mb-10 lg:hidden">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground">
                    M
                  </div>
                  <span className="text-xl font-bold tracking-tight">My Dashboard</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-foreground">
                  Account access
                </p>
                <h1 className="text-4xl font-bold tracking-tight">Sign in</h1>
                <p className="mt-3 text-muted-foreground">
                  Enter your details to continue to your dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="user-name" className="mb-2 block text-sm font-semibold">
                    Username
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    autoComplete="username"
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20"
                    required
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in to dashboard"
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-xs text-muted-foreground">
                Your connection is protected with a secure session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/shared/components";

export default function HomePage() {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  if (isAuthenticated || token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen w-screen bg-background flex flex-col overflow-x-hidden relative font-bodyFont antialiased">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-grid-pattern" />

      <nav className="sticky top-0 z-20 w-full bg-white/70 backdrop-blur-lg border-b border-border-default shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary rounded-sm" />
              <div className="absolute -inset-1 bg-primary/20 blur-md rounded-sm" />
            </div>
            <span className="font-themeFont font-semibold text-base sm:text-lg tracking-[-0.01em] text-primary">
              TaskVault
            </span>
          </div>

          <Link
            to="/login"
            className="relative text-xs sm:text-sm font-semibold text-primary transition-colors duration-150 after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <section className="flex-1 flex items-center justify-center relative z-10 w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="flex flex-col items-start text-left space-y-6 sm:space-y-8">
            <h1 className="font-themeFont font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05] tracking-[-0.025em]">
              Organize your work.
              <br />
              Clear your mind.
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-md leading-relaxed">
              TaskVault helps you plan, track, and finish what matters without
              noise, clutter, or friction.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                <Link to="/signup" className="block">
                  Get started free
                </Link>
              </Button>

              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                <Link to="/login" className="block">
                  Sign in
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-border-default bg-white shadow-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium text-primary">
                  Today
                </span>
                <span className="text-xs text-muted">3 tasks</span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-border-default">
                  <div className="w-2 h-2 rounded-full bg-accent flex-none" />
                  <span className="text-xs sm:text-sm text-primary break-words">
                    Design landing page
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-border-default">
                  <div className="w-2 h-2 rounded-full bg-secondary flex-none" />
                  <span className="text-xs sm:text-sm text-primary break-words">
                    Fix authentication flow
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-border-default">
                  <div className="w-2 h-2 rounded-full bg-primary flex-none" />
                  <span className="text-xs sm:text-sm text-primary break-words">
                    Deploy production build
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-primary/10 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      <footer className="flex-none w-full border-t border-border-default relative z-10 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                title: "Easy to use",
                desc: "Minimalist interface for focus",
                color: "bg-primary",
              },
              {
                title: "Stay organized",
                desc: "Smart categorization & tags",
                color: "bg-secondary",
              },
              {
                title: "Secure & private",
                desc: "Enterprise-grade encryption",
                color: "bg-accent",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${item.color} flex-none mt-1`}
                />
                <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                  <span className="font-medium text-xs sm:text-sm text-primary">
                    {item.title}
                  </span>
                  <span className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

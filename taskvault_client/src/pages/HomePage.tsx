import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/shared/components";

export default function HomePage() {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  if (isAuthenticated || token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="h-screen w-screen bg-background flex flex-col overflow-hidden relative font-bodyFont antialiased">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-grid-pattern" />

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-6xl bg-white/70 backdrop-blur-lg border border-border-default rounded-2xl shadow-sm">
        <div className="px-6 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
              <div className="absolute -inset-1 bg-primary/20 blur-md rounded-sm" />
            </div>
            <span className="font-themeFont font-semibold text-[18px] tracking-[-0.01em] text-primary">
              TaskVault
            </span>
          </div>

          <Link
            to="/login"
            className="relative text-[15px] font-semibold text-primary transition-colors duration-150 after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <section className="flex-1 flex items-center justify-center relative z-10 w-full px-6 pt-28 pb-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col items-start text-left space-y-8">
            <h1 className="font-themeFont font-semibold text-[42px] sm:text-[52px] md:text-[58px] text-primary leading-[1.05] tracking-[-0.025em]">
              Organize your work.
              <br />
              Clear your mind.
            </h1>

            <p className="text-[16px] text-muted max-w-md leading-relaxed">
              TaskVault helps you plan, track, and finish what matters without
              noise, clutter, or friction.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Link to="/signup" className="block">
                  Get started free
                </Link>
              </Button>

              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                <Link to="/login" className="block">
                  Sign in
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-border-default bg-white shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] font-medium text-primary">
                  Today
                </span>
                <span className="text-[12px] text-muted">3 tasks</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border-default">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-[13px] text-primary">
                    Design landing page
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border-default">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-[13px] text-primary">
                    Fix authentication flow
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border-default">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[13px] text-primary">
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
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
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
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${item.color} flex-none mt-1.5`}
                />
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[13px] text-primary">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-muted leading-relaxed">
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

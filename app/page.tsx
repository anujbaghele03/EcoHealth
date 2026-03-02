"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Cloud, Eye, EyeOff, Leaf } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-[920px] overflow-hidden rounded-2xl bg-card shadow-xl">
        {/* Left branding panel */}
        <div className="hidden flex-col justify-between bg-[#1a1d3e] p-10 text-[#ffffff] md:flex md:w-[420px]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4a6cf7]">
                <Leaf className="h-5 w-5 text-[#ffffff]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#ffffff]">EcoHealth</span>
            </div>
            <h2 className="mt-12 text-3xl font-bold leading-tight text-balance text-[#ffffff]">
              Your personal weather companion
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#94a3b8]">
              Get real-time weather updates, detailed forecasts, and personalized insights for any location around the world.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Cloud className="h-16 w-16 text-[#4a6cf7] opacity-60" />
            <div>
              <p className="text-4xl font-light text-[#ffffff]">{"20\u00b0C"}</p>
              <p className="text-xs text-[#94a3b8]">Dramatic Cloudy</p>
            </div>
          </div>
        </div>

        {/* Right login form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 md:w-[500px] md:px-14">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4a6cf7]">
              <Leaf className="h-4 w-4 text-[#ffffff]" />
            </div>
            <span className="text-lg font-bold text-foreground">EcoHealth</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your weather dashboard
          </p>

          <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-xl border border-border bg-secondary px-4 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-[#4a6cf7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7]/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-border bg-secondary px-4 pr-11 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-[#4a6cf7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#4a6cf7] text-sm font-semibold text-[#ffffff] shadow-lg shadow-[#4a6cf7]/25 transition-all hover:bg-[#3b5de8] disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#ffffff] border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo: enter any email and password to continue
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Map,
  Calendar,
  Users,
  Info,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react"

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Map", href: "/dashboard/map", icon: Map },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Community", href: "/dashboard/community", icon: Users },
  { label: "About", href: "/dashboard/about", icon: Info },
]

const systemNav = [
  { label: "Setting", href: "/dashboard/setting", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <aside className="flex h-screen w-[220px] flex-shrink-0 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4a6cf7]">
          <Leaf className="h-4 w-4 text-[#ffffff]" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">EcoHealth</span>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col px-3 pt-4">
        <ul className="flex flex-col gap-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#eef0ff] text-[#4a6cf7]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* System section */}
        <div className="mt-auto pb-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System
          </p>
          <ul className="flex flex-col gap-1">
            {systemNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#eef0ff] text-[#4a6cf7]"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-[18px] w-[18px]" />
                Logout account
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}

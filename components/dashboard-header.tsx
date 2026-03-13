"use client"

import { Search, Bell, User } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function DashboardHeader() {
  const now = new Date()
  const month = now.toLocaleString("en-US", { month: "long" })
  const year = now.getFullYear()
  const dayName = now.toLocaleString("en-US", { weekday: "long" })
  const day = now.getDate()
  const monthShort = now.toLocaleString("en-US", { month: "short" })

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      toast.success("Searching for: " + searchQuery)
    }
  }

  return (
    <header className="flex items-center justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {month} {year}
        </h1>
        <p className="text-sm text-muted-foreground">
          {dayName}, {monthShort} {day}, {year}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search location here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="h-10 w-[220px] rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-[#4a6cf7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7]/20"
          />
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
          onClick={() => toast.info("No new notifications")}
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Profile"
          onClick={() => toast.info("Profile settings coming soon")}
        >
          <User className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  )
}

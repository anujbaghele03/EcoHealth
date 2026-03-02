"use client"

import { Cloud, Sunrise, Sunset } from "lucide-react"
import { useEffect, useState } from "react"

const rainData = [
  { time: "7 PM", chance: 44 },
  { time: "8 PM", chance: 30 },
  { time: "9 PM", chance: 67 },
  { time: "10 PM", chance: 72 },
]

export default function WeatherPanel() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
    }
    update()
    const interval = setInterval(update, 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="flex h-screen w-[300px] flex-shrink-0 flex-col overflow-y-auto scrollbar-none bg-[#1a1d3e] px-6 py-7 text-[#ffffff]">
      {/* Location & Time */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#ffffff]">Suyog Nagar</h3>
          <p className="text-xs text-[#94a3b8]">Nagpur, Maharashtra</p>
        </div>
        <span className="text-sm font-medium text-[#94a3b8]">{time}</span>
      </div>

      {/* Current Weather */}
      <div className="mt-8 flex flex-col items-center">
        <Cloud className="h-14 w-14 text-[#94a3b8]" />
        <div className="mt-4 flex items-start gap-2">
          <span className="text-6xl font-extralight tracking-tighter text-[#ffffff]">{"20\u00b0"}</span>
          <span className="mt-2 text-2xl font-light text-[#ffffff]">C</span>
        </div>
        <p className="mt-1 text-sm font-medium text-[#94a3b8]">Dramatic Cloudy</p>
      </div>

      {/* Chance of Rain */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-[#ffffff]">Chance of rain</h4>
        <div className="mt-4 flex flex-col gap-3.5">
          {rainData.map((item) => (
            <div key={item.time} className="flex items-center gap-3">
              <span className="w-12 flex-shrink-0 text-xs text-[#94a3b8]">
                {item.time}
              </span>
              <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[#2a2d5e]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#4a6cf7] transition-all"
                  style={{ width: `${item.chance}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs font-medium text-[#94a3b8]">
                {item.chance}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sunrise & Sunset */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#ffffff]">{"Sunrise & Sunset"}</h4>
          <div className="flex cursor-pointer items-center gap-1 text-xs text-[#94a3b8]">
            Nagpur
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {/* Sunrise Card */}
          <div className="rounded-xl bg-[#232650] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunrise className="h-5 w-5 text-[#facc15]" />
                <div>
                  <p className="text-xs text-[#94a3b8]">Sunrise</p>
                  <p className="text-lg font-bold text-[#ffffff]">4:20 AM</p>
                </div>
              </div>
              <span className="text-xs text-[#94a3b8]">4 hours ago</span>
            </div>
          </div>

          {/* Sunset Card */}
          <div className="rounded-xl bg-[#232650] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunset className="h-5 w-5 text-[#f97316]" />
                <div>
                  <p className="text-xs text-[#94a3b8]">Sunset</p>
                  <p className="text-lg font-bold text-[#ffffff]">5:50 PM</p>
                </div>
              </div>
              <span className="text-xs text-[#94a3b8]">in 9 hours</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

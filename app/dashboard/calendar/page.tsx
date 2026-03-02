"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Sun,
  Cloud,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  CalendarDays,
} from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

interface WeatherDay {
  day: number
  temp: number
  icon: React.ElementType
  condition: string
  rain: number
}

function generateWeather(year: number, month: number): Map<number, WeatherDay> {
  const map = new Map<number, WeatherDay>()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const icons = [Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind]
  const conditions = ["Sunny", "Cloudy", "Rainy", "Stormy", "Snowy", "Windy"]

  for (let d = 1; d <= daysInMonth; d++) {
    const seed = (d * 7 + month * 13 + year) % 6
    map.set(d, {
      day: d,
      temp: 15 + ((d * 3 + month * 5) % 18),
      icon: icons[seed],
      condition: conditions[seed],
      rain: (d * 11 + month * 7) % 100,
    })
  }
  return map
}

const upcomingEvents = [
  { date: "Mar 5", label: "Heavy Rain Expected", color: "bg-[#4a6cf7]", icon: CloudRain },
  { date: "Mar 8", label: "Clear Skies Forecast", color: "bg-[#10b981]", icon: Sun },
  { date: "Mar 12", label: "Wind Advisory", color: "bg-[#f59e0b]", icon: Wind },
  { date: "Mar 18", label: "Temperature Drop", color: "bg-[#ef4444]", icon: Thermometer },
  { date: "Mar 24", label: "Sunny Weekend", color: "bg-[#10b981]", icon: Sun },
]

const weeklyForecast = [
  { day: "Mon", high: 24, low: 16, icon: Sun, condition: "Sunny" },
  { day: "Tue", high: 22, low: 15, icon: Cloud, condition: "Cloudy" },
  { day: "Wed", high: 19, low: 13, icon: CloudRain, condition: "Rainy" },
  { day: "Thu", high: 21, low: 14, icon: Cloud, condition: "Cloudy" },
  { day: "Fri", high: 25, low: 17, icon: Sun, condition: "Sunny" },
  { day: "Sat", high: 23, low: 16, icon: Sun, condition: "Sunny" },
  { day: "Sun", high: 20, low: 14, icon: CloudRain, condition: "Rainy" },
]

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())

  const weatherData = generateWeather(currentYear, currentMonth)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
    setSelectedDay(null)
  }

  const selectedWeather = selectedDay ? weatherData.get(selectedDay) : null

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()

  return (
    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-none pb-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Calendar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track weather patterns and plan your activities around forecasts.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Calendar grid */}
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {/* Month navigation */}
            <div className="flex items-center justify-between pb-5">
              <h2 className="text-lg font-bold text-foreground">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 pb-2">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-semibold text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const weather = weatherData.get(day)
                const WeatherIcon = weather?.icon || Sun
                const selected = selectedDay === day

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`group flex flex-col items-center gap-0.5 rounded-xl p-1.5 transition-all ${
                      selected
                        ? "bg-[#4a6cf7] text-[#ffffff] shadow-md"
                        : isToday(day)
                          ? "bg-[#eef0ff] text-[#4a6cf7]"
                          : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        selected ? "text-[#ffffff]" : ""
                      }`}
                    >
                      {day}
                    </span>
                    <WeatherIcon
                      className={`h-3.5 w-3.5 ${
                        selected
                          ? "text-[#ffffff]/80"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium ${
                        selected ? "text-[#ffffff]/80" : "text-muted-foreground"
                      }`}
                    >
                      {weather?.temp}°
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 7-day forecast strip */}
          <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="pb-4 text-sm font-bold text-foreground">7-Day Forecast</h3>
            <div className="grid grid-cols-7 gap-3">
              {weeklyForecast.map((day) => (
                <div
                  key={day.day}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 transition-shadow hover:shadow-sm"
                >
                  <span className="text-xs font-semibold text-foreground">{day.day}</span>
                  <day.icon className="h-5 w-5 text-[#4a6cf7]" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-foreground">{day.high}°</span>
                    <span className="text-[10px] text-muted-foreground">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-[240px] flex-shrink-0">
          <div className="flex flex-col gap-5">
            {/* Selected day detail */}
            {selectedWeather ? (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 pb-4">
                  <CalendarDays className="h-4 w-4 text-[#4a6cf7]" />
                  <h3 className="text-sm font-bold text-foreground">
                    {MONTHS[currentMonth]} {selectedWeather.day}
                  </h3>
                </div>

                <div className="flex flex-col items-center gap-3 rounded-xl bg-[#eef0ff] py-5">
                  <selectedWeather.icon className="h-10 w-10 text-[#4a6cf7]" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {selectedWeather.temp}°C
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {selectedWeather.condition}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Droplets className="h-3.5 w-3.5" />
                      Rain Chance
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {selectedWeather.rain}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary">
                    <div
                      className="h-1.5 rounded-full bg-[#4a6cf7] transition-all"
                      style={{ width: `${selectedWeather.rain}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Wind className="h-3.5 w-3.5" />
                      Wind Speed
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {8 + ((selectedWeather.day * 3) % 15)} km/h
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Thermometer className="h-3.5 w-3.5" />
                      Feels Like
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {selectedWeather.temp - 2}°C
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
                <p className="text-center text-xs text-muted-foreground">
                  Select a day to view weather details
                </p>
              </div>
            )}

            {/* Upcoming events */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="pb-4 text-sm font-bold text-foreground">Weather Events</h3>
              <div className="flex flex-col gap-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.label}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${event.color} text-[#ffffff]`}
                    >
                      <event.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {event.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="rounded-2xl border border-border bg-[#eef0ff] p-5">
              <h3 className="text-sm font-bold text-[#4a6cf7]">Weather Icons</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { icon: Sun, label: "Sunny" },
                  { icon: Cloud, label: "Cloudy" },
                  { icon: CloudRain, label: "Rainy" },
                  { icon: CloudLightning, label: "Stormy" },
                  { icon: CloudSnow, label: "Snowy" },
                  { icon: Wind, label: "Windy" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="h-3.5 w-3.5 text-[#4a6cf7]" />
                    <span className="text-[10px] font-medium text-[#4a6cf7]/80">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

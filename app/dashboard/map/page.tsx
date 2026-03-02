"use client"

import { useState } from "react"
import {
  MapPin,
  Search,
  CloudRain,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Navigation,
  Plus,
  Star,
  ChevronDown,
  Layers,
} from "lucide-react"

interface Location {
  id: number
  name: string
  country: string
  lat: string
  lng: string
  temp: number
  condition: string
  icon: React.ElementType
  wind: number
  humidity: number
  pressure: number
  visibility: number
  feelsLike: number
  uvIndex: number
  saved: boolean
}

const locations: Location[] = [
  {
    id: 1,
    name: "Nagpur",
    country: "Maharashtra",
    lat: "6.87°S",
    lng: "109.14°E",
    temp: 20,
    condition: "Dramatic Cloudy",
    icon: Cloud,
    wind: 12,
    humidity: 78,
    pressure: 720,
    visibility: 10,
    feelsLike: 18,
    uvIndex: 2.3,
    saved: true,
  },
  {
    id: 2,
    name: "Gondia",
    country: "Maharashtra",
    lat: "6.20°S",
    lng: "106.84°E",
    temp: 31,
    condition: "Heavy Rain",
    icon: CloudRain,
    wind: 18,
    humidity: 92,
    pressure: 1008,
    visibility: 5,
    feelsLike: 34,
    uvIndex: 1.5,
    saved: true,
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    lat: "35.68°N",
    lng: "139.69°E",
    temp: 14,
    condition: "Clear Sky",
    icon: Sun,
    wind: 8,
    humidity: 45,
    pressure: 1020,
    visibility: 16,
    feelsLike: 12,
    uvIndex: 5.1,
    saved: false,
  },
  {
    id: 4,
    name: "Seoul",
    country: "South Korea",
    lat: "37.56°N",
    lng: "126.97°E",
    temp: 7,
    condition: "Windy",
    icon: Wind,
    wind: 35,
    humidity: 38,
    pressure: 1015,
    visibility: 14,
    feelsLike: 2,
    uvIndex: 3.8,
    saved: false,
  },
  {
    id: 5,
    name: "Mumbai",
    country: "India",
    lat: "19.07°N",
    lng: "72.87°E",
    temp: 33,
    condition: "Sunny",
    icon: Sun,
    wind: 14,
    humidity: 65,
    pressure: 1010,
    visibility: 12,
    feelsLike: 36,
    uvIndex: 8.2,
    saved: true,
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    lat: "33.86°S",
    lng: "151.20°E",
    temp: 22,
    condition: "Partly Cloudy",
    icon: Cloud,
    wind: 20,
    humidity: 55,
    pressure: 1018,
    visibility: 11,
    feelsLike: 21,
    uvIndex: 6.0,
    saved: false,
  },
]

const mapLayers = [
  { label: "Temperature", active: true },
  { label: "Precipitation", active: false },
  { label: "Wind", active: false },
  { label: "Clouds", active: false },
]

export default function MapPage() {
  const [allLocations, setAllLocations] = useState(locations)
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeLayer, setActiveLayer] = useState("Temperature")

  const filteredLocations = allLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function toggleSave(id: number) {
    setAllLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, saved: !loc.saved } : loc))
    )
    if (selectedLocation.id === id) {
      setSelectedLocation((prev) => ({ ...prev, saved: !prev.saved }))
    }
  }

  function getConditionColor(condition: string) {
    if (condition.includes("Rain")) return "bg-[#4a6cf7]"
    if (condition.includes("Sunny") || condition.includes("Clear")) return "bg-[#10b981]"
    if (condition.includes("Wind")) return "bg-[#f59e0b]"
    return "bg-[#6b7280]"
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-none pb-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Map</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore weather conditions across different locations worldwide.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{activeLayer}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Map area */}
        <div className="flex flex-1 flex-col gap-5 min-w-0">
          {/* Map view */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Simulated map background */}
            <div className="relative h-[400px] bg-gradient-to-br from-[#e8ecf4] via-[#dfe4ef] to-[#d5dbe8]">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 border-t border-[#4a6cf7]/30"
                    style={{ top: `${(i + 1) * 12.5}%` }}
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 border-l border-[#4a6cf7]/30"
                    style={{ left: `${(i + 1) * 12.5}%` }}
                  />
                ))}
              </div>

              {/* Location markers */}
              {allLocations.map((loc, index) => {
                const positions = [
                  { top: "45%", left: "48%" },
                  { top: "42%", left: "40%" },
                  { top: "28%", left: "72%" },
                  { top: "25%", left: "65%" },
                  { top: "38%", left: "30%" },
                  { top: "60%", left: "78%" },
                ]
                const pos = positions[index] || { top: "50%", left: "50%" }
                const isSelected = selectedLocation.id === loc.id

                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`group absolute flex flex-col items-center transition-transform ${
                      isSelected ? "z-20 scale-110" : "z-10 hover:scale-105"
                    }`}
                    style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -100%)" }}
                    aria-label={`Select ${loc.name}`}
                  >
                    <div
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[#ffffff] shadow-lg transition-all ${
                        isSelected ? "bg-[#4a6cf7]" : "bg-[#1a1d3e] group-hover:bg-[#4a6cf7]"
                      }`}
                    >
                      <loc.icon className="h-3.5 w-3.5" />
                      <span className="text-xs font-bold">{loc.temp}°</span>
                    </div>
                    <div
                      className={`h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent ${
                        isSelected ? "border-t-[#4a6cf7]" : "border-t-[#1a1d3e] group-hover:border-t-[#4a6cf7]"
                      }`}
                    />
                    <span
                      className={`mt-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                        isSelected
                          ? "bg-[#4a6cf7]/10 text-[#4a6cf7]"
                          : "bg-[#1a1d2e]/10 text-[#1a1d2e]"
                      }`}
                    >
                      {loc.name}
                    </span>
                  </button>
                )
              })}

              {/* Compass */}
              <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 shadow-md">
                <Navigation className="h-4 w-4 text-[#4a6cf7]" />
              </div>

              {/* Map layer buttons */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {mapLayers.map((layer) => (
                  <button
                    key={layer.label}
                    type="button"
                    onClick={() => setActiveLayer(layer.label)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold shadow-sm transition-colors ${
                      activeLayer === layer.label
                        ? "bg-[#4a6cf7] text-[#ffffff]"
                        : "bg-card/90 text-foreground hover:bg-card"
                    }`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected location detail */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-[#ffffff] ${getConditionColor(
                    selectedLocation.condition
                  )}`}
                >
                  <selectedLocation.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {selectedLocation.name}, {selectedLocation.country}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedLocation.lat} / {selectedLocation.lng}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{selectedLocation.temp}°C</p>
                  <p className="text-xs text-muted-foreground">{selectedLocation.condition}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSave(selectedLocation.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    selectedLocation.saved
                      ? "bg-[#fef9ee] text-[#f59e0b]"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={selectedLocation.saved ? "Unsave location" : "Save location"}
                >
                  <Star
                    className={`h-4 w-4 ${selectedLocation.saved ? "fill-[#f59e0b]" : ""}`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3">
              {[
                { icon: Wind, label: "Wind", value: `${selectedLocation.wind} km/h` },
                { icon: Droplets, label: "Humidity", value: `${selectedLocation.humidity}%` },
                { icon: Gauge, label: "Pressure", value: `${selectedLocation.pressure} hpa` },
                { icon: Eye, label: "Visibility", value: `${selectedLocation.visibility} km` },
                { icon: Thermometer, label: "Feels Like", value: `${selectedLocation.feelsLike}°C` },
                { icon: Sun, label: "UV Index", value: `${selectedLocation.uvIndex}` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 transition-shadow hover:shadow-sm"
                >
                  <stat.icon className="h-4 w-4 text-[#4a6cf7]" />
                  <span className="text-xs font-bold text-foreground">{stat.value}</span>
                  <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar - Locations */}
        <aside className="w-[250px] flex-shrink-0">
          <div className="flex flex-col gap-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations..."
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#4a6cf7] focus:outline-none focus:ring-1 focus:ring-[#4a6cf7]"
              />
            </div>

            {/* Location list */}
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-sm font-bold text-foreground">Locations</h3>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eef0ff] text-[#4a6cf7] transition-colors hover:bg-[#4a6cf7] hover:text-[#ffffff]"
                  aria-label="Add location"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors ${
                        isSelected ? "bg-[#eef0ff]" : "hover:bg-secondary"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[#ffffff] ${getConditionColor(
                          loc.condition
                        )}`}
                      >
                        <loc.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p
                            className={`text-xs font-semibold truncate ${
                              isSelected ? "text-[#4a6cf7]" : "text-foreground"
                            }`}
                          >
                            {loc.name}
                          </p>
                          {loc.saved && (
                            <Star className="h-3 w-3 flex-shrink-0 fill-[#f59e0b] text-[#f59e0b]" />
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground">{loc.country}</p>
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          isSelected ? "text-[#4a6cf7]" : "text-foreground"
                        }`}
                      >
                        {loc.temp}°
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Saved locations */}
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 pb-3 text-sm font-bold text-foreground">
                <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                Saved
              </h3>
              <div className="flex flex-col gap-2">
                {allLocations
                  .filter((loc) => loc.saved)
                  .map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className="flex items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-secondary"
                    >
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#4a6cf7]" />
                      <span className="flex-1 text-xs font-medium text-foreground truncate">
                        {loc.name}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">{loc.temp}°</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Map info */}
            <div className="rounded-2xl border border-border bg-[#eef0ff] p-5">
              <h3 className="text-sm font-bold text-[#4a6cf7]">Map Layers</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4a6cf7]/80">
                Switch between Temperature, Precipitation, Wind, and Cloud layers to visualize different weather data across the map.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

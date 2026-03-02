"use client"

import { useState } from "react"
import {
  Settings,
  User,
  Bell,
  Palette,
  Globe,
  Shield,
  Thermometer,
  Wind,
  MapPin,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Monitor,
  Mail,
  Smartphone,
  Volume2,
  Eye,
  Lock,
  Download,
  Trash2,
  Save,
  Camera,
} from "lucide-react"

type TabId = "profile" | "notifications" | "appearance" | "units" | "location" | "privacy"

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "units", label: "Units & Data", icon: Thermometer },
  { id: "location", label: "Locations", icon: MapPin },
  { id: "privacy", label: "Privacy", icon: Shield },
]

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
        enabled ? "bg-[#4a6cf7]" : "bg-[#e5e7eb]"
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-[#ffffff] shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function RadioOption({
  selected,
  onSelect,
  icon: Icon,
  label,
  description,
}: {
  selected: boolean
  onSelect: () => void
  icon: React.ElementType
  label: string
  description: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
        selected
          ? "border-[#4a6cf7] bg-[#eef0ff] shadow-sm"
          : "border-border bg-card hover:bg-secondary"
      }`}
    >
      <div
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
          selected ? "bg-[#4a6cf7] text-[#ffffff]" : "bg-secondary text-muted-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${selected ? "text-[#4a6cf7]" : "text-foreground"}`}>
          {label}
        </p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {selected && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4a6cf7]">
          <Check className="h-3 w-3 text-[#ffffff]" />
        </div>
      )}
    </button>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-foreground">{children}</h3>
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile")

  // Profile state
  const [name, setName] = useState("Anuj Baghele")
  const [email, setEmail] = useState("anujbaghele@email.com")
  const [city, setCity] = useState("Gondia, Maharashtra")

  // Notification state
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [soundNotif, setSoundNotif] = useState(false)
  const [severeAlerts, setSevereAlerts] = useState(true)
  const [dailyForecast, setDailyForecast] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)

  // Appearance state
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light")

  // Units state
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">("celsius")
  const [windUnit, setWindUnit] = useState<"kmh" | "mph" | "ms">("kmh")
  const [pressureUnit, setPressureUnit] = useState<"hpa" | "inhg">("hpa")

  // Location state
  const [autoLocation, setAutoLocation] = useState(true)

  // Privacy state
  const [shareData, setShareData] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [visibility, setVisibility] = useState(true)

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const savedLocations = [
    { name: "Gondia, Maharashtra", temp: "25°C", primary: true },
    { name: "Nagpur, Maharashtra", temp: "28°C", primary: false },
    { name: "Tokyo, Japan", temp: "12°C", primary: false },
    { name: "London, UK", temp: "8°C", primary: false },
  ]

  return (
    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-none pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your preferences and account settings
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
            saved
              ? "bg-[#10b981] text-[#ffffff]"
              : "bg-[#4a6cf7] text-[#ffffff] hover:bg-[#3b5de7]"
          }`}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tabs sidebar */}
        <nav className="w-[220px] flex-shrink-0">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
            <div className="flex flex-col gap-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#eef0ff] text-[#4a6cf7]"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {/* Profile */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Personal Information</SectionTitle>
                <SectionDescription>Update your profile details and avatar</SectionDescription>

                {/* Avatar */}
                <div className="mt-5 flex items-center gap-5">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4a6cf7] text-lg font-bold text-[#ffffff]">
                      AB
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-secondary text-muted-foreground transition-colors hover:bg-[#4a6cf7] hover:text-[#ffffff]"
                      aria-label="Change avatar"
                    >
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">Member since Jan 2025</p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="mb-1.5 block text-xs font-medium text-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-[#4a6cf7] focus:ring-2 focus:ring-[#4a6cf7]/20"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1.5 block text-xs font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-[#4a6cf7] focus:ring-2 focus:ring-[#4a6cf7]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">
                      Default City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-[#4a6cf7] focus:ring-2 focus:ring-[#4a6cf7]/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Notification Channels</SectionTitle>
                <SectionDescription>Choose how you want to receive notifications</SectionDescription>
                <div className="mt-4 divide-y divide-border">
                  <SettingRow label="Email Notifications" description="Receive weather updates via email">
                    <Toggle enabled={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
                  </SettingRow>
                  <SettingRow label="Push Notifications" description="Get alerts on your device">
                    <Toggle enabled={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
                  </SettingRow>
                  <SettingRow label="Sound Alerts" description="Play sound for important alerts">
                    <Toggle enabled={soundNotif} onToggle={() => setSoundNotif(!soundNotif)} />
                  </SettingRow>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Alert Preferences</SectionTitle>
                <SectionDescription>Configure which weather alerts you receive</SectionDescription>
                <div className="mt-4 divide-y divide-border">
                  <SettingRow label="Severe Weather Alerts" description="Storms, floods, extreme temperatures">
                    <Toggle enabled={severeAlerts} onToggle={() => setSevereAlerts(!severeAlerts)} />
                  </SettingRow>
                  <SettingRow label="Daily Forecast" description="Morning summary of the day ahead">
                    <Toggle enabled={dailyForecast} onToggle={() => setDailyForecast(!dailyForecast)} />
                  </SettingRow>
                  <SettingRow label="Weekly Report" description="Weekly weather trends and summary">
                    <Toggle enabled={weeklyReport} onToggle={() => setWeeklyReport(!weeklyReport)} />
                  </SettingRow>
                </div>
              </div>

              {/* Notification preview */}
              <div className="rounded-2xl border border-border bg-[#eef0ff] p-5">
                <p className="text-xs font-semibold text-[#4a6cf7]">Active Channels</p>
                <div className="mt-3 flex gap-3">
                  {emailNotif && (
                    <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                      <Mail className="h-3.5 w-3.5 text-[#4a6cf7]" />
                      Email
                    </div>
                  )}
                  {pushNotif && (
                    <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                      <Smartphone className="h-3.5 w-3.5 text-[#4a6cf7]" />
                      Push
                    </div>
                  )}
                  {soundNotif && (
                    <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                      <Volume2 className="h-3.5 w-3.5 text-[#4a6cf7]" />
                      Sound
                    </div>
                  )}
                  {!emailNotif && !pushNotif && !soundNotif && (
                    <p className="text-xs text-[#4a6cf7]/70">No channels active</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Theme</SectionTitle>
                <SectionDescription>Select your preferred color theme</SectionDescription>
                <div className="mt-4 flex flex-col gap-3">
                  <RadioOption
                    selected={theme === "light"}
                    onSelect={() => setTheme("light")}
                    icon={Sun}
                    label="Light"
                    description="Clean and bright interface with white backgrounds"
                  />
                  <RadioOption
                    selected={theme === "dark"}
                    onSelect={() => setTheme("dark")}
                    icon={Moon}
                    label="Dark"
                    description="Easy on the eyes with dark backgrounds"
                  />
                  <RadioOption
                    selected={theme === "system"}
                    onSelect={() => setTheme("system")}
                    icon={Monitor}
                    label="System"
                    description="Automatically matches your device settings"
                  />
                </div>
              </div>

              {/* Theme preview */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Preview</SectionTitle>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <div className={`flex items-center gap-3 px-4 py-3 ${theme === "dark" ? "bg-[#1a1d2e]" : "bg-[#f3f4f8]"}`}>
                    <div className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-[#ef4444]" : "bg-[#ef4444]"}`} />
                    <div className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-[#f59e0b]" : "bg-[#f59e0b]"}`} />
                    <div className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-[#10b981]" : "bg-[#10b981]"}`} />
                  </div>
                  <div className={`flex gap-3 p-4 ${theme === "dark" ? "bg-[#111427]" : "bg-[#ffffff]"}`}>
                    <div className={`h-20 w-12 rounded-lg ${theme === "dark" ? "bg-[#1a1d3e]" : "bg-[#f3f4f8]"}`} />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className={`h-3 w-3/4 rounded ${theme === "dark" ? "bg-[#1a1d3e]" : "bg-[#f3f4f8]"}`} />
                      <div className={`h-3 w-1/2 rounded ${theme === "dark" ? "bg-[#1a1d3e]" : "bg-[#f3f4f8]"}`} />
                      <div className="flex gap-2 mt-1">
                        <div className={`h-8 flex-1 rounded-lg ${theme === "dark" ? "bg-[#1a1d3e]" : "bg-[#f3f4f8]"}`} />
                        <div className={`h-8 flex-1 rounded-lg ${theme === "dark" ? "bg-[#1a1d3e]" : "bg-[#f3f4f8]"}`} />
                      </div>
                    </div>
                    <div className={`h-20 w-16 rounded-lg ${theme === "dark" ? "bg-[#1a1d3e]" : "bg-[#eef0ff]"}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Units & Data */}
          {activeTab === "units" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Temperature</SectionTitle>
                <SectionDescription>Choose your preferred temperature unit</SectionDescription>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTempUnit("celsius")}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all ${
                      tempUnit === "celsius"
                        ? "border-[#4a6cf7] bg-[#eef0ff] shadow-sm"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <span className={`text-2xl font-bold ${tempUnit === "celsius" ? "text-[#4a6cf7]" : "text-foreground"}`}>
                      °C
                    </span>
                    <span className="text-xs text-muted-foreground">Celsius</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempUnit("fahrenheit")}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all ${
                      tempUnit === "fahrenheit"
                        ? "border-[#4a6cf7] bg-[#eef0ff] shadow-sm"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <span className={`text-2xl font-bold ${tempUnit === "fahrenheit" ? "text-[#4a6cf7]" : "text-foreground"}`}>
                      °F
                    </span>
                    <span className="text-xs text-muted-foreground">Fahrenheit</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Wind Speed</SectionTitle>
                <SectionDescription>Select wind speed measurement unit</SectionDescription>
                <div className="mt-4 flex gap-3">
                  {[
                    { key: "kmh" as const, label: "km/h", sub: "Kilometers" },
                    { key: "mph" as const, label: "mph", sub: "Miles" },
                    { key: "ms" as const, label: "m/s", sub: "Meters" },
                  ].map((unit) => (
                    <button
                      key={unit.key}
                      type="button"
                      onClick={() => setWindUnit(unit.key)}
                      className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all ${
                        windUnit === unit.key
                          ? "border-[#4a6cf7] bg-[#eef0ff] shadow-sm"
                          : "border-border bg-card hover:bg-secondary"
                      }`}
                    >
                      <Wind className={`h-5 w-5 ${windUnit === unit.key ? "text-[#4a6cf7]" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-bold ${windUnit === unit.key ? "text-[#4a6cf7]" : "text-foreground"}`}>
                        {unit.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{unit.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Pressure</SectionTitle>
                <SectionDescription>Choose barometric pressure unit</SectionDescription>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPressureUnit("hpa")}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all ${
                      pressureUnit === "hpa"
                        ? "border-[#4a6cf7] bg-[#eef0ff] shadow-sm"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <span className={`text-lg font-bold ${pressureUnit === "hpa" ? "text-[#4a6cf7]" : "text-foreground"}`}>
                      hPa
                    </span>
                    <span className="text-[10px] text-muted-foreground">Hectopascals</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPressureUnit("inhg")}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all ${
                      pressureUnit === "inhg"
                        ? "border-[#4a6cf7] bg-[#eef0ff] shadow-sm"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <span className={`text-lg font-bold ${pressureUnit === "inhg" ? "text-[#4a6cf7]" : "text-foreground"}`}>
                      inHg
                    </span>
                    <span className="text-[10px] text-muted-foreground">Inches of Mercury</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Locations */}
          {activeTab === "location" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <SectionTitle>Auto-Detect Location</SectionTitle>
                    <SectionDescription>Use device GPS to detect your current location</SectionDescription>
                  </div>
                  <Toggle enabled={autoLocation} onToggle={() => setAutoLocation(!autoLocation)} />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Saved Locations</SectionTitle>
                <SectionDescription>Manage your saved weather locations</SectionDescription>
                <div className="mt-4 flex flex-col gap-3">
                  {savedLocations.map((loc) => (
                    <div
                      key={loc.name}
                      className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all ${
                        loc.primary
                          ? "border-[#4a6cf7] bg-[#eef0ff]"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                          loc.primary
                            ? "bg-[#4a6cf7] text-[#ffffff]"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${loc.primary ? "text-[#4a6cf7]" : "text-foreground"}`}>
                          {loc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current: {loc.temp}
                          {loc.primary && " - Primary"}
                        </p>
                      </div>
                      {loc.primary && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4a6cf7]">
                          <Check className="h-3 w-3 text-[#ffffff]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-[#4a6cf7] hover:text-[#4a6cf7]"
                >
                  <MapPin className="h-4 w-4" />
                  Add New Location
                </button>
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeTab === "privacy" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Data Sharing</SectionTitle>
                <SectionDescription>Control how your data is used and shared</SectionDescription>
                <div className="mt-4 divide-y divide-border">
                  <SettingRow label="Share Weather Data" description="Contribute anonymized data to improve forecasts">
                    <Toggle enabled={shareData} onToggle={() => setShareData(!shareData)} />
                  </SettingRow>
                  <SettingRow label="Analytics" description="Help us improve by sharing usage analytics">
                    <Toggle enabled={analytics} onToggle={() => setAnalytics(!analytics)} />
                  </SettingRow>
                  <SettingRow label="Profile Visibility" description="Allow others to see your profile in Community">
                    <Toggle enabled={visibility} onToggle={() => setVisibility(!visibility)} />
                  </SettingRow>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Security</SectionTitle>
                <SectionDescription>Manage your account security settings</SectionDescription>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-4 rounded-xl border border-border px-4 py-3.5 text-left transition-colors hover:bg-secondary"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Change Password</p>
                      <p className="text-xs text-muted-foreground">Update your account password</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-4 rounded-xl border border-border px-4 py-3.5 text-left transition-colors hover:bg-secondary"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <Eye className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <SectionTitle>Account</SectionTitle>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-4 rounded-xl border border-border px-4 py-3.5 text-left transition-colors hover:bg-secondary"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#eef0ff] text-[#4a6cf7]">
                      <Download className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Export Data</p>
                      <p className="text-xs text-muted-foreground">Download all your weather data</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-4 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3.5 text-left transition-colors hover:bg-[#fee2e2]"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#ef4444] text-[#ffffff]">
                      <Trash2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#ef4444]">Delete Account</p>
                      <p className="text-xs text-[#ef4444]/70">Permanently remove your account and data</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#ef4444]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

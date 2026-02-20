"use client"

import * as React from "react"
import { Container } from "@/components/ui/layout"
import { AuthenticatedNavigation } from "@/components/ui/authenticated-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Globe,
  Moon,
  Sun
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsProps {
  className?: string
}

interface UserProfile {
  fullName: string
  email: string
  phone: string
  avatar?: string
  dateJoined: Date
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  paymentReminders: boolean
  groupUpdates: boolean
  marketingEmails: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  loginAlerts: boolean
  sessionTimeout: number
}

interface PaymentMethod {
  id: string
  type: 'bank' | 'card' | 'mobile_money'
  name: string
  details: string
  isDefault: boolean
}

// Mock data
const mockProfile: UserProfile = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+234 801 234 5678",
  dateJoined: new Date("2024-01-15")
}

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  paymentReminders: true,
  groupUpdates: true,
  marketingEmails: false
}

const mockSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  loginAlerts: true,
  sessionTimeout: 30
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "bank",
    name: "GTBank",
    details: "****1234",
    isDefault: true
  },
  {
    id: "2",
    type: "card",
    name: "Visa Card",
    details: "****5678",
    isDefault: false
  }
]

interface SettingSectionProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

function SettingSection({ title, description, children, className }: SettingSectionProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  )
}

interface ToggleSettingProps {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  icon?: React.ComponentType<{ className?: string }>
}

function ToggleSetting({ label, description, checked, onChange, icon: Icon }: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ajo-primary focus:ring-offset-2",
          checked ? "bg-ajo-primary" : "bg-muted"
        )}
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  )
}

export function Settings({ className }: SettingsProps) {
  const [profile, setProfile] = React.useState(mockProfile)
  const [notifications, setNotifications] = React.useState(mockNotificationSettings)
  const [security, setSecurity] = React.useState(mockSecuritySettings)
  const [paymentMethods, setPaymentMethods] = React.useState(mockPaymentMethods)
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log('Profile saved:', profile)
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handleSecurityChange = (key: keyof SecuritySettings, value: boolean | number) => {
    setSecurity(prev => ({ ...prev, [key]: value }))
  }

  const handleDeleteAccount = () => {
    console.log('Delete account requested')
    // In a real app, this would show a confirmation dialog
  }

  const handleAddPaymentMethod = () => {
    console.log('Add payment method')
    // In a real app, this would navigate to add payment method form
  }

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id))
  }

  return (
    <main className={cn("min-h-screen bg-background", className)} role="main">
      <AuthenticatedNavigation />
      <Container size="xl" className="py-6 sm:py-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account preferences and security settings.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Settings */}
              <SettingSection
                title="Profile Information"
                description="Update your personal information and profile details."
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ajo-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ajo-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ajo-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Member Since
                    </label>
                    <input
                      type="text"
                      value={profile.dateJoined.toLocaleDateString()}
                      disabled
                      className="w-full px-3 py-2 border border-input rounded-md bg-muted text-muted-foreground"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </SettingSection>

              {/* Notification Settings */}
              <SettingSection
                title="Notifications"
                description="Choose how you want to be notified about important updates."
              >
                <div className="space-y-2">
                  <ToggleSetting
                    label="Email Notifications"
                    description="Receive notifications via email"
                    checked={notifications.emailNotifications}
                    onChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    icon={Mail}
                  />
                  <ToggleSetting
                    label="SMS Notifications"
                    description="Receive notifications via SMS"
                    checked={notifications.smsNotifications}
                    onChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                    icon={Smartphone}
                  />
                  <ToggleSetting
                    label="Push Notifications"
                    description="Receive push notifications in your browser"
                    checked={notifications.pushNotifications}
                    onChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                    icon={Bell}
                  />
                  <ToggleSetting
                    label="Payment Reminders"
                    description="Get reminded about upcoming payments"
                    checked={notifications.paymentReminders}
                    onChange={(checked) => handleNotificationChange('paymentReminders', checked)}
                    icon={CreditCard}
                  />
                  <ToggleSetting
                    label="Group Updates"
                    description="Receive updates about your ajo groups"
                    checked={notifications.groupUpdates}
                    onChange={(checked) => handleNotificationChange('groupUpdates', checked)}
                    icon={User}
                  />
                  <ToggleSetting
                    label="Marketing Emails"
                    description="Receive promotional emails and updates"
                    checked={notifications.marketingEmails}
                    onChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                    icon={Mail}
                  />
                </div>
              </SettingSection>

              {/* Security Settings */}
              <SettingSection
                title="Security & Privacy"
                description="Manage your account security and privacy preferences."
              >
                <div className="space-y-4">
                  <ToggleSetting
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                    checked={security.twoFactorEnabled}
                    onChange={(checked) => handleSecurityChange('twoFactorEnabled', checked)}
                    icon={Shield}
                  />
                  <ToggleSetting
                    label="Login Alerts"
                    description="Get notified when someone logs into your account"
                    checked={security.loginAlerts}
                    onChange={(checked) => handleSecurityChange('loginAlerts', checked)}
                    icon={Bell}
                  />
                  
                  <div className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Change Password</p>
                          <p className="text-sm text-muted-foreground">Update your account password</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </SettingSection>

              {/* Payment Methods */}
              <SettingSection
                title="Payment Methods"
                description="Manage your payment methods for contributions and withdrawals."
              >
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">
                            {method.name} {method.details}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {method.type.replace('_', ' ')} {method.isDefault && '• Default'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 text-xs bg-ajo-primary/10 text-ajo-primary rounded-full">
                            Default
                          </span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemovePaymentMethod(method.id)}
                          disabled={method.isDefault}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={handleAddPaymentMethod}
                    className="w-full"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </SettingSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Appearance
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Customize how the app looks and feels.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Theme</p>
                        <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                      </div>
                    </div>
                    <ThemeToggle />
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-ajo-success" />
                    <span className="text-sm text-foreground">Account Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-ajo-success" />
                    <span className="text-sm text-foreground">Email Confirmed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-ajo-warning" />
                    <span className="text-sm text-foreground">Phone Pending</span>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-ajo-error/20">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-ajo-error">
                    Danger Zone
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Irreversible and destructive actions.
                  </p>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={handleDeleteAccount}
                    className="w-full border-ajo-error/20 text-ajo-error hover:bg-ajo-error/5"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Settings
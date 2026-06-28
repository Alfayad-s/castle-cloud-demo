"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Globe,
  KeyRound,
  Monitor,
  Save,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  ActiveSession,
  AppPreferences,
  CompanySettings,
  NotificationSettings,
} from "@/data/settings";
import { demoInfo, roleLabels } from "@/data/settings";
import { formatDateTime } from "@/lib/formatters";
import type { User } from "@/types";

type SettingsViewProps = {
  company: CompanySettings;
  defaultNotifications: NotificationSettings;
  defaultPreferences: AppPreferences;
  sessions: ActiveSession[];
  team: User[];
};

export function SettingsView({
  company: initialCompany,
  defaultNotifications,
  defaultPreferences,
  sessions,
  team,
}: SettingsViewProps) {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "+91 98765 43210",
    designation: user?.designation ?? "",
  });
  const [company, setCompany] = useState(initialCompany);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const initials =
    profile.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BM";

  const handleSave = (section: string) => {
    toast.success(`${section} saved`, {
      description: "Changes are stored locally for this demo session.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="h-9 flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Profile Settings</CardTitle>
              <CardDescription>Your personal account information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-blue-500/10 text-lg font-bold text-blue-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {user?.role ? roleLabels[user.role] : "User"}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" id="profile-name">
                  <Input
                    id="profile-name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </Field>
                <Field label="Email" id="profile-email">
                  <Input
                    id="profile-email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Field>
                <Field label="Phone" id="profile-phone">
                  <Input
                    id="profile-phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Field>
                <Field label="Designation" id="profile-designation">
                  <Input
                    id="profile-designation"
                    value={profile.designation}
                    onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                  />
                </Field>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("Profile")}>
                  <Save className="size-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="size-4" />
                Company Information
              </CardTitle>
              <CardDescription>Organization details shown across the platform</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company Name" id="company-name">
                  <Input
                    id="company-name"
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  />
                </Field>
                <Field label="Tagline" id="company-tagline">
                  <Input
                    id="company-tagline"
                    value={company.tagline}
                    onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                  />
                </Field>
                <Field label="Email" id="company-email">
                  <Input
                    id="company-email"
                    type="email"
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  />
                </Field>
                <Field label="Phone" id="company-phone">
                  <Input
                    id="company-phone"
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  />
                </Field>
                <Field label="Website" id="company-website">
                  <Input
                    id="company-website"
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                  />
                </Field>
                <Field label="GSTIN" id="company-gstin">
                  <Input
                    id="company-gstin"
                    value={company.gstin}
                    onChange={(e) => setCompany({ ...company, gstin: e.target.value })}
                  />
                </Field>
                <Field label="PAN" id="company-pan">
                  <Input
                    id="company-pan"
                    value={company.pan}
                    onChange={(e) => setCompany({ ...company, pan: e.target.value })}
                  />
                </Field>
                <Field label="City" id="company-city">
                  <Input
                    id="company-city"
                    value={company.city}
                    onChange={(e) => setCompany({ ...company, city: e.target.value })}
                  />
                </Field>
                <Field label="Address" id="company-address" className="sm:col-span-2">
                  <Input
                    id="company-address"
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  />
                </Field>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("Company settings")}>
                  <Save className="size-4" />
                  Save Company
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-4" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose which alerts you receive</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <NotificationRow
                title="Low Stock Alerts"
                description="Notify when materials fall below minimum threshold"
                checked={notifications.lowStockAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, lowStockAlerts: checked })
                }
              />
              <NotificationRow
                title="DPR Submissions"
                description="Alert when site engineers submit daily progress reports"
                checked={notifications.dprSubmissions}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, dprSubmissions: checked })
                }
              />
              <NotificationRow
                title="PO Approvals"
                description="Notify pending purchase order approvals"
                checked={notifications.poApprovals}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, poApprovals: checked })
                }
              />
              <NotificationRow
                title="Payment Reminders"
                description="Client payment due date reminders"
                checked={notifications.paymentReminders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, paymentReminders: checked })
                }
              />
              <NotificationRow
                title="Machine Maintenance"
                description="Alerts for maintenance due and insurance expiry"
                checked={notifications.machineMaintenance}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, machineMaintenance: checked })
                }
              />
              <NotificationRow
                title="Weekly Reports"
                description="Summary email every Monday morning"
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyReports: checked })
                }
              />
              <div className="flex justify-end pt-2">
                <Button onClick={() => handleSave("Notification preferences")}>
                  <Save className="size-4" />
                  Save Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="size-4" />
                  Regional Preferences
                </CardTitle>
                <CardDescription>Locale and display formatting</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Field label="Currency" id="pref-currency">
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, currency: value as AppPreferences["currency"] })
                    }
                  >
                    <SelectTrigger id="pref-currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR — Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">USD — US Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Date Format" id="pref-date">
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) =>
                      setPreferences({
                        ...preferences,
                        dateFormat: value as AppPreferences["dateFormat"],
                      })
                    }
                  >
                    <SelectTrigger id="pref-date">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Language" id="pref-language">
                  <Select
                    value={preferences.language}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, language: value as AppPreferences["language"] })
                    }
                  >
                    <SelectTrigger id="pref-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Timezone" id="pref-timezone">
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, timezone: value ?? "Asia/Kolkata" })
                    }
                  >
                    <SelectTrigger id="pref-timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <NotificationRow
                  title="Compact Numbers"
                  description="Show ₹2.4 Cr instead of ₹24,000,000 in dashboards"
                  checked={preferences.compactNumbers}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, compactNumbers: checked })
                  }
                />
                <div className="flex justify-end">
                  <Button onClick={() => handleSave("Preferences")}>
                    <Save className="size-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Theme and display mode</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>
                <Separator />
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Demo Environment
                  </p>
                  <div className="mt-3 grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version</span>
                      <span className="font-medium">{demoInfo.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environment</span>
                      <span className="font-medium">{demoInfo.environment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">{demoInfo.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Demo Login</span>
                      <span className="font-mono text-xs">{demoInfo.credentials.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Password</span>
                      <span className="font-mono text-xs">{demoInfo.credentials.password}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <KeyRound className="size-4" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Field label="Current Password" id="pwd-current">
                  <Input
                    id="pwd-current"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••"
                  />
                </Field>
                <Field label="New Password" id="pwd-new">
                  <Input
                    id="pwd-new"
                    type="password"
                    value={passwords.next}
                    onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                    placeholder="••••••••"
                  />
                </Field>
                <Field label="Confirm Password" id="pwd-confirm">
                  <Input
                    id="pwd-confirm"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="••••••••"
                  />
                </Field>
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      handleSave("Password");
                      setPasswords({ current: "", next: "", confirm: "" });
                    }}
                  >
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="size-4" />
                  Active Sessions
                </CardTitle>
                <CardDescription>Devices currently signed in to your account</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {session.device.includes("iPhone") ? (
                        <Smartphone className="size-4" />
                      ) : (
                        <Monitor className="size-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{session.device}</p>
                        {session.current ? (
                          <Badge variant="secondary" className="text-[10px]">
                            Current
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                      <p className="text-xs tabular-nums text-muted-foreground">
                        Last active {formatDateTime(session.lastActive)}
                      </p>
                    </div>
                    {!session.current ? (
                      <Button variant="ghost" size="sm" className="shrink-0 text-rose-600">
                        Revoke
                      </Button>
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="size-4" />
                Team Members
              </CardTitle>
              <CardDescription>Users with access to this Castle Cloud Builders ERP instance</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="pr-6">Designation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((member) => {
                    const memberInitials = member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <TableRow key={member.id}>
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="size-8">
                              <AvatarFallback className="bg-blue-500/10 text-xs font-bold text-blue-600">
                                {memberInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {roleLabels[member.role]}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6 text-muted-foreground">
                          {member.designation}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({
  label,
  id,
  children,
  className,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1.5 block text-sm">
        {label}
      </Label>
      {children}
    </div>
  );
}

function NotificationRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

"use client";

import { Bell, CreditCard, Menu, Plus, Settings, Shield, Upload, User, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notification", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integration", icon: Settings },
];

const integrations = [
  {
    name: "Google Drive",
    description: "Upload your files to Google Drive",
    icon: "🟢",
    enabled: true,
  },
  {
    name: "Slack",
    description: "Post to a Slack channel",
    icon: "🟣",
    enabled: true,
  },
  {
    name: "Notion",
    description: "Retrieve notion note to your project",
    icon: "⚫",
    enabled: false,
  },
  {
    name: "Jira",
    description: "Create Jira issues",
    icon: "🔵",
    enabled: false,
  },
  {
    name: "Zendesk",
    description: "Exchange data with Zendesk",
    icon: "🟢",
    enabled: false,
  },
  {
    name: "Dropbox",
    description: "Exchange data with Dropbox",
    icon: "🔵",
    enabled: false,
  },
  {
    name: "Github",
    description: "Exchange files with a GitHub repository",
    icon: "⚫",
    enabled: false,
  },
  {
    name: "Gitlab",
    description: "Exchange files with a Gitlab repository",
    icon: "🟠",
    enabled: false,
  },
];

const transactions = [
  {
    id: "#36223",
    product: "Mock premium pack",
    status: "Pending",
    date: "12/10/2021",
    amount: "$39.90",
  },
  {
    id: "#34283",
    product: "Business board basic subscription",
    status: "Paid",
    date: "11/13/2021",
    amount: "$59.90",
  },
  {
    id: "#32234",
    product: "Business board basic subscription",
    status: "Paid",
    date: "10/13/2021",
    amount: "$59.90",
  },
  {
    id: "#31354",
    product: "Business board basic subscription",
    status: "Paid",
    date: "09/13/2021",
    amount: "$59.90",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "billing":
        return <BillingSection />;
      case "integrations":
        return <IntegrationsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button onClick={() => setSidebarOpen(!sidebarOpen)} size="icon" variant="outline">
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 font-medium text-sm transition-colors",
                    activeSection === item.id ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">{renderContent()}</div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} role="button" />}
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance font-semibold text-2xl">Personal information</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://bundui-images.netlify.app/avatars/10.png" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button size="sm">
                  <Upload />
                  Upload image
                </Button>
                <Button size="sm" variant="outline">
                  Remove
                </Button>
              </div>
            </div>

            {/* Personal info form */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input defaultValue="Angelina" id="firstName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userName">User name</Label>
                <Input defaultValue="Gotelli" id="userName" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input defaultValue="carolyn_h@hotmail.com" id="email" type="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="flex gap-2">
                <Select defaultValue="us">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">🇺🇸 +1</SelectItem>
                    <SelectItem value="uk">🇬🇧 +44</SelectItem>
                  </SelectContent>
                </Select>
                <Input className="flex-1" defaultValue="121231234" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">🇺🇸 United States</SelectItem>
                <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input defaultValue="123 Main St" id="address" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input defaultValue="New York" id="city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input defaultValue="10001" id="postalCode" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance font-semibold text-2xl">Password</h1>
        <p className="mt-1 text-muted-foreground">Remember, your password is your digital key to your account. Keep it safe, keep it secure!</p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input defaultValue="••••••••" id="currentPassword" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input defaultValue="••••••••" id="newPassword" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input defaultValue="••••••••" id="confirmPassword" type="password" />
          </div>

          <div className="flex justify-end">
            <Button>Update</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2-Step verification</CardTitle>
          <CardDescription>Your account holds great value to hackers. Enable two-step verification to safeguard your account!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <span className="font-semibold text-red-600 text-sm">G</span>
              </div>
              <div>
                <h4 className="font-medium">Google Authenticator</h4>
                <p className="text-muted-foreground text-sm">Using Google Authenticator app generates time-sensitive codes for secure logins.</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700" variant="secondary">
              Activated
            </Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span className="font-semibold text-blue-600 text-sm">O</span>
              </div>
              <div>
                <h4 className="font-medium">Okta Verify</h4>
                <p className="text-muted-foreground text-sm">Receive push notifications from Okta Verify app on your phone for quick login approval.</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <span className="font-semibold text-orange-600 text-sm">@</span>
              </div>
              <div>
                <h4 className="font-medium">E Mail verification</h4>
                <p className="text-muted-foreground text-sm">Unique codes sent to email for confirming logins.</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance font-semibold text-2xl">Notification</h1>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable desktop notification</h3>
              <p className="text-muted-foreground text-sm">Decide whether you want to be notified of new message & updates</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable unread notification badge</h3>
              <p className="text-muted-foreground text-sm">Display a red indicator on of the notification icon when you have unread message</p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Enable unread notification badge</h3>

            <RadioGroup className="space-y-4" defaultValue="mentions">
              <div className="flex items-start space-x-3">
                <RadioGroupItem className="mt-1" id="all" value="all" />
                <div>
                  <Label className="font-medium" htmlFor="all">
                    All new messages
                  </Label>
                  <p className="text-muted-foreground text-sm">Broadcast notifications to the channel for each new message</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <RadioGroupItem className="mt-1" id="mentions" value="mentions" />
                <div>
                  <Label className="font-medium" htmlFor="mentions">
                    Mentions only
                  </Label>
                  <p className="text-muted-foreground text-sm">Only alert me in the channel if someone mentions me in a message</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <RadioGroupItem className="mt-1" id="nothing" value="nothing" />
                <div>
                  <Label className="font-medium" htmlFor="nothing">
                    Nothing
                  </Label>
                  <p className="text-muted-foreground text-sm">Don't notify me anything</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email notification</h3>
              <p className="text-muted-foreground text-sm">Substance can send you email notification for any new direct message</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox defaultChecked id="news" />
              <div>
                <Label className="font-medium" htmlFor="news">
                  News & updates
                </Label>
                <p className="text-muted-foreground text-sm">New about product and features update</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox defaultChecked id="tips" />
              <div>
                <Label className="font-medium" htmlFor="tips">
                  Tips & tutorials
                </Label>
                <p className="text-muted-foreground text-sm">Tips & trick in order to increase your performance efficiency</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="offers" />
              <div>
                <Label className="font-medium" htmlFor="offers">
                  Offer & promotions
                </Label>
                <p className="text-muted-foreground text-sm">Promotion about product price & latest discount</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="reminders" />
              <div>
                <Label className="font-medium" htmlFor="reminders">
                  Follow up reminder
                </Label>
                <p className="text-muted-foreground text-sm">Receive notification all the reminder that have been made</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BillingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance font-semibold text-2xl">Billing</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <span className="font-semibold text-green-600">⚡</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Business board basic</h3>
                  <Badge className="bg-green-100 text-green-700" variant="secondary">
                    Active
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Billing monthly | Next payment on 02/09/2025 for <span className="font-medium">$59.90</span>
                </p>
              </div>
            </div>
            <Button>Change plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <span className="font-bold text-blue-600 text-xs">VISA</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Carolyn Perkins •••• 0392</span>
                  <Badge className="text-xs" variant="outline">
                    Primary
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">Expired Dec 2025</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <span className="font-bold text-orange-600 text-xs">MC</span>
              </div>
              <div>
                <span className="font-medium">Carolyn Perkins •••• 8461</span>
                <p className="text-muted-foreground text-sm">Expired Jun 2025</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>

          <Button className="w-full bg-transparent" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add payment method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction history</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 border-b pb-2 font-medium text-muted-foreground text-sm">
              <div>REFERENCE</div>
              <div>PRODUCT</div>
              <div>STATUS</div>
              <div>DATE</div>
              <div className="text-right">AMOUNT</div>
            </div>

            {transactions.map((transaction) => (
              <div className="grid grid-cols-5 gap-4 py-2 text-sm" key={transaction.id}>
                <div className="font-medium">{transaction.id}</div>
                <div>{transaction.product}</div>
                <div>
                  <Badge
                    className={transaction.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                    variant={transaction.status === "Paid" ? "default" : "secondary"}
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <div>{transaction.date}</div>
                <div className="text-right font-medium">{transaction.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IntegrationsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance font-semibold text-2xl">Integration</h1>
        <p className="mt-1 text-muted-foreground">Supercharge your workflow using these integration</p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <p className="text-muted-foreground text-sm">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button className="text-muted-foreground" size="sm" variant="ghost">
                    Learn more
                  </Button>
                  <Switch defaultChecked={integration.enabled} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

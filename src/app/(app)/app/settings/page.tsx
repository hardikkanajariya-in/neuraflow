'use client';

import { useState } from 'react';
import { Save, Trash2, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { useToast } from '@/providers/ToastProvider';
import appData from '@/data/app.json';

const timezoneOptions = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'pt', label: 'Portuguese' },
];

export default function SettingsPage() {
  const { showToast } = useToast();

  const [name, setName] = useState(appData.user.name);
  const [email, setEmail] = useState(appData.user.email);
  const [timezone, setTimezone] = useState('America/New_York');
  const [language, setLanguage] = useState('en');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Settings saved successfully.', 'success');
    }, 800);
  };

  const handleDeleteAccount = () => {
    showToast('Account deletion requires confirmation via email. A verification link has been sent.', 'error');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white font-display">
          Profile
        </h2>
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
      </Card>

      {/* Preferences Section */}
      <Card>
        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white font-display">
          Preferences
        </h2>
        <div className="space-y-4">
          <Select
            label="Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            options={timezoneOptions}
          />
          <Select
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languageOptions}
          />
        </div>
      </Card>

      {/* Notifications Section */}
      <Card>
        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white font-display">
          Notifications
        </h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Email Notifications
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive email notifications for automation alerts and run failures.
              </p>
            </div>
            <Toggle
              enabled={emailNotifications}
              onChange={setEmailNotifications}
              label="Email notifications toggle"
            />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Marketing Emails
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive updates about new features, tips, and product news.
              </p>
            </div>
            <Toggle
              enabled={marketingEmails}
              onChange={setMarketingEmails}
              label="Marketing emails toggle"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} loading={saving}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900/50">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 font-display">
            Danger Zone
          </h2>
        </div>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Once you delete your account, all of your data, projects, automations, and run history will
          be permanently removed. This action cannot be undone.
        </p>
        <Button variant="danger" onClick={handleDeleteAccount}>
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </Card>
    </div>
  );
}

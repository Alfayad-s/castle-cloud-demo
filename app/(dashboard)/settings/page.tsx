import {
  activeSessions,
  companySettings,
  defaultNotifications,
  defaultPreferences,
  teamMembers,
} from "@/data/settings";
import { PageShell } from "@/components/layout/page-shell";
import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      description="Application preferences, profile, and demo configuration."
      breadcrumbs={[{ label: "Settings" }]}
    >
      <SettingsView
        company={companySettings}
        defaultNotifications={defaultNotifications}
        defaultPreferences={defaultPreferences}
        sessions={activeSessions}
        team={teamMembers}
      />
    </PageShell>
  );
}

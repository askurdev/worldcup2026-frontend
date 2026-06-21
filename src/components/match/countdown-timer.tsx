"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { getCountdown } from "@/lib/utils/time";
import { Button } from "@/components/ui/button";

export function CountdownTimer({ kickoffUtc }: { kickoffUtc: string }) {
  const [countdown, setCountdown] = useState(() => getCountdown(kickoffUtc));
  const [notificationState, setNotificationState] = useState<NotificationPermission | "unsupported">(
    "default"
  );

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setNotificationState("unsupported");
    } else {
      setNotificationState(Notification.permission);
    }
    const interval = setInterval(() => setCountdown(getCountdown(kickoffUtc)), 1000);
    return () => clearInterval(interval);
  }, [kickoffUtc]);

  async function handleEnableReminder() {
    if (typeof Notification === "undefined") return;
    const permission = await Notification.requestPermission();
    setNotificationState(permission);
    if (permission === "granted") {
      // Schedule a simple in-session reminder. A production build would
      // register a service worker + server push for reminders that fire
      // even when the tab is closed — this client-side timeout only
      // fires while this tab stays open, which is an honest limitation
      // to flag rather than imply full background notification support.
      const msUntilKickoff = new Date(kickoffUtc).getTime() - Date.now();
      if (msUntilKickoff > 0 && msUntilKickoff < 2_147_483_647) {
        setTimeout(() => {
          new Notification("Kickoff time!", {
            body: "Your World Cup 2026 match is starting now.",
          });
        }, msUntilKickoff);
      }
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-data text-2xl font-bold text-[var(--color-fifa-gold)]">
        {countdown}
      </span>
      {notificationState !== "unsupported" && notificationState !== "granted" && (
        <Button variant="secondary" onClick={handleEnableReminder}>
          <Bell className="h-4 w-4" />
          Remind me
        </Button>
      )}
      {notificationState === "granted" && (
        <span className="flex items-center gap-1.5 text-xs text-[var(--color-electric-teal)]">
          <BellRing className="h-3.5 w-3.5" />
          Reminder set (while this tab is open)
        </span>
      )}
    </div>
  );
}

// ============================================================
// Bangladesh Standard Time (BST, UTC+6) conversion utilities.
// BST does not observe daylight saving, so the offset is a
// constant +6 hours from UTC year-round — unlike the US/Mexico/
// Canada venue timezones, which do shift with DST. We still use
// Intl.DateTimeFormat (not a manual offset) so venue-side times
// stay correct automatically.
// ============================================================

const BST_TIMEZONE = "Asia/Dhaka";

/**
 * Formats a UTC ISO timestamp into Bangladesh local time.
 * e.g. "2026-06-18T14:00:00Z" -> "8:00 PM" (BST is UTC+6)
 */
export function toBSTTime(isoUtc: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BST_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoUtc));
}

/**
 * Formats a UTC ISO timestamp into a BST calendar date.
 * e.g. "2026-06-18T20:00:00Z" -> "Fri, 19 Jun" (already past midnight in Dhaka)
 */
export function toBSTDate(isoUtc: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BST_TIMEZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(isoUtc));
}

/**
 * Combined date + time string for BST, used in detail views.
 * e.g. "Friday, 19 June 2026, 8:00 PM BST"
 */
export function toBSTFull(isoUtc: string): string {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: BST_TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoUtc));
  const timePart = toBSTTime(isoUtc);
  return `${datePart}, ${timePart} BST`;
}

/**
 * Formats the venue's local kickoff time using the venue's own
 * IANA timezone, so the "dual-clock" UI (venue time vs BST) is
 * always correct even across DST transitions.
 */
export function toVenueTime(isoUtc: string, venueTimezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: venueTimezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoUtc));
}

/**
 * Returns whether the BST calendar day for this match is "today"
 * relative to the viewer's current moment (also converted to BST,
 * since this is a Bangladesh-focused dashboard — "today" means
 * today in Dhaka, not the server's or browser's local timezone).
 */
export function isMatchTodayInBST(isoUtc: string, now: Date = new Date()): boolean {
  const matchDay = new Intl.DateTimeFormat("en-CA", {
    timeZone: BST_TIMEZONE,
  }).format(new Date(isoUtc)); // en-CA gives YYYY-MM-DD
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: BST_TIMEZONE,
  }).format(now);
  return matchDay === today;
}

/**
 * Human-friendly countdown string for reminders / hero section.
 * e.g. "2d 4h 12m" or "Starting now" or "Live"
 */
export function getCountdown(isoUtc: string, now: Date = new Date()): string {
  const diffMs = new Date(isoUtc).getTime() - now.getTime();
  if (diffMs <= 0) return "Live";

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * Generates a Google Calendar "create event" URL for a match,
 * using BST-correct timing. Google Calendar accepts UTC times
 * directly (suffixed Z handling via dates param), so we pass
 * UTC and let Google Calendar render it in the viewer's own
 * calendar timezone — this is intentional and matches how
 * Google Calendar links work in practice.
 */
export function buildGoogleCalendarUrl(params: {
  title: string;
  description: string;
  location: string;
  startUtc: string;
  durationMinutes?: number;
}): string {
  const { title, description, location, startUtc, durationMinutes = 120 } = params;
  const start = new Date(startUtc);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const formatGCalDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const queryParams = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGCalDate(start)}/${formatGCalDate(end)}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${queryParams.toString()}`;
}

/**
 * Notification Utility - Browser Notification API for local scheduled reminders
 */

export async function requestPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

/**
 * Schedule a local reminder using setTimeout (demo mode for active browser tab).
 * For persistent background reminders across browser restarts, upgrade to Service Worker + Push API.
 */
export async function scheduleReminder(delayMs, title, body) {
  if (!("Notification" in window)) {
    console.warn("Notifications API not supported in this browser.");
    return false;
  }

  const hasPermission = await requestPermission();
  if (!hasPermission) {
    console.warn("Notification permission denied by user.");
    return false;
  }

  // Fallback for immediate demo if delay is negative or zero
  const validDelay = Math.max(1000, delayMs);

  setTimeout(() => {
    new Notification(title, {
      body,
      icon: '/assets/petshop.png',
      badge: '🐾'
    });
  }, validDelay);

  return true;
}

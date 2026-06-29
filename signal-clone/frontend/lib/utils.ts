// lib/utils.ts
// Helper utility functions used across the app.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns";

// shadcn utility for merging tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Format message timestamp ──
// Shows time if today, "Yesterday" if yesterday, date otherwise
export function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "dd/MM/yyyy");
  }
}

// ── Format last seen ──
// Shows "Online", "last seen today at HH:mm" etc.
export function formatLastSeen(
  dateStr: string,
  isOnline: boolean
): string {
  if (isOnline) return "Online";
  const date = new Date(dateStr);
  if (isToday(date)) {
    return `last seen today at ${format(date, "HH:mm")}`;
  } else if (isYesterday(date)) {
    return `last seen yesterday at ${format(date, "HH:mm")}`;
  } else {
    return `last seen ${formatDistanceToNow(date, { addSuffix: true })}`;
  }
}

// ── Format conversation list timestamp ──
// Short format for sidebar
export function formatConvTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "dd/MM/yy");
  }
}

// ── Get initials from display name ──
// Used as fallback when no avatar image
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Truncate long text ──
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { demoNotifications, getUnreadCount, type AppNotification } from "@/data/notifications";
import { formatDateTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const typeStyles = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  danger: "bg-rose-500",
};

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<AppNotification[]>(demoNotifications);
  const unreadCount = getUnreadCount(notifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="relative size-10" />}
      >
        <Bell className="size-4" />
        {unreadCount > 0 ? (
          <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
        <span className="sr-only">
          Notifications{unreadCount > 0 ? `, ${unreadCount} unread` : ""}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[min(calc(100vw-2rem),380px)] rounded-xl p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 text-base font-semibold">
              Notifications
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          {unreadCount > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={markAllRead}
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </Button>
          ) : null}
        </div>

        <div className="max-h-[min(400px,60vh)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markRead(notification.id)}
              />
            ))
          )}
        </div>

        <DropdownMenuSeparator className="m-0" />
        <DropdownMenuItem render={<Link href="/settings" className="justify-center py-2.5" />}>
          <ExternalLink className="size-3.5" />
          Notification settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: AppNotification;
  onRead: () => void;
}) {
  const content = (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
        !notification.read && "bg-blue-500/5",
      )}
    >
      <span
        className={cn(
          "mt-1.5 size-2 shrink-0 rounded-full",
          typeStyles[notification.type],
          !notification.read && "ring-2 ring-offset-1 ring-blue-500/30",
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm", !notification.read && "font-semibold")}>
            {notification.title}
          </p>
          {!notification.read ? (
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-500" />
          ) : null}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {notification.message}
        </p>
        <p className="mt-1 text-[10px] tabular-nums text-muted-foreground">
          {formatDateTime(notification.timestamp)}
        </p>
      </div>
    </div>
  );

  if (notification.href) {
    return (
      <Link href={notification.href} onClick={onRead} className="block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="block w-full text-left" onClick={onRead}>
      {content}
    </button>
  );
}

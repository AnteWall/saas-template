import React, { useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Group,
  Card,
  ThemeIcon,
  Text,
} from "@mantine/core";
import { format, formatRelative } from "date-fns";
import { useListSessions } from "../../../hooks/auth/useListSessions.ts";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";

export interface SessionListProps {}

export const SessionList: React.FC<SessionListProps> = ({}) => {
  const { data: sessions, isPending, error } = useListSessions();
  const sessionsItems = (sessions?.data ?? []).map((session) => {
    return (
      <Card.Section key={session.id} p="md">
        <ThemeIcon variant="light">
          {getUserAgentIcon(session.userAgent)}
        </ThemeIcon>
        <Text fw="bold">
          {formatRelative(new Date(session.createdAt), new Date())}
        </Text>
        <Text c="dimmed" fz="xs">
          {format(new Date(session.createdAt), "PPPppp")}
        </Text>
      </Card.Section>
    );
  });

  return (
    <Card>
      <Card.Section withBorder>sec</Card.Section>
      <Card.Section>sec2</Card.Section>
      {sessionsItems}
    </Card>
  );
};

const getUserAgentIcon = (userAgent?: string) => {
  if (/Mobi|Android/i.test(userAgent)) {
    return <IconDeviceMobile size={16} />;
  }
  if (/Tablet|iPad/i.test(userAgent)) {
    return <IconDeviceTablet size={16} />;
  }
  return <IconDeviceDesktop size={16} />;
};

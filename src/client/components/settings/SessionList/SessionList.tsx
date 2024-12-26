import React, { useState } from "react";
import {
  Button,
  Group,
  Card,
  ThemeIcon,
  Text,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { format, formatRelative } from "date-fns";
import { useListSessions } from "../../../hooks/auth/useListSessions.ts";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";
import { useSession } from "../../../hooks/auth/useSession.ts";
import { useRevokeSessionMutation } from "../../../hooks/auth/useRevokeSessionMutation.ts";

export const SessionList: React.FC = () => {
  const { data } = useSession();
  const [revokeSessionId, setRevokeSessionId] = useState<string | undefined>(
    undefined
  );
  const { data: sessions, isPending, error, refetch } = useListSessions();
  const {
    mutateAsync,
    data: dataRevoke,
    error: errorRevoke,
    isPending: isRevokingSession,
  } = useRevokeSessionMutation();
  const handleRevokeSession = async (session: {
    id: string;
    token: string;
  }) => {
    setRevokeSessionId(session.id);
    await mutateAsync(session.token);
    void refetch();
  };

  const sessionsItems = (sessions?.data ?? []).map((session) => {
    const isActive = session.id === data?.data?.session.id;
    return (
      <Card.Section withBorder key={session.id} p="md">
        <Group>
          <ThemeIcon variant="light">
            {getUserAgentIcon(session.userAgent)}
          </ThemeIcon>
          <Stack flex={1} gap={4}>
            <Text fw="bold" size="sm">
              {formatRelative(new Date(session.createdAt), new Date())}
            </Text>
            <Text c="dimmed" fz="xs">
              {format(new Date(session.createdAt), "PPPppp")}
            </Text>
          </Stack>
          <Stack gap={4}>
            <Button
              onClick={() => {
                void handleRevokeSession(session);
              }}
              variant="subtle"
              loading={isRevokingSession}
              disabled={isActive}
            >
              {isActive ? "Your current session" : "Revoke session"}
            </Button>
            {(errorRevoke ?? dataRevoke?.error) &&
              session.id === revokeSessionId && (
                <Text size="sm" c="red">
                  {errorRevoke?.message ??
                    dataRevoke?.error?.message ??
                    "Internal server error"}
                </Text>
              )}
          </Stack>
        </Group>
      </Card.Section>
    );
  });

  return (
    <Card mih="75">
      <LoadingOverlay visible={isPending} />
      {sessionsItems}
      {error && (
        <Card.Section p="md">
          <Text size="sm" c="red">
            {error.message || "Internal server error"}
          </Text>
        </Card.Section>
      )}
    </Card>
  );
};

const getUserAgentIcon = (userAgent?: string | null) => {
  if (!userAgent) {
    return <IconDeviceDesktop size={16} />;
  }
  if (/Mobi|Android/i.test(userAgent)) {
    return <IconDeviceMobile size={16} />;
  }
  if (/Tablet|iPad/i.test(userAgent)) {
    return <IconDeviceTablet size={16} />;
  }
  return <IconDeviceDesktop size={16} />;
};

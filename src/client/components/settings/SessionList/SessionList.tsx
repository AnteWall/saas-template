import React, { useState } from "react";
import { format, formatRelative } from "date-fns";
import { useListSessions } from "../../../hooks/auth/useListSessions.ts";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";
import { useSession } from "../../../hooks/auth/useSession.ts";
import { useRevokeSessionMutation } from "../../../hooks/auth/useRevokeSessionMutation.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LoaderButton } from "@/components/ui/button-loader.tsx";
import { P } from "@/components/ui/typography.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const SessionList: React.FC = () => {
  const { data } = useSession();
  const [revokeSessionId, setRevokeSessionId] = useState<string | undefined>(
    undefined,
  );
  const { data: sessions, isPending, refetch } = useListSessions();
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
      <CardContent className="p-4" key={session.id}>
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="icon" className="cursor-default">
            {getUserAgentIcon(session.userAgent)}
          </Button>
          <div className="flex-1 space-y-2 text-sm capitalize">
            <P className="truncate font-bold">
              {formatRelative(new Date(session.createdAt), new Date())}
            </P>
            <P className="truncate text-muted-foreground text-xs">
              {format(new Date(session.createdAt), "PPPppp")}
            </P>
          </div>
          <div className="flex items-center space-x-4">
            <LoaderButton
              onClick={() => {
                void handleRevokeSession(session);
              }}
              variant={isActive ? "outline" : "secondary"}
              loading={isRevokingSession}
              disabled={isActive}
            >
              {isActive ? "Your current session" : "Revoke session"}
            </LoaderButton>
            {(errorRevoke ?? dataRevoke?.error) &&
              session.id == revokeSessionId && (
                <P className="text-red-500 text-sm">
                  {errorRevoke?.message ??
                    dataRevoke?.error?.message ??
                    "Internal server error"}
                </P>
              )}
          </div>
        </div>
      </CardContent>
    );
  });

  if (isPending) {
    return (
      <>
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-9 h-9" />
            <div className="flex-auto ml-4 flex items-center space-x-4">
              <div className="flex flex-col space-y-2 w-full">
                <Skeleton className="w-full h-7" />
                <Skeleton className="w-full h-4" />
              </div>
              <Skeleton className="w-72 h-9" />
            </div>
          </div>
        </Card>
        <Card>{sessionsItems}</Card>
      </>
    );
  }

  return (
    <>
      <Card>{sessionsItems}</Card>
    </>
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

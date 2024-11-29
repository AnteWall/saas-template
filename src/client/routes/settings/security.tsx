import { createFileRoute } from "@tanstack/react-router";
import { Title, Container } from "@mantine/core";
import { AppLayout } from "../../components/layout/AppLayout";
import { SplitSection } from "../../components/SplitSection";
import { SessionList } from "../../components/settings/SessionList";

export const Route = createFileRoute("/settings/security")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Container>
        <Title>Account settings</Title>
        <SplitSection
          pt="xl"
          title="Active sessions"
          description="Manage your active sessions on other devices"
        >
          <SessionList />
        </SplitSection>
      </Container>
    </AppLayout>
  );
}

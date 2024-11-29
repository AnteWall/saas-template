import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "../../components/layout/AppLayout";
import { Container, Title } from "@mantine/core";
import { SplitSection } from "../../components/SplitSection";

import { BasicAccountInformation } from "../../components/settings/BasicAccountInformation";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Container>
        <Title>Account settings</Title>
        <SplitSection
          pt="xl"
          title="Basic Account Information"
          description="Update your account information"
        >
          <BasicAccountInformation />
        </SplitSection>
      </Container>
    </AppLayout>
  );
}

import { Title, Container } from "@mantine/core";
import { SplitSection } from "../../components/common/SplitSection";
import { SessionList } from "../../components/settings/SessionList";
import React from "react";

export const Security: React.FC = () => {
  return (
    <>
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
    </>
  );
};

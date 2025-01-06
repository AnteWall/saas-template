import { Title, Container } from "@mantine/core";
import { SplitSection } from "../../components/common/SplitSection";
import { SessionList } from "../../components/settings/SessionList";
import React from "react";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";

export const Security: React.FC = () => {
  return (
    <>
      <HelmetWrapper title="Security" />
      <Container mt="60">
        <Title>Security</Title>
        <SplitSection
          title="Active sessions"
          description="Manage your active sessions on other devices"
        >
          <SessionList />
        </SplitSection>
      </Container>
    </>
  );
};

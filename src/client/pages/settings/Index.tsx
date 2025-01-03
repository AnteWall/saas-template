import React from "react";
import { Container, Title } from "@mantine/core";
import { SplitSection } from "../../components/common/SplitSection";
import { BasicAccountInformation } from "../../components/settings/BasicAccountInformation";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";

export const Settings: React.FC = () => {
  return (
    <Container mt="60">
      <HelmetWrapper title="Account settings" />
      <Title>Account settings</Title>
      <SplitSection
        pt="xl"
        title="Basic Account Information"
        description="Update your account information"
      >
        <BasicAccountInformation />
      </SplitSection>
    </Container>
  );
};

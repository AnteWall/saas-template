import { SplitSection } from "../../components/common/SplitSection";
import { SessionList } from "../../components/settings/SessionList";
import React from "react";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { Container } from "@/components/ui/container";
import { TypographyLarge } from "@/components/ui/typography";
import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { paths } from "../paths";

export const Security: React.FC = () => {
  return (
    <>
      <HelmetWrapper title="Security" />
      <BreadcrumbsHeader
        breadcrumbs={[
          { label: "Settings", to: paths.Settings },
          {
            label: "Security",
          },
        ]}
      />
      <Container>
        <TypographyLarge>Security</TypographyLarge>
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

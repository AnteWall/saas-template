import React from "react";
import { SplitSection } from "../../components/common/SplitSection";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { Container } from "@/components/ui/container";
import { AccountUserInfo } from "@/components/settings/account-user-info";
import { AccountEmail } from "@/components/settings/account-email";
import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { paths } from "../paths";
import { TypographyLarge } from "@/components/ui/typography";

export const Settings: React.FC = () => {
  return (
    <>
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            label: "Settings",
            to: paths.Settings,
          },
          {
            label: "Account",
          },
        ]}
      />
      <Container className="container mx-auto p-8">
        <HelmetWrapper title="Account settings" />
        <TypographyLarge>Account settings</TypographyLarge>
        <SplitSection
          className="pt-8"
          title="Basic Account Information"
          description="Update your account information"
        >
          <AccountUserInfo />
        </SplitSection>

        <SplitSection
          title="Account Email"
          description="Update your account email, this will be used for login and notifications"
        >
          <AccountEmail />
        </SplitSection>
      </Container>
    </>
  );
};

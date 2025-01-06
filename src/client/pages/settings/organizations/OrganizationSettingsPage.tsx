import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { SplitSection } from "@/components/common/SplitSection";
import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { BasicOrganizationInformation } from "@/components/settings/BasicOrganizationInformation";
import { Container } from "@/components/ui/container";
import { TypographyLarge } from "@/components/ui/typography";
import { useOrganization } from "@/hooks/auth/useOrganization";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useParams } from "react-router";

export const OrganizationSettingsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: organization, error } = useOrganization(id!);

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Failed to load organization",
        message: error.message,
        color: "red",
      });
    }
  }, [error]);

  return (
    <>
      <HelmetWrapper title={organization?.name || "Organization"} />
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            label: "Organizations",
            to: "/settings/organizations",
          },
          {
            label: organization?.name || "...",
          },
        ]}
      />
      <Container>
        <TypographyLarge>Organization settings</TypographyLarge>
        <SplitSection
          title="Organization details"
          description="Use a name that your team will recognize"
        >
          {organization && (
            <BasicOrganizationInformation organization={organization} />
          )}
        </SplitSection>
      </Container>
    </>
  );
};

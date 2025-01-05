import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { SplitSection } from "@/components/common/SplitSection";
import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { BasicOrganizationInformation } from "@/components/settings/BasicOrganizationInformation";
import { useOrganization } from "@/hooks/auth/useOrganization";
import { Container, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBuilding } from "@tabler/icons-react";
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
            icon: <IconBuilding size={16} />,
          },
          {
            label: organization?.name || "...",
          },
        ]}
      />
      <Container mt="60">
        <Title>Organization settings</Title>
        <SplitSection
          pt="xl"
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

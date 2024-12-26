import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { BreadcrumbsHeader } from "@/components/layout/BreadcrumbsHeader";
import { Container, Group, Title } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";

export const OrganizationSettingsPage: React.FC = () => {
  const { data: organization } = { data: { name: "Organization name" } };

  return (
    <>
      <HelmetWrapper title={organization.name} />
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            label: "Organizations",
            to: "/settings/organizations",
            icon: <IconBuilding size={16} />,
          },
        ]}
      />
      <Container>
        <Group mb="xl" justify="space-between">
          <Title>Organization settings</Title>
        </Group>
      </Container>
    </>
  );
};

import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { OrganizationsList } from "@/components/settings/OrganizationsList";
import { Title, Container, Group, Button } from "@mantine/core";

export const OrganizationsPage: React.FC = () => {
  return (
    <>
      <HelmetWrapper title="Organizations" />
      <Container>
        <Group mb="xl" justify="space-between">
          <Title>Organizations</Title>
          <Button>Create organization</Button>
        </Group>
        <OrganizationsList />
      </Container>
    </>
  );
};

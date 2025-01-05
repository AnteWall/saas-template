import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { Container, Title } from "@mantine/core";

export const Home: React.FC = () => {
  return (
    <>
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            label: "Home",
            to: "/",
          },
        ]}
      />
      <Container mt="60">
        <Title order={1}>Home</Title>
      </Container>
    </>
  );
};

import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { Container } from "@/components/ui/container";
import { H1 } from "@/components/ui/typography";

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
      <Container>
        <H1>Home</H1>
      </Container>
    </>
  );
};

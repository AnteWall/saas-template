import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { OrganizationsList } from "@/components/settings/OrganizationsList";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TypographyLarge } from "@/components/ui/typography";
import { paths } from "@/pages/paths";

export const OrganizationsPage: React.FC = () => {
  return (
    <>
      <HelmetWrapper title="Organizations" />
      <BreadcrumbsHeader
        breadcrumbs={[
          { label: "Settings", to: paths.Settings },
          {
            label: "Organizations",
            to: paths.SettingsOrganizations,
          },
        ]}
      />
      <Container>
        <div className="flex justify-between items-center mb-4">
          <TypographyLarge>Organizations</TypographyLarge>
          <Button>Create organization</Button>
        </div>
        <OrganizationsList />
      </Container>
    </>
  );
};

import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { SplitSection } from "@/components/common/SplitSection";
import { BreadcrumbsHeader } from "@/components/layout/breadcrumbs-header";
import { BasicOrganizationInformation } from "@/components/settings/BasicOrganizationInformation";
import { AlertError } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { TypographyLarge } from "@/components/ui/typography";
import { useOrganization } from "@/hooks/auth/useOrganization";

import { useParams } from "react-router";

export const OrganizationSettingsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: organization, error } = useOrganization(id!);

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
        {error && (
          <AlertError title="Error" className="my-8">
            {error?.message || "Failed to get organization"}
          </AlertError>
        )}
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

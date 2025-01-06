import React from "react";
import { Organization } from "../../../hooks/auth/auth";
import { useUpdateOrganizationMutation } from "@/hooks/auth/useUpdateOrganizationMutation";
import { ImageNameForm } from "@/components/forms/image-name-form";

interface BasicOrganizationInformationProps {
  organization: Organization;
}

export const BasicOrganizationInformation: React.FC<
  BasicOrganizationInformationProps
> = ({ organization }) => {
  const { error, isPending, mutate } = useUpdateOrganizationMutation();

  const handleSubmit = ({
    displayName,
  }: {
    displayName: string;
    image?: string | null;
  }) => {
    mutate({ name: displayName, slug: organization.slug });
  };

  return (
    <>
      <ImageNameForm
        error={error}
        defaultValues={{
          displayName: organization.name,
          image: organization.logo,
        }}
        isPending={isPending}
        onSubmit={handleSubmit}
        buttonLabel="Update organization"
      />
    </>
  );
};

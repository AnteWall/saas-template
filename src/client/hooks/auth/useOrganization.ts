import { useQuery } from "@tanstack/react-query";
import { organization } from "./auth";

export const OrganizationKey = "organization";

export function useOrganization(id: string) {
  const query = useQuery({
    queryKey: [OrganizationKey, id],
    queryFn: async () => {
      return (
        await organization.getFullOrganization({
          // @ts-expect-error -- this is a bug in the types
          organizationId: id,
        })
      ).data;
    },
  });
  return query;
}

import { useQuery } from "@tanstack/react-query";
import { organization } from "./auth";

export function useOrganization(id: string) {
  const query = useQuery({
    queryKey: ["organization", id],
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

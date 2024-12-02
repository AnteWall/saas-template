import { useQuery } from "@tanstack/react-query";
import { organization } from "./auth";

export function useListOrganizations() {
  const query = useQuery({
    queryKey: ["listOrganizations"],
    queryFn: async () => {
      return (await organization.list()).data;
    },
  });
  return query;
}

import { useQuery } from "@tanstack/react-query";
import { listAccounts } from "./auth";

export const ListAccountsKey = "listAccounts";

export function useListAccounts() {
  const query = useQuery({
    queryKey: [ListAccountsKey],
    queryFn: async () => {
      const res = await listAccounts();
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
  });
  return query;
}

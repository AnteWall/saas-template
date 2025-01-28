import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlinkAccount } from "./auth";
import { ListAccountsKey } from "./useListAccounts";

export function useUnlinkAccountMutation() {
  const queryClient = useQueryClient();
  const query = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ListAccountsKey],
      });
    },
    mutationFn: async (provider: string) => {
      const res = await unlinkAccount({
        providerId: provider,
      });
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
  });
  return query;
}

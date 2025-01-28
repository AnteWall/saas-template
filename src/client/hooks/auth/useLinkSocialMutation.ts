import { useMutation, useQueryClient } from "@tanstack/react-query";
import { linkSocial } from "./auth";
import { ListAccountsKey } from "./useListAccounts";

export function useLinkSocialMutation() {
  const queryClient = useQueryClient();
  const query = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ListAccountsKey],
      });
    },
    mutationFn: async (provider: "google") => {
      const res = await linkSocial({
        provider: provider,
      });
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
  });
  return query;
}

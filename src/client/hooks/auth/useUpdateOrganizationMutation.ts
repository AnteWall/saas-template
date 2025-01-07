import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organization } from "./auth";
import { OrganizationKey } from "./useOrganization";

export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient();
  const query = useMutation({
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [OrganizationKey, res.data?.id],
      });
    },
    mutationFn: async (data: { name: string; slug: string }) =>
      organization.update({
        data,
      }),
  });
  return query;
}

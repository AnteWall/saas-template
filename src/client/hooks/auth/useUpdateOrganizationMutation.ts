import { useMutation } from "@tanstack/react-query";
import { organization } from "./auth";

export function useUpdateOrganizationMutation() {
  const query = useMutation({
    mutationFn: async (data: { name: string; slug: string }) =>
      organization.update({
        data,
      }),
  });
  return query;
}

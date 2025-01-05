import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./auth";
import { UseSessionKey } from "./useSession";

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const query = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UseSessionKey] });
    },
    mutationFn: async ({ name }: { name: string }) =>
      updateUser({
        name,
      }),
  });
  return query;
}

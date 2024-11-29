import { useMutation } from "@tanstack/react-query";
import { revokeSession } from "../auth";

export function useRevokeSessionMutation() {
  const query = useMutation({
    mutationFn: async (token: string) =>
      revokeSession({
        token,
      }),
  });
  return query;
}

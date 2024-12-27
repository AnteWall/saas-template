import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "./auth";

export function useForgotPasswordMutation() {
  const query = useMutation({
    mutationFn: async (email: string) =>
      forgetPassword({
        email,
        redirectTo: "/reset-password",
      }),
  });
  return query;
}

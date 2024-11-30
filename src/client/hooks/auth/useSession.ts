import { useQuery } from "@tanstack/react-query";
import { getSession } from "./auth";

export const UseSessionKey = "useSession";

export function useSession() {
  const query = useQuery({
    queryKey: [UseSessionKey],
    queryFn: async () => getSession(),
  });
  return query;
}

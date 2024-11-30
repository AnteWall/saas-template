import { useQuery } from "@tanstack/react-query";
import { listSessions } from "./auth";

export function useListSessions() {
  const query = useQuery({
    queryKey: ["listSessions"],
    queryFn: async () => listSessions(),
  });
  return query;
}

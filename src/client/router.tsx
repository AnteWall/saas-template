import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { organization, useListOrganizations, useSession } from "./hooks/auth";
import { FullscreenLoader } from "./components/FullscreenLoader";
import { useEffect } from "react";

export interface MyRouterContext {
  auth: ReturnType<typeof useSession>["data"];
  authPending: ReturnType<typeof useSession>["isPending"];
  authError: ReturnType<typeof useSession>["error"];
}

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: null,
    authPending: true,
    authError: null,
  },
});

export const AuthRouter: React.FC = () => {
  const { data, isPending, error } = useSession();
  const { data: organizations } = useListOrganizations();

  useEffect(() => {
    const orgs = organizations || [];
    if (
      data &&
      data.session.activeOrganizationId == undefined &&
      orgs.length > 0
    ) {
      console.log("Setting active org", orgs[0].id);
      organization.setActive({
        organizationId: orgs[0].id,
      });
    }
  }, [data, organizations]);

  if (isPending) {
    return <FullscreenLoader />;
  }

  return (
    <RouterProvider
      router={router}
      context={{ auth: data, authPending: isPending, authError: error }}
    />
  );
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

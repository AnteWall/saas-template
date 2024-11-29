import { Button } from "@mantine/core";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppLayout } from "../components/layout/AppLayout";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ context, location }) => {
    console.log("context index", context);
    if (!context.authPending && context.auth == null) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function Index() {
  return (
    <AppLayout>
      <div className="p-2">
        <div className="p-2 flex gap-2">
          <Link href="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/signin" className="[&.active]:font-bold">
            Login
          </Link>
        </div>
        <hr />
        <h3>Welcome Home!</h3>
        <Button>Click me!</Button>
      </div>
    </AppLayout>
  );
}

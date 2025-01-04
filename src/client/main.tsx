import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { cssVariablesResolver, theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "./pages/AppRouter";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./hooks/auth/provider";
import { Notifications } from "@mantine/notifications";
import { HelmetProvider } from "react-helmet-async";
import { trpc } from "./hooks/trpc";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MantineProvider
          withCssVariables
          theme={theme}
          cssVariablesResolver={cssVariablesResolver}
          defaultColorScheme="auto"
        >
          <Notifications />
          <AuthProvider>
            <HelmetProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </HelmetProvider>
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>,
);

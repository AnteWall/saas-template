import { Routes, Route, Outlet } from "react-router";
import { Home } from "./Home";
import { AppLayout } from "../components/layout/AppLayout";
import { SignIn } from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { AuthenticatedWrapper } from "@/components/auth/AuthenticatedWrapper";
import { AuthRedirectWrapper } from "@/components/auth/AuthRedirectWrapper";
import { Settings } from "./settings/Index";
import { Security } from "./settings/Security";
import { paths, rawPath } from "./paths";
import { Error404 } from "./Error404";
import { OrganizationsPage } from "./settings/organizations/Organizations";
import { OrganizationSettingsPage } from "./settings/organizations/OrganizationSettingsPage";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthRedirectWrapper>
            <Outlet />
          </AuthRedirectWrapper>
        }
      >
        <Route path={paths.SignIn} element={<SignIn />} />
        <Route path={paths.SignUp} element={<SignUp />} />
      </Route>
      <Route
        element={
          <AuthenticatedWrapper>
            <AppLayout />
          </AuthenticatedWrapper>
        }
      >
        <Route index element={<Home />} />
        {/* Settings */}
        <Route index path={paths.Settings} element={<Settings />} />
        <Route path={paths.SettingsSecurity} element={<Security />} />
        <Route
          path={paths.SettingsOrganizations}
          element={<OrganizationsPage />}
        />
        <Route
          path={rawPath(paths.SettingsOrganization)}
          element={<OrganizationSettingsPage />}
        />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

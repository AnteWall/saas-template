export const paths = {
  Home: "/",
  SignIn: "/signin",
  SignUp: "/signup",
  ForgotPassword: "/forgot-password",
  Settings: "/settings/account",
  SettingsSecurity: "/settings/security",
  SettingsOrganizations: "/settings/organizations",
  SettingsOrganization: ({ id }: Record<string, string>): string =>
    replaceParams("/settings/organizations/:id", { id }),
};

const replaceParams = (path: string, params: Record<string, string>) => {
  let newPath = path;
  for (const key in params) {
    if (key && params[key]) {
      newPath = newPath.replace(`:${key}`, params[key]);
    }
  }
  return newPath;
};

export const rawPath = (
  path: (opts: Record<string, string>) => string
): string => {
  const p = path({});
  return p;
};

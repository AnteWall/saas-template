import { AuthLayoutWrapper } from "../../components/layout/AuthLayoutWrapper";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import React from "react";
import { LoginForm } from "@/pages/auth/components/login-form";

export const SignIn: React.FC = () => {
  return (
    <AuthLayoutWrapper>
      <HelmetWrapper title="Sign in" />
      <LoginForm />
    </AuthLayoutWrapper>
  );
};

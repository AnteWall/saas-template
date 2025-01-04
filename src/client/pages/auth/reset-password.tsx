import { AuthLayoutWrapper } from "../../components/layout/AuthLayoutWrapper";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import React from "react";
import { useSearchParams } from "react-router";
import { InvalidToken } from "./components/invalid-token";
import { ResetPasswordForm } from "./components/reset-password-form";

export const ResetPassword: React.FC = () => {
  const [params] = useSearchParams();

  const token = params.get("token");
  const error = params.get("error");

  return (
    <AuthLayoutWrapper>
      <HelmetWrapper title="Reset password" />
      {error && <InvalidToken error={error} />}
      {!!token && <ResetPasswordForm token={token} />}
    </AuthLayoutWrapper>
  );
};

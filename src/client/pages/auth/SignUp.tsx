import { AuthLayoutWrapper } from "../../components/layout/AuthLayoutWrapper";
import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { SignUpForm } from "./components/signup-form";

const SignUp: React.FC = () => {
  return (
    <>
      <HelmetWrapper title="Sign up" />
      <AuthLayoutWrapper>
        <SignUpForm />
      </AuthLayoutWrapper>
    </>
  );
};
export default SignUp;

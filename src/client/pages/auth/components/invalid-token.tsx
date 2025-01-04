import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/pages/paths";
import { Link } from "react-router";

interface InvalidTokenProps {
  className?: string;
  error?: string;
}

export const InvalidToken: React.FC<InvalidTokenProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Invalid token</CardTitle>
        <CardDescription>
          The token is invalid or has expired. Please request a new one.
        </CardDescription>
        <CardContent className="pt-4">
          <Link
            to={paths.ForgotPassword}
            className="underline underline-offset-4"
          >
            Request a new password
          </Link>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

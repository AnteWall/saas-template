import { AlertInfo } from "@/components/ui/alert";
import { LoaderButton } from "@/components/ui/button-loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/hooks/auth/auth";
import { cn } from "@/lib/utils";
import { paths } from "@/pages/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

interface ResetPasswordFormProps {
  className?: string;
  token: string;
}

const formSchema = z.object({
  newPassword: z.string().min(8),
});

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  className,
  token,
  ...props
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    resetPassword(
      {
        newPassword: values.newPassword,
        token: token,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          setIsSuccess(true);
        },
        onError: (error) => {
          form.setError("newPassword", {
            message: error.error.message || "An error occurred",
          });
          setIsLoading(false);
        },
      },
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(paths.SignIn);
    }, 3000);
    if (!isSuccess) {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <AlertInfo title="Password has been reset">
              <div className="text-sm">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </div>
              <div className="pt-2 text-sm">
                Redirecting you to the sign in page in a few seconds.
              </div>
              <div className="pt-2 text-sm">
                Click{" "}
                <Link
                  to={paths.SignIn}
                  className="underline underline-offset-4"
                >
                  here
                </Link>{" "}
                to sign in now.
              </div>
            </AlertInfo>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <LoaderButton
                      loading={isLoading}
                      type="submit"
                      className="w-full"
                    >
                      Reset password
                    </LoaderButton>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t need to reset your password?{" "}
                    <Link
                      to={paths.SignIn}
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

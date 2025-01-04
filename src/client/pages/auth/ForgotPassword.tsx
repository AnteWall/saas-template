import { HelmetWrapper } from "@/components/common/HelmetWrapper";
import { AuthLayoutWrapper } from "@/components/layout/AuthLayoutWrapper";
import { Stack } from "@mantine/core";
import { useForgotPasswordMutation } from "@/hooks/auth/useForgotPasswordMutation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderButton } from "@/components/ui/button-loader";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { paths } from "../paths";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { AlertInfo } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

export const ForgotPassword: React.FC = () => {
  const { mutate, error, isSuccess, isPending } = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values.email);
  };

  useEffect(() => {
    if (error) {
      form.setError("email", { message: error.message });
    }
  }, [error, form]);

  return (
    <AuthLayoutWrapper>
      <HelmetWrapper title="Forgot password" />
      <Card>
        <Stack>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <CardDescription>
              Enter your email address to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess && (
              <AlertInfo title="Password reset link has been sent">
                <div className="text-xs">
                  If the email is registered, you will receive a password reset
                  link shortly. If you don't receive an email, please check your
                  spam folder.
                </div>
              </AlertInfo>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <LoaderButton
                      loading={isPending}
                      type="submit"
                      disabled={isSuccess}
                      className="w-full"
                    >
                      Reset password
                    </LoaderButton>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t need to reset your password?{" "}
                    <Link
                      to={paths.SignUp}
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Stack>
      </Card>
    </AuthLayoutWrapper>
  );
};

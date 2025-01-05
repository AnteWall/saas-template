import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderButton } from "../ui/button-loader";
import { Input } from "../ui/input";
import { useSession } from "@/hooks/auth/useSession";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  email: z.string().email(),
});

export const AccountEmail: React.FC = () => {
  const { data, isFetching } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.data?.user?.email ?? "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.setValue("email", data.data.user.email);
    }
  }, [data, form]);

  if (isFetching) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="w-20 h-4 " />
        <Skeleton className="w-80 h-9" />
        <Skeleton className="w-32 h-9" />
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => console.log(values))}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-xs"
                    placeholder="me@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            type="submit"
            variant="secondary"
            disabled={!form.formState.isDirty}
            className="mt-4"
          >
            Change email
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
};

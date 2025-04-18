import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderButton } from "@/components/ui/button-loader";
import {
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/auth/useSession";
import { useUpdateUserMutation } from "@/hooks/auth/useUpdateUserMutation";
import { toInitials } from "@/utils/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  displayName: z.string().nonempty(),
});

export const AccountUserInfo: React.FC = () => {
  const { data, isFetching } = useSession();

  const { error, isPending, mutate } = useUpdateUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: data?.data?.user?.name ?? "",
    },
  });

  useEffect(() => {
    if (error) {
      form.setError("displayName", { message: error.message });
    }
  }, [error, form]);

  useEffect(() => {
    if (data?.data) {
      form.setValue("displayName", data.data.user.name);
    }
  }, [data, form]);

  if (isFetching) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex flex-col space-y-3">
          <Skeleton className="w-20 h-4 " />
          <Skeleton className="w-80 h-9" />
        </div>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ name: values.displayName });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <Avatar className="h-16 w-16">
                {data?.data?.user?.image && (
                  <AvatarImage
                    src={data?.data?.user.image}
                    alt={data?.data?.user.name}
                  />
                )}
                <AvatarFallback>
                  {toInitials(data?.data?.user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <LoaderButton
            variant="secondary"
            disabled={!form.formState.isDirty}
            loading={isPending}
            type="submit"
          >
            Change info
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};

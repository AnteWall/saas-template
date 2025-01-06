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
import { toInitials } from "@/utils/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  image: z.string().url().optional().nullable(),
  displayName: z.string().nonempty(),
});

export interface ImageNameFormProps {
  defaultValues?: z.infer<typeof formSchema>;
  error?: Error | null;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isFetching?: boolean;
  isPending?: boolean;
  buttonLabel?: string;
}

export const ImageNameForm: React.FC<ImageNameFormProps> = ({
  defaultValues,
  onSubmit,
  error,
  isFetching,
  isPending,
  buttonLabel = "Update",
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: defaultValues?.displayName ?? "",
    },
  });

  useEffect(() => {
    if (error) {
      form.setError("displayName", { message: error.message });
    }
  }, [error, form]);

  useEffect(() => {
    if (defaultValues) {
      form.resetField("displayName", {
        defaultValue: defaultValues.displayName,
      });
    }
  }, [defaultValues, form]);

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

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <Avatar className="h-16 w-16">
                {form.getValues("image") && (
                  <AvatarImage
                    src={form.getValues("image")!}
                    alt={form.getValues("displayName")}
                  />
                )}
                <AvatarFallback>
                  {toInitials(form.getValues("displayName"))}
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
            {buttonLabel}
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};

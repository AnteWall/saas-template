import { useListAccounts } from "@/hooks/auth/useListAccounts";
import { ProviderItem } from "./provider-item";
import { AlertError } from "@/components/ui/alert";
import { useUnlinkAccountMutation } from "@/hooks/auth/useUnlinkAccountMutation";
import { useLinkSocialMutation } from "@/hooks/auth/useLinkSocialMutation";

export const UserAccounts: React.FC = () => {
  const { data, error, isFetching } = useListAccounts();

  const { mutate: unlinkAccount, error: unlinkError } =
    useUnlinkAccountMutation();
  const { mutate: linkAccount, error: linkError } = useLinkSocialMutation();

  const isLinked = (provider: string) => {
    return (data ?? []).some((v) => v.provider === provider);
  };

  const onLink = (provider: string) => {
    linkAccount(provider as "google");
  };

  const onUnlink = (provider: string) => {
    unlinkAccount(provider);
  };
  const err = error ?? unlinkError ?? linkError;
  console.log(err);

  return (
    <div>
      {err && (
        <AlertError title="Error" className="mb-4">
          {err?.message ?? "An error occurred while fetching your accounts"}
        </AlertError>
      )}
      <ProviderItem
        loading={isFetching}
        provider="credential"
        linked={isLinked("credential")}
        onLink={onLink}
        disabled
        onUnlink={onUnlink}
      />
      <ProviderItem
        loading={isFetching}
        provider="google"
        linked={isLinked("google")}
        onLink={onLink}
        onUnlink={() => onUnlink("google")}
      />
    </div>
  );
};

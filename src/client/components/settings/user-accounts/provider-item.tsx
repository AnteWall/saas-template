import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { ReactElement } from "react";

type ProviderType = "google" | "credential";

export interface ProviderItemProps {
  provider: ProviderType;
  linked: boolean;
  loading?: boolean;
  onLink: (provider: string) => void;
  onUnlink: (provider: string) => void;
  disabled?: boolean;
}

const providerToIcon: Record<ProviderType, ReactElement> = {
  google: (
    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  ),
  credential: <Lock size={16} />,
};

const providerToName: Record<ProviderType, string> = {
  google: "Google",
  credential: "Email and Password",
};

export const ProviderItem: React.FC<ProviderItemProps> = ({
  provider,
  linked,
  loading,
  onLink,
  onUnlink,
  disabled,
}) => {
  if (loading) {
    return (
      <div className="flex justify-between items-center py-4 px-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>

          <span className="ml-2 animate-pulse bg-gray-200 rounded w-16 h-4"></span>
        </div>

        <div className="animate-pulse bg-gray-200 rounded w-16 h-8"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center">
        <div className="w-8 flex items-center justify-center">
          {providerToIcon[provider]}
        </div>

        <span className="ml-2">{providerToName[provider]}</span>
      </div>

      <Button
        variant={linked ? "destructive" : "secondary"}
        disabled={disabled}
        onClick={() => (linked ? onUnlink(provider) : onLink(provider))}
      >
        {linked ? "Unlink" : "Link"}
      </Button>
    </div>
  );
};

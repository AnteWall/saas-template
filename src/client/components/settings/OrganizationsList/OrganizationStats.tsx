import { P } from "@/components/ui/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toInitials } from "@/utils/string";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/hooks/trpc";
import { Link } from "react-router";
import { paths } from "@/pages/paths";

export const OrganizationStats: React.FC<{
  orgnaizationName: string;
  organizationId: string;
  logo?: string | null;
}> = ({ logo, organizationId, orgnaizationName }) => {
  const { data, isPending } =
    trpc.organizations.getOrganizationMembers.useQuery({
      organizationId,
    });

  return (
    <Link to={paths.SettingsOrganization({ id: organizationId })}>
      <div className="flex py-2 items-center space-x-4 px-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8 rounded-lg">
            {logo && <AvatarImage src={logo} alt={orgnaizationName} />}
            <AvatarFallback className="rounded-lg">
              {toInitials(orgnaizationName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1 text-sm capitalize truncate">
            <P className="font-bold text-sm">{orgnaizationName}</P>
            {isPending ? (
              <Skeleton className="h-4" />
            ) : (
              <P className="text-muted-foreground text-xs">
                {data?.members.length ?? "Unknown number of"} members
              </P>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

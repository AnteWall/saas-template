import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/auth/useSession";
import { paths } from "@/pages/paths";
import { useLocation } from "react-router";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: paths.Home,
      icon: SquareTerminal,
      items: [
        {
          title: "Home",
          url: paths.Home,
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: paths.Settings,
        },
        {
          title: "Security",
          url: paths.SettingsSecurity,
        },
        {
          title: "Organizations",
          url: paths.SettingsOrganizations,
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: sessionData } = useSession();

  const location = useLocation();

  const isMatchedRoute = (item: {
    url: string;
    items?: { url: string }[];
  }): boolean => {
    if (item.url === "/") {
      return location.pathname === "/";
    }
    const match = location.pathname.includes(item.url);
    return (
      match || (item.items ?? []).some((subItem) => isMatchedRoute(subItem))
    );
  };

  const items = data.navMain.map((item) => {
    return {
      title: item.title,
      url: item.url,
      icon: item.icon,
      isActive: isMatchedRoute(item),
      items: item.items,
    };
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="" items={items} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {sessionData?.data?.user && <NavUser user={sessionData.data.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

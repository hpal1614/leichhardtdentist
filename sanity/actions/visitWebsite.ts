import { LaunchIcon } from "@sanity/icons";

export function VisitWebsiteAction() {
  return {
    label: "Visit website",
    icon: LaunchIcon,
    onHandle: () => {
      window.open("https://leichhardtdental.com.au", "_blank", "noopener,noreferrer");
    },
  };
}

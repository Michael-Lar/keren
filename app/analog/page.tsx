import { siteConfig } from "@/content/portfolio.config";
import GroupPageContent from "@/components/GroupPageContent";

export const metadata = {
  title: `Analog — ${siteConfig.name}`,
};

export default function AnalogPage() {
  const group = siteConfig.groups.find((g) => g.id === "analog")!;
  return <GroupPageContent group={group} />;
}

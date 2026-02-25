import { siteConfig } from "@/content/portfolio.config";
import GroupPageContent from "@/components/GroupPageContent";

export const metadata = {
  title: `Digital — ${siteConfig.name}`,
};

export default function DigitalPage() {
  const group = siteConfig.groups.find((g) => g.id === "digital")!;
  return <GroupPageContent group={group} />;
}

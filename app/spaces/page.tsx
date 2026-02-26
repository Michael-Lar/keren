import { siteConfig } from "@/content/portfolio.config";
import SpacesPageContent from "@/components/SpacesPageContent";

export const metadata = {
  title: `Spaces — ${siteConfig.name}`,
};

export default function SpacesPage() {
  return <SpacesPageContent />;
}

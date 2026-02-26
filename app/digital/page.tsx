import { siteConfig } from "@/content/portfolio.config";
import DigitalPageContent from "@/components/DigitalPageContent";

export const metadata = {
  title: `Digital — ${siteConfig.name}`,
};

export default function DigitalPage() {
  return <DigitalPageContent />;
}

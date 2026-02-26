import { siteConfig } from "@/content/portfolio.config";
import AnalogPageContent from "@/components/AnalogPageContent";

export const metadata = {
  title: `Analog — ${siteConfig.name}`,
};

export default function AnalogPage() {
  return <AnalogPageContent />;
}

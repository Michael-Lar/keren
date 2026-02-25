import { notFound } from "next/navigation";
import { siteConfig, getShootById, getGroupForShoot } from "@/content/portfolio.config";
import ShootPageClient from "./ShootPageClient";

interface Props {
  params: { shootId: string };
}

/**
 * Shoot Page — /shoot/[shootId]
 *
 * Photo grid for one shoot. Click photo → lightbox with thumbnail strip.
 */
export async function generateStaticParams() {
  return siteConfig.groups.flatMap((g) =>
    g.shoots.map((s) => ({ shootId: s.id }))
  );
}

export async function generateMetadata({ params }: Props) {
  const shoot = getShootById(params.shootId);
  const group = getGroupForShoot(params.shootId);
  if (!shoot || !group) return {};
  return {
    title: `${shoot.title} — ${group.title} — ${siteConfig.name}`,
  };
}

export default function ShootPage({ params }: Props) {
  const shoot = getShootById(params.shootId);
  const group = getGroupForShoot(params.shootId);
  if (!shoot || !group) notFound();

  return <ShootPageClient group={group} shoot={shoot} />;
}

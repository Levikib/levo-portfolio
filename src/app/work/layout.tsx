import { ROUTE_META } from "@/lib/seo-routes";

export const metadata = ROUTE_META.work;

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

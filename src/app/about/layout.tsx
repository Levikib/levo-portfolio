import { ROUTE_META } from "@/lib/seo-routes";

export const metadata = ROUTE_META.about;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

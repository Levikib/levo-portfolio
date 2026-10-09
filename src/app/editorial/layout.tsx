import { ROUTE_META } from "@/lib/seo-routes";

export const metadata = ROUTE_META.editorial;

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

import { notFound } from "next/navigation";
import { Navigation } from "@/components/portfolio/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "de" }];
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden font-sans">
      <Navigation dict={dict} />
      {children}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui";
import { OutlineButton } from "@/components/ui/outline-button";

export default async function PortfolioPage() {
  return (
    <div className="flex">
      <a
        href="#projects"
        className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover-lift transition-all duration-500"
      >
        {"View Projects"}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
      <PrimaryButton
        title="View Projects"
        rightIcon={<ArrowRight className="w-5 h-5" />}
      />

      <OutlineButton title="Get in Touch" />

      {/* <a
        href="#contact"
        className="px-8 py-4 border-2 border-foreground/20 text-foreground font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300"
      >
        {"Get in Touch"}
      </a> */}
    </div>
  );
}

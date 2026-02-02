import type { DictType } from "@/app/[lang]/dictionaries";

type Props = {
  dict: DictType;
};

export const Navigation = ({ dict }: Props) => {
  return (
    <div className="px-10 py-6 flex items-center justify-between">
      <p>{dict.portfolio.navigation.name}</p>
    </div>
  );
};

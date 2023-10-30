import Image from "next/image";
import { Logo } from "~/components/common/special/logo";
import { ArrowUpRight } from "lucide-react";

export const ImageSection = () => {
  return (
    <div className="relative h-80 overflow-hidden rounded-xl rounded-tl-[4rem] bg-slate-950 md:min-h-[50vh]">
      <div className="absolute left-8 top-4 z-10">
        <Logo withText />
      </div>

      <Image
        src="/images/waves-abstract.webp"
        alt="Kolorowe i białe fale na czarnym tle"
        fill
        className="scale-105 bg-white object-cover opacity-50"
      />

      <div className="absolute right-2 top-4 z-10">
        <ArrowUpRight className="rotate-0 text-6xl text-indigo-200" />
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-slate-950/90 to-slate-950/0 p-8">
        <h2 className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl">
          Przyszłość jest dziś,
          <br />
          na wyciągnięcie ręki.
        </h2>
        <p className="mb-6 max-w-md text-sm text-slate-300">
          Dołącz i olśnij innych swoją wizytówką.
        </p>
      </div>
    </div>
  );
};

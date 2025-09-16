"use client";
import dynamic from "next/dynamic";
import { ActionsButtonsFilm } from "@/components/Shared/ActionsButtonsFilm";
import { InfoExtraFilmProps as BaseProps } from "./InfoExtraFilm.types";
import { ChaptersInfo } from "@/components/Shared/ChaptersInfo";
import { FilmGenres } from "@/components/Shared/FilmGenres";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// Extiende el tipo para aceptar isLast opcional
type InfoExtraFilmProps = BaseProps & { isLast?: boolean };

export function InfoExtraFilm(props: InfoExtraFilmProps) {
  const { movie, isLast } = props;

  return (
    <div
      className={
        // scale reducido (125) y origin-top por defecto. Si es la última, usamos origin-top-right.
        `opacity-0 absolute top-0 left-0 right-0 transition-all duration-300 z-10
         invisible sm:visible delay-300 w-full bg-zinc-900 rounded-lg scale-100 
         ${isLast ? "origin-top-right" : "origin-top"}
         group-hover:scale-125 group-hover:-translate-y-[5vw] group-hover:opacity-100`
      }
    >
      <div className="aspect-video overflow-hidden">
        <ReactPlayer
          url={movie.trailerVideo}
          playing
          muted
          loop
          controls={false}
          width="100%"
          height="100%"
          style={{ display: "block", objectFit: "cover" }}
        />
      </div>

      <div className="p-4 shadow-lg">
        <ActionsButtonsFilm idFilm={movie.id} />
        <ChaptersInfo age={movie.age} duration={movie.duration} />
        <FilmGenres genres={movie.genre}/>
      </div>
    </div>
  );
}

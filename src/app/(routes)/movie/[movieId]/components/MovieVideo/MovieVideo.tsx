"use client";
import { MovieVideoProps } from "./MovieVideo.types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function MovieVideo(props: MovieVideoProps) {
  const { currentMovie } = props;
  return (
    <ReactPlayer
      url={currentMovie}
      playing={true}
      muted={true}
      loop
      controls={false}
      width="100%"
      height="100%" />
  );
}

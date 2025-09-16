import { redirect } from "next/navigation";

import { db } from "@/lib/db";



import { Navbar } from "@/components/Shared/Navbar";
import { auth } from "../../auth";
import { SliderVideo } from "./(routes)/(home)/components/SliderVideo/SliderVideo";
import { TrendingMovies } from "@/components/TrendingMovies";
import { ListMovies } from "./(routes)/(home)/components/ListMovies";




export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }

  const usersNetflix = await db.userNetflix.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const movies = await db.movie.findMany();
  const trendingMovies = await db.popularMovie.findMany({
    orderBy: { ranking: "asc" },
  });

  return (
    <div className="relative bg-zinc-900">
      <Navbar users={usersNetflix} />
      <SliderVideo />
      <TrendingMovies movies={trendingMovies} />
      <ListMovies movies={movies} />
      
    </div>
  );
}
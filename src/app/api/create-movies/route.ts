import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { movies } = await req.json();
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return NextResponse.json(
      { message: "No movies provided" },
      { status: 400 }
    );
  }

  try {
    const createdMovies = await Promise.all(
      movies.map(async (movie) => {
        const {
          id,
          title,
          movieVideo,
          trailerVideo,
          thumbnailUrl,
          genre,
          duration,
          age,
        } = movie;
        if (
          !title ||
          !movieVideo ||
          !trailerVideo ||
          !thumbnailUrl ||
          !genre ||
          !duration ||
          !age
        ) {
          throw new Error(`Invalid movie data: ${title}`);
        }
        return await db.movie.create({
          data: {
            id,
            title,
            thumbnailUrl,
            genre,
            duration,
            age,
            trailerVideo,
            movieVideo,
            createdAt: new Date(),
          },
        });
      })
    );
    return NextResponse.json(createdMovies, { status: 201 });
  } catch (error) {
  console.log(error);
  return NextResponse.json(
    { message: "Error creating movies" },
    { status: 500 }
  );
}
}

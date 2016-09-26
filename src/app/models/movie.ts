import { OmdbType } from '../services/omdb.service';

export interface Movie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: OmdbType;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  tomatoConsesus: string;
  tomatoFresh: string;
  tomatoImage: string;
  tomatoMeter: string;
  tomatoRating: string;
  tomatoReviews: string;
  tomatoRotten: string;
  tomatoURL: string;
  tomatoUserMeter: string;
  tomatoUserRating: string;
  tomatoUserReviews: string;
}


import { OmdbType } from '../services/omdb.service';

export interface SearchResult {
  Poster: string;
  Title: string;
  Type: OmdbType,
  Year: string;
  imdbID: string;
}

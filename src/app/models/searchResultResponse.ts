import { SearchResult } from './searchResult';

export interface SearchResultResponse {
  Response: 'True' | 'False';
  Search: SearchResult[];
  totalResults: number;
}

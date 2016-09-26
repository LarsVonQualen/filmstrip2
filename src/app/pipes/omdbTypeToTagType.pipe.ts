import { Pipe, PipeTransform } from '@angular/core';
import { OmdbType } from '../services/omdb.service';

@Pipe({name: 'omdbTypeToTagType'})
export class OmdbTypeToTagType implements PipeTransform {
  transform(value: OmdbType, exponent: string): string {
    switch (value) {
      case 'movie':
        return 'tag-primary';
      case 'series':
        return 'tag-success';
      case 'episode':
        return 'tag-warning';
      case 'game':
        return 'tag-info';
      default:
        return 'tag-default';
    }
  }
}

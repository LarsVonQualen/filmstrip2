import { OmdbService } from './omdb.service';
export { OmdbService } from './omdb.service';

import { UserService } from './user.service';
export { UserService } from './user.service';

import { CollectionService } from './collection.service';
export { CollectionService } from './collection.service';

import { VoteService } from './vote.service';
export { VoteService } from './vote.service';

export default [
  OmdbService,
  UserService,
  CollectionService,
  VoteService
];

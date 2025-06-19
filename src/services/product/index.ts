import { VoteParamsType } from '_types/Breed';
import * as endpoints from 'services/product/endpoints';
import * as api from 'utils/axios';

export const getBreed = (limit: number, page: number) =>
  api.sendGet(`${endpoints.GET_BREED}?limit=${limit}&page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'live_o2yCePThTZADbqcXQicu8vXr93IziAjHxA9LOSGxuKsz1AujowNIg9NAWTkNxjo8',
      accept: 'application/json',
    },
    data: {},
  });

export const getRandomBreed = () =>
  api.sendGet(endpoints.GET_RANDOM_BREED, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'live_o2yCePThTZADbqcXQicu8vXr93IziAjHxA9LOSGxuKsz1AujowNIg9NAWTkNxjo8',
      accept: 'application/json',
    },
    data: {},
  });

export const voteImageById = (params: VoteParamsType) =>
  api.sendPost(endpoints.VOTE_BREED, params, {
    headers: {
      'x-api-key': 'live_o2yCePThTZADbqcXQicu8vXr93IziAjHxA9LOSGxuKsz1AujowNIg9NAWTkNxjo8',
    },
  });

  export const getBreedByImagesId = (id: string) =>
  api.sendGet(`${endpoints.GET_BREED_BY_IMAGE_ID}/${id}/breeds`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'live_o2yCePThTZADbqcXQicu8vXr93IziAjHxA9LOSGxuKsz1AujowNIg9NAWTkNxjo8',
      accept: 'application/json',
    },
    data: {},
  });
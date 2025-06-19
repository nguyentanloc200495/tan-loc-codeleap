export type BreedStateType = {
  isLoading: boolean;
  error: Error | string | null;
  breed: BreedType[] | null;
  nextBreed: BreedType[] | null;

}


export type BreedType = {
  url: string;
  id: string,
  breeds: any[];
};
export type VoteParamsType = {
  image_id: string;
  sub_id: string;
  value: number | any;
};


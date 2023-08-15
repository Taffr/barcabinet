import { append, equals, includes, reject } from 'ramda';

export type CabinetEntry = number;

export type CabinetFetchedAction = {
  type: 'cabinet/cabinetFetched';
  payload: CabinetEntry[];
};

export type CabinetEntryAddedAction = {
  type: 'cabinet/cabinetEntryAdded';
  payload: CabinetEntry;
};

export type CabinetEntryRemovedAction = {
  type: 'cabinet/cabinetEntryRemoved';
  payload: CabinetEntry;
};

export type CabinetAction =
  | CabinetFetchedAction
  | CabinetEntryAddedAction
  | CabinetEntryRemovedAction;

export const cabinetReducer = (
  state: CabinetEntry[] = [],
  action: CabinetAction,
) => {
  switch (action.type) {
    case 'cabinet/cabinetFetched': {
      return action.payload;
    }
    case 'cabinet/cabinetEntryAdded': {
      const currentFavourites = state;
      const alreadyInFavourites = includes(action.payload, currentFavourites);
      const withAdded = alreadyInFavourites
        ? currentFavourites
        : append(action.payload, currentFavourites);
      return withAdded;
    }
    case 'cabinet/cabinetEntryRemoved':
      return reject(equals(action.payload), state);
    default:
      return state;
  }
};

import { Maybe } from './Maybe';
import { compose, head } from 'ramda';

export const getSafeFirst = compose(Maybe.of, head);

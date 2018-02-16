import {
    ImmutableMap,
    ImmutableMapUndef,
    ImmutableRecord
} from './index';

export type Immutables =
    ImmutableRecord<any>
    | ImmutableMap<any, any>
    | ImmutableMapUndef<any, any>
    | string
    | number
    | boolean
    | null
    | undefined;

export type RecordImmutables = Record<any, Immutables>;

export type PartialReadonly<T> = {
    readonly [P in keyof T]?: T[P];
    };
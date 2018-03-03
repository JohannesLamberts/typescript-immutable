import { Immutable } from './immutable';

export class ImmutableArray<TValue> extends Immutable {

    private _data: TValue[] = [];

    get length() {
        return this._data.length;
    }

    constructor(data?: TValue[]) {
        super();
        if (data) {
            this._data = data.slice();
        }
    }

    get(key: number): TValue {
        return this._data[key];
    }

    set(key: number,
        value: TValue): ImmutableArray<TValue> {
        return this.withMutations(arr => arr[key] = value);
    }

    push(...values: TValue[]): ImmutableArray<TValue> {
        return this.withMutations(arr => arr.push(...values));
    }

    update(key: number,
           cb: (currVal: TValue) => TValue): ImmutableArray<TValue> {
        return this.set(key, cb(this.get(key)));
    }

    filter(cb: (val: TValue, index: number, arr: TValue[]) => boolean): ImmutableArray<TValue> {
        return this._replace(arr => arr.filter(cb));
    }

    map(cb: (currVal: TValue, index: number, arr: TValue[]) => TValue): ImmutableArray<TValue> {
        return this._replace(arr => arr.map(cb));
    }

    withMutations(cb: (currData: TValue[]) => void): ImmutableArray<TValue> {
        const clone = this._clone();
        cb(clone._data);
        return clone;
    }

    remove(...keys: number[]): ImmutableArray<TValue> {
        return this._replace(arr => arr.filter((val, index) => keys.indexOf(index) === -1));
    }

    indexOf(value: TValue): number {
        return this._data.indexOf(value);
    }

    indexOfFn(cb: (val: TValue) => boolean): number {
        for (let i = 0; i < this.length; i++) {
            if (cb(this._data[i])) {
                return i;
            }
        }
        return -1;
    }

    slice(): TValue[] {
        return this._data.slice();
    }

    private _replace(cb: (currData: TValue[]) => TValue[]): ImmutableArray<TValue> {
        const clone = this._clone();
        clone._data = cb(clone._data.slice());
        return clone;
    }

    private _clone(): ImmutableArray<TValue> {
        return new ImmutableArray<TValue>(this._data.slice());
    }
}

export default ImmutableArray;
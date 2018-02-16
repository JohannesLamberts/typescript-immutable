import { Immutables } from './types';

class IMap<TKeys extends string, TInterface extends Immutables> {

    private _data: Partial<Record<TKeys, TInterface>> = {};
    private _d = new Map();

    constructor(private _nv: TInterface) {
    }

    get(key: TKeys): TInterface {
        return (this._data[key] as TInterface) || this._nv;
    }

    set(key: TKeys, value: TInterface): IMap<TKeys, TInterface> {
        const partial: Partial<Record<TKeys, TInterface>> = {};
        partial[key] = value;
        return this.setMany(partial);
    }

    setMany(keyValues: Partial<Record<TKeys, TInterface>>): IMap<TKeys, TInterface> {
        return this._clone(keyValues);
    }

    update(key: TKeys,
           cb: (currVal: TInterface) => TInterface): IMap<TKeys, TInterface> {
        return this.set(key, cb(this.get(key)));
    }

    clear() {
        const clone = this._clone();
        clone._data = {};
        return clone;
    }

    toArray(): TInterface[] {
        return Object.keys(this._data)
                     .map((key: TKeys) => this._data[key] as TInterface);
    }

    private _clone(update: Partial<Record<TKeys, TInterface>> = {}): IMap<TKeys, TInterface> {
        const rec = new IMap<TKeys, TInterface>(this._nv as any);
        rec._data = Object.assign({}, this._data, update);
        return rec;
    }
}

export default IMap;
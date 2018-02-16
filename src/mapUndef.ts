import { RecordImmutables } from './types';

class IMapUndef<TKeys extends string, TInterface extends RecordImmutables> {

    private _data: Partial<Record<TKeys, TInterface>> = {};

    get(key: TKeys): TInterface | undefined {
        return this._data[key];
    }

    set(key: TKeys,
        value: TInterface): IMapUndef<TKeys, TInterface> {
        const partial: Partial<Record<TKeys, TInterface>> = {};
        partial[key] = value;
        return this.setMany(partial);
    }

    setMany(keyValues: Partial<Record<TKeys, TInterface>>): IMapUndef<TKeys, TInterface> {
        return this._clone(keyValues);
    }

    update(key: TKeys,
           cb: (currVal: TInterface | undefined) => TInterface): IMapUndef<TKeys, TInterface> {
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

    private _clone(update: Partial<Record<TKeys, TInterface>> = {}): IMapUndef<TKeys, TInterface> {
        const rec = new IMapUndef<TKeys, TInterface>();
        rec._data = Object.assign({}, this._data, update);
        return rec;
    }
}

export default IMapUndef;
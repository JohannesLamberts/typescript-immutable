import { Immutable } from './immutable';

export abstract class ImmutableMapAbstract<TKeys extends string,
    TInterface,
    TThis extends ImmutableMapAbstract<TKeys, TInterface, TThis>> extends Immutable {

    protected _data: Partial<Record<TKeys, TInterface>> = {};

    get(key: TKeys): TInterface | undefined {
        return this._data[key];
    }

    remove(keys: TKeys[]) {
        const clone = this._clone();
        for (const key of keys) {
            delete clone._data[key];
        }
        return clone;
    }

    set(key: TKeys,
        value: TInterface): TThis {
        const partial: Partial<Record<TKeys, TInterface>> = {};
        partial[key] = value;
        return this.setMany(partial);
    }

    setMany(keyValues: Partial<Record<TKeys, TInterface>>): TThis {
        return this._clone(keyValues);
    }

    update(key: TKeys,
           cb: (currVal: TInterface | undefined) => TInterface): TThis {
        return this.set(key, cb(this.get(key)));
    }

    map(cb: (currVal: TInterface, key: TKeys) => TInterface): TThis {
        const newData: Partial<Record<TKeys, TInterface>> = {} = {};
        for (const key of Object.keys(this._data) as TKeys[]) {
            newData[key] = cb(this._data[key] as TInterface, key);
        }
        return this.setMany(newData);
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

    protected abstract _clone(update?: Partial<Record<TKeys, TInterface>>): TThis;
}
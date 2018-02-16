import { RecordImmutables } from './types';

class IRecord<TInterface extends RecordImmutables> {

    private _data: Readonly<TInterface>;

    constructor(private _initial: TInterface) {
        this._data = this._initial;
    }

    get<TKey extends keyof TInterface>(key: TKey): TInterface[TKey] {
        return this._data[key];
    }

    set<TKey extends keyof TInterface>(key: TKey,
                                       value: TInterface[TKey]): IRecord<TInterface> {
        const partial: Partial<TInterface> = {};
        partial[key] = value;
        return this._clone(partial);
    }

    update<TKey extends keyof TInterface>
    (key: TKey,
     cb: (currVal: TInterface[TKey]) => TInterface[TKey]): IRecord<TInterface> {

        return this.set(key, cb(this.get(key)));
    }

    withMutations(cb: (currData: TInterface) => void): IRecord<TInterface> {
        const clone = this._clone();
        cb(clone._data);
        return clone;
    }

    replace(data: TInterface) {
        return this._clone(data);
    }

    private _clone(update: Partial<TInterface> = {}): IRecord<TInterface> {
        const rec = new IRecord<TInterface>(this._initial);
        rec._data = Object.assign({}, this._data, update);
        return rec;
    }
}

export default IRecord;
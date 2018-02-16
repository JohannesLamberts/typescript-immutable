import { Immutable } from './immutable';

export class ImmutableRecord<TInterface> extends Immutable {

    private _data: Readonly<TInterface>;

    constructor(private _initial: TInterface) {
        super();
        this._data = this._initial;
    }

    get<TKey extends keyof TInterface>(key: TKey): TInterface[TKey] {
        return this._data[key];
    }

    set<TKey extends keyof TInterface>(key: TKey,
                                       value: TInterface[TKey]): ImmutableRecord<TInterface> {
        const partial: Partial<TInterface> = {};
        partial[key] = value;
        return this._clone(partial);
    }

    update<TKey extends keyof TInterface>
    (key: TKey,
     cb: (currVal: TInterface[TKey]) => TInterface[TKey]): ImmutableRecord<TInterface> {

        return this.set(key, cb(this.get(key)));
    }

    withMutations(cb: (currData: TInterface) => void): ImmutableRecord<TInterface> {
        const clone = this._clone();
        cb(clone._data);
        return clone;
    }

    replace(data: TInterface) {
        return this._clone(data);
    }

    private _clone(update: Partial<TInterface> = {}): ImmutableRecord<TInterface> {
        const rec = new ImmutableRecord<TInterface>(this._initial);
        rec._data = Object.assign({}, this._data, update);
        return rec;
    }
}

export default ImmutableRecord;
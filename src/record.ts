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
        return this.withMutations(currData => currData[key] = value);
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
        const rec = new ImmutableRecord<TInterface>(this._initial);
        rec._data = data;
        return rec;
    }

    shallow() {
        return Object.assign({}, this._data);
    }

    private _clone(): ImmutableRecord<TInterface> {
        const rec = new ImmutableRecord<TInterface>(this._initial);
        rec._data = this.shallow();
        return rec;
    }
}

export default ImmutableRecord;
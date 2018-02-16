import { ImmutableMapAbstract } from './map';

export class ImmutableMap<TKeys extends string, TInterface>
    extends ImmutableMapAbstract<TKeys, TInterface, ImmutableMap<TKeys, TInterface>> {

    constructor(private _nv: TInterface) {
        super();
    }

    get(key: TKeys): TInterface {
        return super.get(key) || this._nv;
    }

    update(key: TKeys,
           cb: (currVal: TInterface) => TInterface): ImmutableMap<TKeys, TInterface> {
        return this.set(key, cb(this.get(key)));
    }

    protected _clone(update: Partial<Record<TKeys, TInterface>> = {}): ImmutableMap<TKeys, TInterface> {
        const rec = new ImmutableMap<TKeys, TInterface>(this._nv as any);
        rec._data = Object.assign({}, this._data, update);
        return rec;
    }
}
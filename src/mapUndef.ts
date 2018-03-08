import { ImmutableMapBase } from './map';

export class ImmutableMapUndef<TKeys extends string, TInterface>
    extends ImmutableMapBase<TKeys, TInterface, ImmutableMapUndef<TKeys, TInterface>> {

    protected _clone(update: Partial<Record<TKeys, TInterface>> = {}): ImmutableMapUndef<TKeys, TInterface> {
        const rec = new ImmutableMapUndef<TKeys, TInterface>();
        rec._data = Object.assign({}, this._data, update);
        return rec;
    }
}
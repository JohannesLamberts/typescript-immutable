import { expect }       from 'chai';
import 'mocha';
import { ImmutableMap } from './mapDef';

// the base class is tested in mapUnded.test.ts

const NV = {
    string: 'Text',
    number: 1,
    boolean: true
};

const Value: typeof NV = {
    string: 'abc',
    number: 10,
    boolean: false
};

describe('MapWithoutBase', function () {
    describe('get', function () {
        it('should return the NV, if the key doesn`t exist', function () {
            let Rec = new ImmutableMap(NV);
            Rec = Rec.set('keyExists', Value);
            expect(Rec.get('keyExists')).to.eql(Value);
            expect(Rec.get('keyDoesNotExist')).to.eql(NV);
        });
    });
    describe('update', function () {
        it('should provide the NV as current value in callback', function () {
            let Rec = new ImmutableMap(NV);
            Rec = Rec.update('keyExists', val => val);
            Rec = Rec.update('keyExistsWithValue', val => Value);
            expect(Rec.get('keyExists')).to.eql(NV);
            expect(Rec.get('keyExistsWithValue')).to.eql(Value);
        });
    });
});

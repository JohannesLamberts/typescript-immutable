import { expect }            from 'chai';
import 'mocha';
import { ImmutableMapUndef } from './mapUndef';

// the base class is tested in mapUnded.test.ts

type ValueType = string;

const ValueA = 'abc';
const ValueB = 'def';

describe('MapDefWithBase', function () {

    describe('get', function () {
        it('should return undefined, if the key doesn`t exist', function () {
            let Map = new ImmutableMapUndef<string, ValueType>();
            Map = Map.set('keyExists', ValueA);
            expect(Map.get('keyExists')).to.eql(ValueA);
            expect(Map.get('keyDoesNotExist')).to.equal(undefined);
        });
    });

    describe('array', function () {
        let Map = new ImmutableMapUndef<string, ValueType>()
            .setMany({
                         a: ValueA,
                         b: ValueB,
                         c: ValueB,
                         d: ValueA
                     });
        it('should return an array of all elements', function () {
            expect(Map.toArray()).to.eql([ValueA, ValueB, ValueB, ValueA]);
        });
    });

    describe('shallow', function () {
        it('should return an independent shallow clone', function () {
            let Map = new ImmutableMapUndef<string, ValueType>()
                .set('keyExists', ValueA);
            const shallowA = Map.shallow();
            const shallowB = Map.shallow();
            expect(shallowA).not.to.equal(shallowB);
            expect(shallowA).to.eql(shallowB);
            expect(shallowA).to.eql(
                {
                    keyExists: ValueA
                });
        });
    });

    describe('set', function () {
        let Map = new ImmutableMapUndef<string, ValueType>()
            .set('a', ValueA);
        let MapAfter = Map.set('b', ValueB);
        it('should return an independent copy', function () {
            expect(MapAfter).not.to.equal(Map);
            expect(MapAfter).to.be.instanceOf(ImmutableMapUndef);
            expect(Map.shallow()).to.eql(
                {
                    a: ValueA
                });
        });
        it('should save the new value', function () {
            expect(MapAfter.shallow()).to.eql(
                {
                    a: ValueA,
                    b: ValueB
                });
        });
    });

    describe('setMany', function () {
        let Map = new ImmutableMapUndef<string, ValueType>();
        let MapAfter = Map.setMany(
            {
                a: ValueA,
                b: ValueB
            });
        it('should return an independent copy', function () {
            expect(MapAfter).not.to.equal(Map);
            expect(MapAfter).to.be.instanceOf(ImmutableMapUndef);
            expect(Map.shallow()).to.eql({});
        });
        it('should save the new values', function () {
            expect(MapAfter.shallow()).to.eql(
                {
                    a: ValueA,
                    b: ValueB
                });
        });
    });

    describe('remove', function () {
        let Map = new ImmutableMapUndef<string, ValueType>()
            .setMany({
                         a: ValueA,
                         b: ValueB,
                         c: ValueB,
                         d: ValueA
                     });
        let MapAfter = Map.remove('b', 'd');
        it('should return an independent copy', function () {
            expect(MapAfter).not.to.equal(Map);
            expect(MapAfter).to.be.instanceOf(ImmutableMapUndef);
            expect(Map.shallow()).to.eql(
                {
                    a: ValueA,
                    b: ValueB,
                    c: ValueB,
                    d: ValueA
                });
        });
        it('should remove all given keys', function () {
            expect(MapAfter.shallow()).to.eql(
                {
                    a: ValueA,
                    c: ValueB
                });
        });
    });

    describe('update', function () {
        let Map = new ImmutableMapUndef<string, ValueType>();
        it('should provide undefined as current value in callback', function () {
            Map.update('keyExists', val => {
                expect(val).to.equal(undefined);
                return Object.assign({}, ValueA);
            });
        });
        it('should store the callback-return for the given key', function () {
            expect(
                Map.update('keyExistsWithValue', val => ValueA)
                   .get('keyExistsWithValue')).to.eql(ValueA);
        });
    });

    describe('map', function () {
        let Map = new ImmutableMapUndef<string, ValueType>()
            .setMany({
                         a: ValueA,
                         b: ValueB
                     });
        let MapAfter = Map.map((val, key, i) => {
            return key === 'b'
                ? ValueA
                : ValueB;
        });
        it('should return an independent copy', function () {
            expect(MapAfter).not.to.equal(Map);
            expect(MapAfter).to.be.instanceOf(ImmutableMapUndef);
            expect(Map.shallow()).to.eql(
                {
                    a: ValueA,
                    b: ValueB
                });
        });
        it('should store the callback-returns', function () {
            expect(MapAfter.shallow()).to.eql(
                {
                    a: ValueB,
                    b: ValueA
                });
        });
    });

    describe('clear', function () {
        let Map = new ImmutableMapUndef<string, ValueType>()
            .setMany({
                         a: ValueA,
                         b: ValueB
                     });
        let MapAfter = Map.clear();
        it('should return an independent copy', function () {
            expect(MapAfter).not.to.equal(Map);
            expect(MapAfter).to.be.instanceOf(ImmutableMapUndef);
            expect(Map.shallow()).to.eql(
                {
                    a: ValueA,
                    b: ValueB
                });
        });
        it('should remove all keys', function () {
            expect(MapAfter.shallow()).to.eql({});
        });
    });
});

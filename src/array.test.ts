import { expect }     from 'chai';
import 'mocha';
import ImmutableArray from './array';

describe('ImmutableArray', function () {
    describe('CTOR', function () {
        it('should create an empty instance of ImmutableArray', function () {
            const Arr = new ImmutableArray();
            expect(Arr).to.be.instanceof(ImmutableArray);
            expect(Arr.isImmutable).to.equal(true);
            expect(Arr.length).to.equal(0);
        });
        it('should save the initial array if provided', function () {
            const Arr = new ImmutableArray([1, 2, 3]);
            expect(Arr.length).to.equal(3);
            expect(Arr.slice()).to.eql([1, 2, 3]);
        });
    });
    describe('Getters', function () {
        const InitialData = [1, 2, 3];
        const Arr = new ImmutableArray(InitialData);
        describe('get', function () {
            it('should return the array value at the given index', function () {
                InitialData.forEach((val, index) => {
                    expect(Arr.get(index)).to.equal(val);
                });
            });
            it('should return undefined if value is not in array', function () {
                expect(Arr.get(3)).to.equal(undefined);
            });
        });
        describe('indexOf', function () {
            it('should return the value index', function () {
                InitialData.forEach(val => {
                    expect(Arr.indexOf(val)).to.equal(InitialData.indexOf(val));
                });
            });
            it('should return -1 if the value does not exist', function () {
                expect(Arr.indexOf(0)).to.equal(-1);
            });
        });
        describe('indexOfFn', function () {
            it('should return the first matching value', function () {
                expect(Arr.indexOfFn(val => val > 1)).to.equal(1);
            });
            it('should return -1 if no match was found', function () {
                expect(Arr.indexOfFn(() => false)).to.equal(-1);
            });
        });
    });
    describe('Manipulators', function () {
        describe('withMutations', function () {
            const Arr = new ImmutableArray([1, 2, 3]);
            const newArr = Arr.withMutations(currArr => {
                currArr[0] = 2;
                currArr[1] = 4;
                currArr[2] = 6;
            });
            it('should not change the original data', function () {
                expect(Arr.slice()).to.eql([1, 2, 3]);
            });
            it('should return a new instance', function () {
                expect(newArr).not.to.equal(Arr);
                expect(newArr).to.be.instanceOf(ImmutableArray);
            });
            it('should store the manipulated data', function () {
                expect(newArr.slice()).to.eql([2, 4, 6]);
            });
        });
        describe('set', function () {
            const Arr = new ImmutableArray([1, 2, 3]);
            it('should set the value at the defined index', function () {
                let newArr = Arr.set(1, 4);
                expect(newArr).to.be.instanceOf(ImmutableArray);
                expect(newArr.get(1)).to.equal(4);
                newArr = newArr.set(6, 6);
                expect(newArr.length).to.equal(7);
                expect(newArr.get(6)).to.equal(6);
            });
        });
        describe('push', function () {
            const Arr = new ImmutableArray([1, 2, 3]);
            it('should add the values at the end of the array', function () {
                let newArr = Arr.push(4, 5, 6);
                expect(newArr).to.be.instanceOf(ImmutableArray);
                expect(newArr.slice()).to.eql([1, 2, 3, 4, 5, 6]);
            });
        });
        describe('update', function () {
            const Arr = new ImmutableArray([1, 2, 3]);
            it('should set the value at the given key to the callback-return', function () {
                let newArr = Arr.update(1, currVal => currVal * 10);
                expect(newArr).to.be.instanceOf(ImmutableArray);
                expect(newArr.slice()).to.eql([1, 20, 3]);
            });
        });
        describe('map', function () {
            const Arr = new ImmutableArray([1, 2, 3]);
            it('should map all values to the callback-returns', function () {
                let newArr = Arr.map(currVal => currVal * 10);
                expect(newArr).to.be.instanceOf(ImmutableArray);
                expect(newArr.slice()).to.eql([10, 20, 30]);
            });
        });
        describe('filter', function () {
            const Arr = new ImmutableArray([1, 2, 3, 4]);
            it('should return only the filtered values', function () {
                let newArr = Arr.filter(currVal => currVal % 2 === 0);
                expect(newArr).to.be.instanceOf(ImmutableArray);
                expect(newArr.slice()).to.eql([2, 4]);
            });
        });
        describe('remove', function () {
            const Arr = new ImmutableArray([1, 2, 3, 4, 5]);
            it('should remove the given indexes', function () {
                let newArr = Arr.remove(1, 3);
                expect(newArr).to.be.instanceOf(ImmutableArray);
                expect(newArr.slice()).to.eql([1, 3, 5]);
            });
        });
    });
});

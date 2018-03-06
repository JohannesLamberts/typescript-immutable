import { expect }      from 'chai';
import 'mocha';
import ImmutableRecord from './record';

const InitialData = {
    string: 'Text',
    number: 1,
    boolean: true
};

describe('ImmutableRecord', function () {
    describe('CTOR', function () {
        it('should create an instance of ImmutableArray with the initial data', function () {
            const Rec = new ImmutableRecord(InitialData);
            expect(Rec).to.be.instanceof(ImmutableRecord);
            expect(Rec.isImmutable).to.equal(true);
            expect(Rec.shallow()).to.eql(InitialData);
        });
    });
    describe('Getters', function () {
        describe('get', function () {
            it('should return the value for the given key', function () {
                const Rec = new ImmutableRecord(InitialData);
                for (const key of Object.keys(InitialData) as Array<keyof typeof InitialData>) {
                    expect(Rec.get(key)).to.equal(InitialData[key]);
                }
            });
        });
    });
    describe('Manipulators', function () {
        describe('withMutations', function () {
            const Rec = new ImmutableRecord(InitialData);
            const newRec = Rec.withMutations(currRec => {
                currRec.boolean = true;
                currRec.string = 'Hello';
                currRec.number = 10;
            });
            it('should not change the original data', function () {
                expect(Rec.shallow()).to.eql(InitialData);
            });
            it('should return a new instance', function () {
                expect(newRec).not.to.equal(Rec);
                expect(newRec).to.be.instanceOf(ImmutableRecord);
            });
            it('should store the manipulated data', function () {
                expect(newRec.shallow()).to.eql(
                    {
                        boolean: true,
                        string: 'Hello',
                        number: 10
                    });
            });
        });
        describe('set', function () {
            it('should set the value for the given key', function () {
                const Rec = new ImmutableRecord(InitialData);
                const newRec = Rec.set('string', 'Hi');
                expect(newRec.shallow()).to.eql(
                    Object.assign({},
                                  InitialData,
                                  { string: 'Hi' }));
            });
        });
        describe('update', function () {
            it('should update the value for the given key with the return value', function () {
                const Rec = new ImmutableRecord(InitialData);
                const newRec = Rec.update('string', currVal => currVal + '!');
                expect(newRec.shallow()).to.eql(
                    Object.assign({},
                                  InitialData,
                                  { string: InitialData.string + '!' }));
            });
        });
        describe('replace', function () {
            const Rec = new ImmutableRecord(InitialData);
            const newData: typeof InitialData = {
                string: 'Nana',
                boolean: false,
                number: 200
            };
            const newRec = Rec.replace(newData);
            it('should not change the original data', function () {
                expect(Rec.shallow()).to.eql(InitialData);
            });
            it('should return a new instance', function () {
                expect(newRec).not.to.equal(Rec);
                expect(newRec).to.be.instanceOf(ImmutableRecord);
            });
            it('should store the new data', function () {
                expect(newRec.shallow()).to.eql(newData);
            });
        });
    });
});

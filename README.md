<h1 align="center">typescript-immutable</h1>

[immutable.js](https://facebook.github.io/immutable-js/) is a library for immutable data structures.
However, I had a lot of trouble using immutable.js with Typescript.

The main problem was to
- maintain type-safety for `Records` [as described here](https://coderwall.com/p/vxk_tg/using-immutable-js-in-typescript)
- handle potentially undefined elements in a `Map`
  (in immtable.js you can define a `notSetValue` parameter in `get()` and `update()` but not on instantiation)

This package
- implements Maps, Records and Arrays.
- doesn't not have any dependencies.

## Features
- Full type-safety
- If a `initialValue` (`ImmutableRecord`) or `notSetValue` is set (`ImmutableMap`), the type is automatically detected from that value.
- If no such value is set (`ImmutableMapUndef`), you must provide the type of the stored values. 

## How to use

# ImmutableMapUndef

```typescript
import { ImmutableMapUndef } from './src';

const Map = new ImmutableMapUndef<string, number>();

Map.get('someKey'); // undefined

Map.set('someKey', 'string'); // type error
Map.set('someKey', 2); // ok
Map.set('someOtherKey', 4); // ok

Map.setMany({
                foo: 8,
                bar: 16
            });

Map.map(currVal => currVal * 2);

Map.toArray(); // [4, 8, 16, 32]

Map.update('someKey', currVal => currVal! + 4); // 8

Map.clear();
Map.get('someKey'); // undefined
```

# ImmutableMap

```typescript
import {
    ImmutableMap,
    ImmutableRecord
} from './src';

const Map = new ImmutableMap(
    new ImmutableRecord({
                            foo: 'bar',
                            key: false
                        }));

Map.get('undefinedKey'); // ImmutableRecord with {foo: 'bar', key: false}

// Returns ImmutableMap with { key: ImmutableRecord with {foo: 'myString', key: false} }
Map.update('key', currVal => currVal.get('foo', 'myString'));

// ...other functions same as ImmutableMapUndef
```

# ImmutableRecord

```typescript
import {
    ImmutableMapUndef,
    ImmutableRecord
} from './src';

const Record = new ImmutableRecord(
    {
        someKey: 'initialValue',
        isBoolean: true,
        someOtherKey: new ImmutableMapUndef<string, { key1: boolean; key2: number; }>()
    });

Record.get('someKey'); // initialValue

Record.set('someKey', 1); // type error
Record.get('someNotExistingKey'); // type error

Record.set('someKey', 'string'); // ok

Record.update('someKey', currVal => currVal + '!!!'); // initialValue!!!

Record.withMutations(currData => {
    currData.someKey = 'newValue';
    currData.isBoolean = false;
});
```

# ImmutableArray

```typescript
import {
    ImmutableArray
} from './src';

const Arr = new ImmutableArray([1, 2]);

Arr.get(0);                     // 1;
Arr.length;                     // 2
Arr.get(3);                     // undefined
Arr.push(4, 8);                 // ImmutableArray([1, 2, 4, 8])
Arr.length;                     // 4
Arr.map(val => val * 2);        // ImmutableArray([2, 4, 8, 16])
Arr.filter(val => val < 9);     // ImmutableArray([2, 4, 8])
Arr.set(2, 3);                  // ImmutableArray([2, 3, 8])
Arr.update(2, val => val - 4);  // ImmutableArray([2, 3, 4])
Arr.slice();                    // [2, 3, 4]
Arr.indexOf(3);                 // 1
Arr.indexOfFn(val => val > 2);  // 1
Arr.remove(1);                  // ImmutableArray([2, 4])
```
// @flow
import * as options from '../options';
import {
  toDependency,
  toYarnInit,
  string,
  boolean,
  number,
  toFilterOpts,
  toSpawnOpts,
  toDependencyTypes
} from '../options';

describe('options', () => {
  test('string', () => {
    expect(string(undefined, 'flag')).toBe();
    expect(string('test', 'flag')).toBe('test');
    expect(() => string(123, 'flag')).toThrow();
  });

  test('boolean', () => {
    expect(boolean(true, 'flag')).toEqual(true);
    expect(boolean(false, 'flag')).toEqual(false);
    expect(() => boolean(123, 'flag')).toThrow();
  });

  test('number', () => {
    expect(number(1, 'flag')).toEqual(1);
    expect(number(2.2, 'flag')).toEqual(2.2);
    expect(() => number('number', 'flag')).toThrow();
  });

  test('toFilterOptions', () => {
    expect(toFilterOpts({ only: 'only' })).toEqual({ only: 'only' });
    expect(toFilterOpts({ onlyFs: 'onlyFs' })).toEqual({ onlyFs: 'onlyFs' });
    expect(toFilterOpts({ ignore: 'ignore' })).toEqual({ ignore: 'ignore' });
    expect(toFilterOpts({ ignoreFs: 'ignoreFs' })).toEqual({
      ignoreFs: 'ignoreFs'
    });
    expect(toFilterOpts({})).toEqual({});
  });

  test('toDependencyTypes', () => {
    expect(toDependencyTypes('devDependencies')).toEqual(['devDependencies']);
    expect(toDependencyTypes('peerDependencies')).toEqual(['peerDependencies']);
    expect(toDependencyTypes('devDependencies,peerDependencies')).toEqual([
      'devDependencies',
      'peerDependencies'
    ]);
    expect(() => toDependencyTypes('deps', 'flagName')).toThrow(
      'Flag "flagName" must be a comma separated list of valid dependency types. Received invalid types: "deps"'
    );
  });

  test('toSpawnOpts', () => {
    expect(toSpawnOpts({ parallel: true })).toEqual({ orderMode: 'parallel' });
    expect(toSpawnOpts({ serial: true })).toEqual({ orderMode: 'serial' });
    expect(toSpawnOpts({ bail: true })).toEqual({ bail: true });
    expect(toSpawnOpts({ parallelNodes: true })).toEqual({
      orderMode: 'parallel-nodes'
    });
    expect(
      toSpawnOpts({ excludeFromGraph: 'devDependencies,peerDependencies' })
    ).toEqual({ excludeFromGraph: ['devDependencies', 'peerDependencies'] });
    expect(() => toSpawnOpts({ parallel: true, serial: true })).toThrow(
      'Commands cannot be run both serially and in parallel'
    );
  });

  test('toDependency', () => {
    let name = 'packageName';
    let version = '1.0.0';
    expect(toDependency(name)).toEqual({ name });
    let nameWithVersion = `packageName@${version}`;
    expect(toDependency(nameWithVersion)).toEqual({ name, version });
    nameWithVersion = `@packageName/${version}`;
    expect(toDependency(nameWithVersion)).toEqual({ name: nameWithVersion });
    nameWithVersion = `@packageName@${version}`;
    expect(toDependency(nameWithVersion)).toEqual({ name, version });
  });

  test('toYarnInit', () => {
    let flag = true;

    expect(toYarnInit({})).toEqual({});

    expect(toYarnInit({ y: flag })).toEqual({ yes: true });
    expect(toYarnInit({ y: !flag })).toEqual({});
    expect(toYarnInit({ yes: flag })).toEqual({ yes: true });
    expect(toYarnInit({ yes: !flag })).toEqual({});
    expect(toYarnInit({ private: flag })).toEqual({ private: true });
    expect(toYarnInit({ private: !flag })).toEqual({});
    expect(toYarnInit({ p: flag })).toEqual({ private: true });
    expect(toYarnInit({ p: !flag })).toEqual({});

    expect(toYarnInit({ y: flag, p: !flag })).toEqual({ yes: true });
    expect(toYarnInit({ private: flag, y: !flag })).toEqual({ private: true });

    expect(toYarnInit({ y: !flag, p: !flag })).toEqual({});
    expect(toYarnInit({ y: flag, p: flag })).toEqual({
      yes: true,
      private: true
    });
  });
});

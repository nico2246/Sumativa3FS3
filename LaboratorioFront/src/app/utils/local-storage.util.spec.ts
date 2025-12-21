import { TestBed } from '@angular/core/testing';
import { LocalStorageUtils } from './local-storage.util';
import { PLATFORM_ID } from '@angular/core';

describe('LocalStorageUtils (browser)', () => {
  let utils: LocalStorageUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageUtils,
        { provide: PLATFORM_ID, useValue: 'browser' }, // simula navegador
      ],
    });

    utils = TestBed.inject(LocalStorageUtils);
    localStorage.clear();
  });

  it('should set and get value', () => {
    utils.set('k', { a: 1 });

    const res = utils.get<{ a: number }>('k');
    expect(res).toEqual({ a: 1 });
  });

  it('get should return null when key does not exist', () => {
    const res = utils.get<any>('missing');
    expect(res).toBeNull();
  });

  it('get should return null when JSON is invalid (catch branch)', () => {
    localStorage.setItem('bad', '{invalid json');

    const res = utils.get<any>('bad');
    expect(res).toBeNull();
  });

  it('should remove key', () => {
    utils.set('k', 'v');
    utils.remove('k');

    expect(localStorage.getItem('k')).toBeNull();
  });

  it('should clear storage', () => {
    utils.set('a', 1);
    utils.set('b', 2);

    utils.clear();

    expect(localStorage.length).toBe(0);
  });
});

describe('LocalStorageUtils (server)', () => {
  let utils: LocalStorageUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageUtils,
        { provide: PLATFORM_ID, useValue: 'server' }, // simula SSR/no browser
      ],
    });

    utils = TestBed.inject(LocalStorageUtils);
    localStorage.clear();
  });

  it('set should do nothing on server', () => {
    utils.set('k', 'v');
    expect(localStorage.getItem('k')).toBeNull();
  });

  it('get should return null on server', () => {
    localStorage.setItem('k', JSON.stringify('v'));
    expect(utils.get('k')).toBeNull();
  });

  it('remove should do nothing on server', () => {
    localStorage.setItem('k', JSON.stringify('v'));
    utils.remove('k');
    // sigue existiendo porque en server retorna antes
    expect(localStorage.getItem('k')).not.toBeNull();
  });

  it('clear should do nothing on server', () => {
    localStorage.setItem('a', JSON.stringify(1));
    utils.clear();
    expect(localStorage.length).toBe(1);
  });
});

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { getUser } from '../utils/fetch';

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    resolve(
      new Response({
        ok: true,
        json: () => {
          return new Promise((resolve, reject) => {
            resolve({ userObject: `someValue` });
          });
        },
      })
    );
  });
});

// const testFetch = vi.fn(async (url, options) => {
//   return new Response({
//     ok: true,
//     json: async () => {
//       return { userObject: 'someValue' };
//     },
//   });
// });

vi.stubGlobal('fetch', testFetch);

describe('getUser()', () => {
  it('should be defined', () => {
    expect(getUser).toBeDefined();
  });

  it('should return testProp', async () => {
    const name = 'daniel';

    expect(getUser(name)).resolves;
  });
});

//@ts-check

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { validationError } from '../utils/errors';

describe('class validationError', () => {
  let val;
  beforeEach(() => {
    val = new validationError('ERROR, ERROR');
  });

  it('should be defined', () => {
    expect(val).toBeDefined();
  });

  it('should return an object with a message property when invoked', () => {
    expect(val).toBeTypeOf('object');
    expect(val).toHaveProperty('message');
  });

  it('should return the string "ERROR ERROR" if nothing gets passed in', () => {
    const val2 = new validationError();
    expect(val2.message).toBe('ERROR ERROR');
  });
});

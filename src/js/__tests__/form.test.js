import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import fs from 'fs';
import path from 'path';
import { extractFormData } from '../utils/form';

// set up virtual dom
const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

const testFormData = vi.fn((form) => {
  return {
    get: (name) => {
      for (const key of Object.keys(form)) {
        if (key === name) {
          return form[name];
        } else {
          return null;
        }
      }
    },
  };
});

vi.stubGlobal('FormData', testFormData);

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(htmlDocumentContent);
});

describe('extractFormData()', () => {
  it('should be defined', () => {
    expect(extractFormData).toBeDefined();
  });

  it('should return either a string or null given an object and a string', () => {
    const formInputs = {
      search: 'Job',
      name: 'Daniel',
    };
    const formKey1 = 'search';
    const formKey2 = 'Not search';

    const result = extractFormData(formInputs, formKey1);
    const result2 = extractFormData(formInputs, formKey2);

    expect(result).toBe('Job');
    expect(result2).toBeNull();
  });

  it('should return null if a string isn"t passed in as the second parameter', () => {
    const formInputs = {
      search: 'Job',
      name: 'Daniel',
    };

    const formKey = 25;
    const formKey2 = [];
    const formKey3 = { a: 'b' };

    const result = extractFormData(formInputs, formKey);
    const result2 = extractFormData(formInputs, formKey2);
    const result3 = extractFormData(formInputs, formKey3);

    expect(result).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });

  it('should return null if an object is"t passed in as the first parameter', () => {
    const formInputs = 'a string';
    const formInputs2 = 23;
    const formInputs3 = [1, 2, 3, '4'];

    const formKey = 'hello';

    const result = extractFormData(formInputs, formKey);
    const result2 = extractFormData(formInputs2, formKey);
    const result3 = extractFormData(formInputs3, formKey);

    expect(result).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });
});

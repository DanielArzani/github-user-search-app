import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import fs from 'fs';
import path from 'path';

import { changeClassName } from '../utils/dom';
import { validationError } from '../utils/errors';

// set up virtual dom
const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

vi.mock('../utils/dom', () => {
  return {
    changeClassName: (element, newClassName) => {
      if (element instanceof window.Element && typeof newClassName === 'string')
        element.className = newClassName;
      else
        throw new validationError(
          "Either an argument that wasn't an HTMLElement was passed in or a string wasn't passed in"
        );
    },
  };
});

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(htmlDocumentContent);
});

describe('changeClassName()', () => {
  it('should be defined', () => {
    expect(changeClassName).toBeDefined;
  });

  it('should return undefined if an Element and a string are passed in', () => {
    // window.<some element> returns [function<some element>]
    const btnElement = window.HTMLButtonElement;

    const result = changeClassName(new btnElement(), 'new-class-name');

    expect(result).toBeUndefined();
  });

  it('should throw if anything other than an Element and a string are passed in', () => {
    const result = () => changeClassName({}, 23);
    const result2 = () => changeClassName('Element', '23');

    expect(result).toThrowError(validationError);
    expect(result2).toThrowError(validationError);
  });

  it('should throw if no arguments are passed in', () => {
    const result = () => changeClassName();

    expect(result).toThrowError(validationError);
  });

  it('should change the class name of the element passed in', () => {
    const inputEl = new window.HTMLInputElement();
    inputEl.className = 'old-class-name';

    changeClassName(inputEl, 'new-class-name');

    expect(inputEl.getAttribute('class')).toBe('new-class-name');
  });
});

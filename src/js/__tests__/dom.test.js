import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import fs from 'fs';
import path from 'path';

import {
  changeClassName,
  setLabel,
  storeTheme,
  handleClick,
} from '../utils/dom';
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
    setLabel: (labelEl, matcher, dataAttr) => {
      if (labelEl.getAttribute('for') === matcher) {
        labelEl.dataset[dataAttr] = 'true';
      } else {
        labelEl.dataset[dataAttr] = 'false';
      }
    },
    storeTheme: (theme) => {
      window.localStorage.setItem('theme', theme);
    },
    handleClick: (body, labels) => {
      const changeClassName = vi.fn();
      const storeTheme = vi.fn();
      const setLabel = vi.fn();

      labels.forEach((label) => {
        if (label instanceof window.HTMLLabelElement) {
          setLabel();
        } else
          throw new validationError(
            'One of the elements is not an instance of HTMLLabelElement'
          );
      });
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

describe('setLabel()', () => {
  it('should throw an error if anything other than an html element is passed in as the first argument', () => {
    const result = () => setLabel('a', 'b', 'c');
    const result2 = () => setLabel({}, 'b', 'c');
    const result3 = () => setLabel([1, 2], 'b', 'c');
    const result4 = () => setLabel(new window.HTMLButtonElement(), 'b', 'c');
    const result5 = () => setLabel(new window.HTMLElement(), 'b', 'c');
    const result6 = () => setLabel();

    expect(result).toThrow();
    expect(result2).toThrow();
    expect(result3).toThrow();
    expect(result4).not.toThrow();
    expect(result5).not.toThrow();
    expect(result6).toThrow();
  });

  it('should change the the data attribute of an element that has the for attribute on it to true or false', () => {
    const someLabel = new window.HTMLLabelElement();
    const someLabel2 = new window.HTMLLabelElement();

    someLabel.setAttribute('for', 'key');
    someLabel2.setAttribute('for', 'door');

    setLabel(someLabel, 'key', 'someAttr');
    setLabel(someLabel2, 'key', 'someAttr');

    expect(someLabel.dataset.someAttr).toBe('true');
    expect(someLabel2.dataset.someAttr).toBe('false');
  });

  it('should create a new data attribute and set it to true for an html element that isn"t an HTMLLabelElement with a "for" attribute', () => {
    const someLabel = new window.HTMLButtonElement();

    someLabel.setAttribute('for', 'key');

    setLabel(someLabel, 'key', 'someAttr');

    expect(someLabel.dataset.someAttr).toBe('true');
  });
});

describe('storeTheme()', () => {
  it('should return the passed in string when the getItem method is used', () => {
    storeTheme('a-theme');

    const result = window.localStorage.getItem('theme');

    expect(result).toBe('a-theme');
  });
});

describe('handleClick()', () => {
  let body;
  let labels;

  beforeEach(() => {
    body = new window.HTMLBodyElement();
    labels = [new window.HTMLLabelElement(), new window.HTMLLabelElement()];
  });

  it('should be defined', () => {
    expect(handleClick).toBeDefined();
  });

  it('should not throw even though changeClassName,StoreTheme and setLabel have been set to empty spy functions', () => {
    const result = () => handleClick(body, labels);

    expect(result).not.toThrow();
  });

  it('should throw an error if an array-like structure of HTMLLabelElements isn"t passed as an parameter', () => {
    const notLabels = [
      new window.HTMLButtonElement(),
      new window.HTMLButtonElement(),
    ];

    const result = () => handleClick(body, notLabels);

    expect(result).toThrow(validationError);
  });
});

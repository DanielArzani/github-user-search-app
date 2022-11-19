//@ts-check
import { Window } from 'happy-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

import { UI } from '../utils/render';

// set up virtual dom
const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(htmlDocumentContent);
});

let userInterface;

let elementsList = {
  userName: new window.HTMLElement(),
  userLink: new window.HTMLElement(),
  dateJoined: new window.HTMLElement(),
};

let userData = {
  name: 'Night',
  location: 'Toronto',
  bio: 'This profile has no bio',
};

beforeEach(() => {
  userInterface = new UI(userData, elementsList);
});

describe('class UI', () => {
  it('should be defined', () => {
    expect(userInterface).toBeDefined();
  });

  it('should have properties and methods', () => {
    expect(userInterface).toHaveProperty('render');
    expect(userInterface).toHaveProperty('data');
    expect(userInterface).toHaveProperty('elementsList');
  });

  it('should not have its private methods exposed', () => {
    expect(userInterface).not.toHaveProperty('updateTextContent');
  });

  it("should throw an error when an argument that doesn't have the parentElement method is passed in", () => {
    const ui = new UI(25, 'a string');

    const result = () => ui.render();

    expect(result).toThrow();
  });

  it('should throw an error if an htmlElement is passed in by itself and not as an objects property', () => {
    const ui = new UI(new window.HTMLLinkElement(), { name: 'daniel' });

    const result = () => ui.render();

    expect(result).toThrow();
  });
});

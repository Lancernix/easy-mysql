/**
 * util functions
 */
import { isPlainObject } from 'lodash';

export const checkPlainObject = (key: string, value: unknown): void => {
  if (!isPlainObject(value)) {
    throw new Error(`${key}'s value should be a plain object!`);
  }
};

export const checkEmptyPlainObject = (key: string, value: unknown) => {
  if (!isPlainObject(value) || !Object.keys(value as Record<string, unknown>).length) {
    throw new Error(`${key}'s value should be a non-empty plain object!`);
  }
};

export const checkEmptyArray = (key: string, value: unknown): void => {
  if (!Array.isArray(value) || !value.length) {
    throw new Error(`${key}'s value should be a non-empty array!`);
  }
};

export const checkTwoElementArray = (key: string, value: unknown): void => {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error(`${key}'s value should be an array with 2 elements!`);
  }
};

export const checkMoreElementArray = (key: string, value: unknown): void => {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error(`${key}'s value should be an array with 2 elements or more!`);
  }
};

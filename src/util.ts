import { escape } from 'mysql2';

/**
 * check basic format and return the literal of mysql build-in function
 * @param params function literal
 * @returns formatted function literal
 */
const literal = (params: string): string => {
  const funcReg = /^(?:[A-Za-z]+_?)*[A-Za-z]+\(.*\)$/;
  // check params foramt
  if (!funcReg.test(params)) {
    throw new Error('params format is incorrect!');
  }
  return params.replace(/^[A-Za-z_]+(?=\(.*\)$)/, funcName => funcName.toUpperCase());
};

export { literal, escape };

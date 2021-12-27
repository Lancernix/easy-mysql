import { escape } from 'mysql2';
/**
 * check basic format and return the literal of mysql build-in function
 * @param params function literal
 * @returns formatted function literal
 */
declare const literal: (params: string) => string;
export { literal, escape };

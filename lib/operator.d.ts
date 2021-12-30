import { OpFuncRet, SingleOptionValue, SingleOperator, MultiOptionValue, MultiOperator, OrOptionValue } from './typing';
declare const commonOpFunc: (op: SingleOperator, val: SingleOptionValue) => OpFuncRet;
declare const bwOpFunc: (op: MultiOperator, val: MultiOptionValue) => OpFuncRet;
declare const inAndNiOpFunc: (op: MultiOperator, val: MultiOptionValue) => OpFuncRet;
declare const orOpFunc: (val: Partial<OrOptionValue>[]) => OpFuncRet;
export declare const checkEmptyPlainObject: (key: string, value: unknown) => void;
export declare const checkEmptyArray: (key: string, value: unknown) => void;
export { commonOpFunc, bwOpFunc, inAndNiOpFunc, orOpFunc };

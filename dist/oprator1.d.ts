import { OpFuncRet, SingleOptionValue, SingleOperator, MultiOptionValue, MultiOperator, OrOptionValue } from './typing';
declare const commonOpFunc: (key: SingleOperator, val: SingleOptionValue | SingleOptionValue[]) => OpFuncRet;
declare const bwOpFunc: (key: MultiOperator, val: MultiOptionValue | MultiOptionValue[]) => OpFuncRet;
declare const inAndNiOpFunc: (key: MultiOperator, val: MultiOptionValue | MultiOptionValue[]) => OpFuncRet;
declare const orOpFunc: (val: Partial<OrOptionValue>[]) => OpFuncRet;
export { commonOpFunc, bwOpFunc, inAndNiOpFunc, orOpFunc };

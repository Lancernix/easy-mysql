/**
 * literal class
 */
export default class Literal {
  private _text: string;

  constructor(text: string) {
    this._text = text;
  }

  // setter: check and format
  public set text(params: string) {
    const funcReg = /^(?:[A-Za-z]+_?)*[A-Za-z]+\(.*\)$/;
    // check params foramt
    if (!funcReg.test(params)) {
      throw new Error('literal format is incorrect!');
    }
    this._text = params.replace(/^[A-Za-z_]+(?=\(.*\)$)/, funcName => funcName.toUpperCase());
  }

  public get text(): string {
    return this._text;
  }
}

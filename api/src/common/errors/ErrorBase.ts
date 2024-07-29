class ErrorBase extends Error {
  private errorCode: number;
  private httpStatusCode: number;

  public constructor(message: string, errorCode: number, httpStatusCode: number) {
    super(message);

    this.errorCode = errorCode;
    this.httpStatusCode = httpStatusCode;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public getMessage() {
    return this.message;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public getErrorCode() {
    return this.errorCode;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public getHttpStatusCode() {
    return this.httpStatusCode;
  }
}

export default ErrorBase;

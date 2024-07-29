import ErrorBase from './ErrorBase';
import { BAD_REQUEST } from 'http-status-codes';
import ErrorCodes from '../constants/ErrorCodes';

export default class DuplicateError extends ErrorBase {
  public constructor(message?: string) {
    super(
      `Duplikasi ${message ? message : ''}`,
      ErrorCodes.DUPLICATED_USER_ERROR_CODE,
      BAD_REQUEST
    );
  }
}

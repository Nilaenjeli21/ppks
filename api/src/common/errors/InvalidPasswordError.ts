import { UNAUTHORIZED } from 'http-status-codes';

import ErrorBase from './ErrorBase';
import ErrorCodes from '../constants/ErrorCodes';

class InvalidPasswordError extends ErrorBase {
  public constructor() {
    super(
      `User Atau Password Tidak Valid`,
      ErrorCodes.INVALID_CREDENTIALS_ERROR_CODE,
      UNAUTHORIZED
    );
  }
}

export default InvalidPasswordError;

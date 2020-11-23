/* eslint-disable max-classes-per-file */

import localize from './i18n/localize';

export class UnspecificError extends Error {
  name = 'UnspecificError';
  constructor() {
    super(localize.t('errors.unspecific'));
  }
}

// Validation
export class ValidationError extends Error {
  name = 'ValidationError';
}

export class NameError extends ValidationError {
  constructor() {
    super(localize.t('errors.format.sound'));
  }
}

export class DuplicationError extends ValidationError {
  constructor(name: string) {
    super(localize.t('validation.attachment.exists', { name }));
  }
}

export class InvalidUrlError extends ValidationError {
  constructor() {
    super(localize.t('errors.format.url'));
  }
}

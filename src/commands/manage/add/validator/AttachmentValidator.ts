/* eslint-disable max-classes-per-file */

import { MessageAttachment } from 'discord.js';

import Config from '~/config/Config';
import localize from '~/util/i18n/localize';

import BaseValidator, { ValidationError } from './BaseValidator';

export class AttachmentExtensionError extends ValidationError {
  constructor(extensions: string[]) {
    super(localize.t('validation.attachment.extension', { extensions: extensions.join(', ') }));
  }
}

export class AttachmentSizeError extends ValidationError {
  constructor() {
    super(localize.t('validation.attachment.size'));
  }
}

export default class AttachmentValidator extends BaseValidator {
  private readonly config: Config;

  constructor(config: Config) {
    super();
    this.config = config;
  }

  public validate(attachment: MessageAttachment) {
    return this.validateAttachment(attachment);
  }

  private validateAttachment(attachment: MessageAttachment) {
    if (!attachment.name) throw new Error('Attachment without name :confused:');

    const fileName = attachment.name.toLowerCase();
    const soundName = fileName.substring(0, fileName.lastIndexOf('.'));

    this.validateExtension(fileName);
    this.validateName(soundName);
    this.validateSize(attachment.size);
    this.validateUniqueness(soundName);
  }

  private validateExtension(fileName: string) {
    if (this.config.acceptedExtensions.some(ext => fileName.endsWith(ext))) return;

    throw new AttachmentExtensionError(this.config.acceptedExtensions);
  }

  private validateSize(filesize: number) {
    if (filesize <= this.config.maximumFileSize) return;

    throw new AttachmentSizeError();
  }
}
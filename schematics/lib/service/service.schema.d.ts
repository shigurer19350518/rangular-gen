import { Path } from '@angular-devkit/core';

export interface ServiceOptions {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The path to create the service.
   */
  path?: string;
  /**
   * Application language.
   */
  language?: string;
}
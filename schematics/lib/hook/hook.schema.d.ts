import { Path } from '@angular-devkit/core';

export interface ServiceOptions {
  /**
   * The name of the page.
   */
  name: string;
  /**
   * The name of the React Hook.
   */
  hookName: string;
  /**
   * The path to create the page.
   */
  path?: string;
  /**
   * Application language.
   */
  language?: string;
}
import { MirrorOptions } from "npm:@electron/get@2.0.2";

export interface Configuration {
  /** The Product Name of Application  */
  productName: string;
  /** The AppId of Application */
  appId: string;
  /** The version of Application  */
  version: string;
  /**
   * The copyright ri of Application
   * @example 'Copyright © 2022 Deno'
   */
  copyright: string;
  /** The root folder of package  */
  dist: string;
  nisi: WindowsNisi;
  Dmg: MacOSDmg;
  electronMirrorOptions: MirrorOptions;
}

export interface WindowsNisi {
  oneClick?: boolean;
  allowElevation?: boolean;
  allowToChangeInstallationDirectory?: boolean;
  removeDefaultUninstallWelcomePage?: boolean;
  installerIcon?: string;
  uninstallerIcon?: string;
}

export interface MacOSDmg {}

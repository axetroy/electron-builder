import { Configuration } from "electron-builder-configuration";

export interface DistributionPacker {
  /**
   * pack distribution and return files path
   */
  pack(electronPrebuildDir: string, config: Configuration): Promise<string[]>;
}

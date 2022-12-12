import { DistributionPacker } from "./interface.ts";
import { Configuration } from "electron-builder-configuration";

export class DmgPacker implements DistributionPacker {
  async pack(electronPrebuildDir: string, config: Configuration) {
    return [] as string[];
  }
}

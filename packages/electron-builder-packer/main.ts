import { Configuration } from "electron-builder-configuration";
import { DmgPacker } from "./distribution/dmg.ts";

type DistributionName = "nsis" | "dmg" | "deb";

export async function pack(electronPrebuildDir: string, config: Configuration, format: DistributionName[]) {
  const pkger = new DmgPacker();

  return pkger.pack(electronPrebuildDir, config);
}

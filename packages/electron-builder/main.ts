import { Configuration } from "electron-builder-configuration";
import * as asar from "electron-builder-asar";
import * as electronDownloader from "electron-builder-electron-downloader";
import * as helper from "electron-builder-helper";
import * as metaData from "electron-builder-meta-data";
import * as codeSign from "electron-builder-code-sign";
import * as toolchain from "electron-builder-toolchain";
import * as packer from "electron-builder-packer";
import { DistributionName } from "electron-builder-packer";
import * as path from "path";

export interface BuildTarget {
  platform: typeof Deno.build.os;
  arch: typeof Deno.build.arch;
}

/** The main program to build Electron application
 * @param configPath
 * @param config
 * @param target
 */
export async function build(configPath: string, format: DistributionName, config: Configuration, target: BuildTarget) {
  // 1. Download electron pre-build binary
  const zipPath = await electronDownloader.downloadElectronPrebuild(
    "v16.2.8",
    target.platform,
    target.arch,
    config.electronMirrorOptions,
  );

  const electronPrebuildDir = path.join(Deno.cwd(), `unpacked-${target.platform}-${target.arch}`);

  // 2. Extract electron pre-build binary and prune unused files
  await electronDownloader.extractElectronPrebuild(zipPath, electronPrebuildDir, target);

  // 3. Create app.asar from dist folded
  await asar.createPackage(
    path.isAbsolute(config.dist) ? config.dist : path.resolve(configPath, config.dist),
    helper.getAppAsarPath(electronPrebuildDir, target.platform),
  );

  // 4. Setup build toolchain
  await toolchain.download();

  // 5. Update meta data of pre-build binary and rename executable
  await metaData.update();

  // 6. Sign code if set
  await codeSign.sign();

  // 7. Build distribution format. eg. exe/dmg/deb/rpm
  await packer.pack(electronPrebuildDir, config, format);

  console.log("Done!");
}

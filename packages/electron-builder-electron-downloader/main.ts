import { downloadArtifact, MirrorOptions } from "npm:@electron/get@2.0.2";
import { BuildTarget } from "electron-builder";
import extractZip from "zip";
import * as path from "path";
import * as fs from "fs";

/**
 * Download electron prebuild binary and return zip path
 * @param platform
 * @param arch
 * @returns
 */
export async function downloadElectronPrebuild(
  version: string,
  platform: typeof Deno.build.os,
  arch: typeof Deno.build.arch,
  mirrorOptions: MirrorOptions = {},
): Promise<string> {
  return await downloadArtifact({
    version: version,
    platform: platform === "windows" ? "win32" : platform,
    arch: arch === "x86_64" ? "x64" : arch,
    artifactName: "electron",
    mirrorOptions: mirrorOptions,
    unsafelyDisableChecksums: true,
  });
}

/**
 * extract electron prebuild resource to dist
 * @param zipPath
 */
export async function extractElectronPrebuild(zipPath: string, dist: string, target: BuildTarget) {
  await fs.emptyDir(dist);
  await extractZip(zipPath, { dir: dist });

  const pruneFiles: string[] = [];

  pruneFiles.push(path.join(dist, "LICENSE"));
  pruneFiles.push(path.join(dist, "LICENSES.chromium.html"));

  if (target.platform === "windows") {
    pruneFiles.push(path.join(dist, "resources", "default_app.asar"));
  } else if (target.platform === "darwin") {
    pruneFiles.push(path.join(dist, "version"));
    pruneFiles.push(path.join(dist, "Electron.app", "Contents", "Resources", "default_app.asar"));
  } else {
    // TODO
  }

  // Remove unused files from electron prebuild folder
  for (const f of pruneFiles) {
    await Deno.remove(f);
  }
}

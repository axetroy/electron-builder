import * as path from "path";

/**
 * Get the app.asar path from electron prebuild folder
 * @param electronPrebuildDir
 * @param platform
 * @returns
 */
export function getAppAsarPath(electronPrebuildDir: string, platform: typeof Deno.build.os): string {
  switch (platform) {
    case "windows":
      return path.join(electronPrebuildDir, "resources", "app.asar");
    case "darwin":
      return path.join(electronPrebuildDir, "Electron.app", "Contents", "Resources", "app.asar");
    default:
      // TODO
      return "";
  }
}

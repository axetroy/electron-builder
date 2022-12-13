import { downloadElectronPrebuild } from "./main.ts";
import { assert, assertMatch } from "asserts";

Deno.test("test download darwin Electron prebuild binary", async () => {
  const zipPath = await downloadElectronPrebuild("v16.2.8", "darwin", "x86_64", {
    mirror: "https://npmmirror.com/mirrors/electron/",
  });

  assert(typeof zipPath === "string");
  assertMatch(zipPath, /electron-v16\.2\.8-darwin-x64\.zip/);
});

Deno.test("test download linux Electron prebuild binary", async () => {
  const zipPath = await downloadElectronPrebuild("v16.2.8", "linux", "x86_64", {
    mirror: "https://npmmirror.com/mirrors/electron/",
  });

  assert(typeof zipPath === "string");
  assertMatch(zipPath, /electron-v16\.2\.8-linux-x64\.zip/);
});

Deno.test("test download windows Electron prebuild binary", async () => {
  const zipPath = await downloadElectronPrebuild("v16.2.8", "windows", "x86_64", {
    mirror: "https://npmmirror.com/mirrors/electron/",
  });

  assert(typeof zipPath === "string");
  assertMatch(zipPath, /electron-v16\.2\.8-windows-x64\.zip/);
});

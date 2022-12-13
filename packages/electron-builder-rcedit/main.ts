import * as path from "path";

async function isPathExist(filepath: string) {
  try {
    await Deno.stat(filepath);

    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

export async function exec(args: string[]): Promise<[Uint8Array, Uint8Array]> {
  if (Deno.build.os !== "windows") {
    throw new Deno.errors.NotSupported("rcedit not support your system");
  }

  const filename = `rcedit-${Deno.build.arch === "x86_64" ? "x64" : "x86"}.exe`;
  const extFilepath = path.fromFileUrl(import.meta.resolve(`./${filename}`));

  if (await isPathExist(extFilepath) === false) {
    // download from remote
    const res = await fetch(`https://cdn.jsdelivr.net/gh/axetroy/electron-builder/packages/electron-builder-rcedit/${filename}`);

    const buff = await res.arrayBuffer();

    await Deno.writeFile(extFilepath, new Uint8Array(buff));
  }

  const p = Deno.run({
    cwd: Deno.cwd(),
    cmd: [extFilepath, ...args],
    stderr: "piped",
    stdout: "piped",
  });

  const [status, stdout, stderr] = await Promise.all([
    p.status(),
    p.output(),
    p.stderrOutput(),
  ]);

  p.close();

  if (!status.success) {
    throw new Error(`Process exit with code ${status.code} and signal ${status.signal}`);
  }

  return [stdout, stderr];
}

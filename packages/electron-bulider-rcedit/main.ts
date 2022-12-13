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

export async function exec(args: string[]) {
  const filename = `rcedit-${Deno.build.arch === "x86_64" ? "x64" : "x86"}.exe`;
  const extFilepath = import.meta.resolve(filename);

  if (await isPathExist(extFilepath) === false) {
    // download from remote
    const res = await fetch(`https://cdn.jsdelivr.net/gh/axetroy/electron-builder/packages/electron-builder-rcedit/${filename}`);

    const buff = await res.arrayBuffer();

    await Deno.writeFile(extFilepath, new Uint8Array(buff));
  }

  const p = Deno.run({
    cwd: Deno.cwd(),
    cmd: [extFilepath, ...args],
    stderr: "inherit",
    stdout: "inherit",
  });

  const status = await p.status();

  if (!status.success) {
    throw new Error(`Process exit with code ${status.code} and signal ${status.signal}`);
  }
}

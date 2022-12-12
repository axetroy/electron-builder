import asar from "npm:@electron/asar@3.2.2";

export async function createPackage(src: string, dest: string) {
  await asar.createPackage(src, dest);

  return dest;
}

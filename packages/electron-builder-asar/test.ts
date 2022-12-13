import * as path from "path";
import { createPackage } from "./main.ts";

Deno.test("create a simple app.asar", async () => {
  const src = path.fromFileUrl(import.meta.resolve(`./`));
  const dest = path.fromFileUrl(import.meta.resolve(`./app.asar`));

  await createPackage(src, dest);
});

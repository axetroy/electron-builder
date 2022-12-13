import { exec } from "./main.ts";

Deno.test({
  name: "Run rcedit command",
  fn: async () => {
    const [output] = await exec(["--help"]);

    console.log(new TextDecoder().decode(output));
  },
  ignore: Deno.build.os !== "windows",
});

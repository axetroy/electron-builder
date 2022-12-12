import * as electronBuilder from "electron-builder";
import * as flags from "flags";
import * as path from "path";
import { Configuration } from "electron-builder-configuration";

function optionRequire(option: string) {
  console.error(`ERROR: ${option} option is required!\n`);
}

function printHelp() {
  console.warn(`electron-builder - a cli to build electron Application

USAGE:
  electron-builder [ARGUMENT] [OPTIONS]

OPTIONS:
  -h, --help      print help information
  -V, --version   print version information
  --config        specify configuration file
  --windows       build for windows target
  --darwin        build for macos target
  --linux         build for linux target
  --ia32          build for ia32 arch
  --x86_64        build for x86_64 arch
  --arm64         build for arm64 arch

EXAMPLES:
  electron-builder --config=./path/to/electron-builder.json --windows --x86_64
`.trim());

  Deno.exit(0);
}

interface FlagOptions {
  h: boolean;
  help: boolean;

  /** The configuration relative to cwd()*/
  config: string;

  windows?: boolean;
  darwin?: boolean;
  linux?: boolean;

  ia32?: boolean;
  x86_64?: boolean;
  arm64?: boolean;
}

async function main() {
  const options = flags.parse<FlagOptions>(Deno.args);

  if (options.h || options.help) {
    printHelp();
  }

  if (!options.config) {
    optionRequire("--config");
    printHelp();
  }

  if (!options.windows && !options.darwin && !options.linux) {
    optionRequire("--windows or --darwin or --linux");
    printHelp();
  }

  if (!options.ia32 && !options.x86_64 && !options.arm64) {
    optionRequire("--ia32 or --x86_64 or --arm64");
    printHelp();
  }

  const configFilepath = path.isAbsolute(options.config) ? options.config : path.resolve(Deno.cwd(), options.config);

  const config = JSON.parse(await Deno.readTextFile(configFilepath)) as Configuration;

  await electronBuilder.build(configFilepath, config, {
    platform: options.windows ? "windows" : options.darwin ? "darwin" : "linux",
    // @ts-expect-error ignore
    arch: options.x86_64 ? "x86_64" : options.arm64 ? "arm64" : "ia32",
  });
}

await main();

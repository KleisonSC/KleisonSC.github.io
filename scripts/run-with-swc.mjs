import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

// Wrapper around next/eslint that works around a Windows-only issue: SWC's
// native addon refuses a cache directory whose ACL is writable by a sandbox
// AppContainer SID (seen when building inside some sandboxed shells). It also
// requires the cache path to be ABSOLUTE. We pin it to a clean, project-local
// absolute directory. This only runs on win32; macOS/Linux and CI are
// untouched and use SWC's defaults.
const env = { ...process.env };
if (process.platform === "win32") {
  env.SWC_NATIVE_BINDING_CACHE = resolve(".swc-native-cache");
}

const [cmd, ...args] = process.argv.slice(2);
if (!cmd) {
  console.error("run-with-swc: no command provided");
  process.exit(1);
}

const result = spawnSync(cmd, args, { stdio: "inherit", shell: true, env });
process.exit(result.status ?? 1);

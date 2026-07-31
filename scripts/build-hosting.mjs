/**
 * Production build for CloudLinux / low-memory hosts.
 * Limits workers (avoids SIGABRT with dozens of CPUs reported) and uses webpack.
 */
import { spawnSync } from "node:child_process";

process.env.NODE_OPTIONS = [
  process.env.NODE_OPTIONS,
  "--max-old-space-size=1536",
]
  .filter(Boolean)
  .join(" ");

const result = spawnSync(
  process.execPath,
  ["./node_modules/next/dist/bin/next", "build", "--webpack"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);

process.exit(result.status ?? 1);

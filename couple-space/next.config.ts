import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /**
   * Pin the workspace root to this project.
   *
   * There is an orphan `package-lock.json` (no package.json beside it) two
   * directories up, at "E:\Code\New folder\corncup". Next treats the
   * outermost lockfile as the workspace root, so Turbopack rooted its file
   * watcher there instead of here — and changes to `src/app/globals.css`
   * silently failed to invalidate the compiled CSS in dev. The page kept
   * being served a stale stylesheet: rules that existed when the dev server
   * started still applied, anything added afterwards never arrived.
   *
   * Deleting that stray lockfile would also work, but it sits outside this
   * project. Pinning the root here fixes it without touching anything else,
   * and silences the "inferred your workspace root" warning on every build.
   */
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

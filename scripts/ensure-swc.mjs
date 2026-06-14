#!/usr/bin/env node
/**
 * Ensures the Next.js SWC native binary (or wasm fallback) is present.
 * Fixes "Failed to load SWC binary" when optional deps were skipped.
 */

import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function getNextVersion() {
  const pkgPath = join(root, "node_modules/next/package.json");
  if (!existsSync(pkgPath)) return null;
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

function swcTarget() {
  const { platform, arch } = process;
  if (platform === "darwin") {
    return arch === "arm64" ? "@next/swc-darwin-arm64" : "@next/swc-darwin-x64";
  }
  if (platform === "win32") {
    return arch === "arm64" ? "@next/swc-win32-arm64-msvc" : "@next/swc-win32-x64-msvc";
  }
  if (arch === "arm64") {
    return existsSync("/etc/alpine-release")
      ? "@next/swc-linux-arm64-musl"
      : "@next/swc-linux-arm64-gnu";
  }
  return existsSync("/etc/alpine-release")
    ? "@next/swc-linux-x64-musl"
    : "@next/swc-linux-x64-gnu";
}

function binaryName(pkg) {
  const map = {
    "@next/swc-darwin-arm64": "next-swc.darwin-arm64.node",
    "@next/swc-darwin-x64": "next-swc.darwin-x64.node",
    "@next/swc-linux-arm64-gnu": "next-swc.linux-arm64-gnu.node",
    "@next/swc-linux-arm64-musl": "next-swc.linux-arm64-musl.node",
    "@next/swc-linux-x64-gnu": "next-swc.linux-x64-gnu.node",
    "@next/swc-linux-x64-musl": "next-swc.linux-x64-musl.node",
    "@next/swc-win32-arm64-msvc": "next-swc.win32-arm64-msvc.node",
    "@next/swc-win32-x64-msvc": "next-swc.win32-x64-msvc.node",
  };
  return map[pkg];
}

function hasWasmFallback(version) {
  const wasmDir = join(root, "node_modules/@next/swc-wasm-nodejs");
  if (!existsSync(join(wasmDir, "package.json"))) return false;
  const wasmPkg = JSON.parse(readFileSync(join(wasmDir, "package.json"), "utf8"));
  return wasmPkg.version === version && existsSync(join(wasmDir, "wasm.js"));
}

function install(pkg, version) {
  console.log(`[ensure-swc] Installing ${pkg}@${version}...`);
  execSync(`npm install ${pkg}@${version} --no-save --include=optional`, {
    cwd: root,
    stdio: "inherit",
  });
}

const version = getNextVersion();
if (!version) {
  console.log("[ensure-swc] next not installed yet, skipping");
  process.exit(0);
}

const nativePkg = swcTarget();
const nativeBinary = binaryName(nativePkg);
const nativePath = join(root, "node_modules", nativePkg, nativeBinary);

if (existsSync(nativePath)) {
  console.log(`[ensure-swc] OK: ${nativePkg}`);
  process.exit(0);
}

console.warn(`[ensure-swc] Missing native binary: ${nativePath}`);

try {
  install(nativePkg, version);
} catch (err) {
  console.warn(`[ensure-swc] Native install failed: ${err.message}`);
}

if (existsSync(nativePath)) {
  console.log(`[ensure-swc] OK: ${nativePkg}`);
  process.exit(0);
}

if (!hasWasmFallback(version)) {
  try {
    install("@next/swc-wasm-nodejs", version);
  } catch (err) {
    console.error(`[ensure-swc] Wasm fallback install failed: ${err.message}`);
    process.exit(1);
  }
}

if (hasWasmFallback(version)) {
  console.log("[ensure-swc] OK: @next/swc-wasm-nodejs fallback");
  process.exit(0);
}

console.error("[ensure-swc] Failed to install SWC. Run: rm -rf node_modules && npm install");
process.exit(1);

#!/usr/bin/env node

// Sets the version in app.json + package.json, commits it, tags that commit,
// and pushes both. The tag then points at a tree whose version matches the
// build CI produces from it.

const fs = require("fs");
const { execFileSync } = require("child_process");

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8" }).trim();

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const version = process.argv[2];

if (!version) {
  fail("Usage: pnpm release <version>   e.g. pnpm release 1.4.2");
}

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  fail(`Invalid version "${version}". Expected x.y.z (no leading v).`);
}

const tag = `v${version}`;

if (git("status", "--porcelain")) {
  fail("Working tree is dirty. Commit or stash your changes first.");
}

const branch = git("rev-parse", "--abbrev-ref", "HEAD");
if (branch !== "main") {
  fail(`Releases must be cut from main (currently on ${branch}).`);
}

const existingTags = git("tag", "--list", tag);
if (existingTags) {
  fail(`Tag ${tag} already exists.`);
}

const setVersion = (file, apply) => {
  const contents = JSON.parse(fs.readFileSync(file, "utf8"));
  apply(contents);
  fs.writeFileSync(file, JSON.stringify(contents, null, 2) + "\n");
};

setVersion("app.json", (app) => {
  app.expo.version = version;
});
setVersion("package.json", (pkg) => {
  pkg.version = version;
});

git("add", "app.json", "package.json");
git("commit", "-m", `chore(release): ${tag}`);
git("tag", tag);
git("push", "origin", "main", tag);

console.log(`Released ${tag}`);

#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const errors = [];

async function findSkillFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findSkillFiles(path)));
    if (entry.isFile() && entry.name === "SKILL.md") files.push(path);
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  const values = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (field) values[field[1]] = field[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return values;
}

let skillFiles = [];
try {
  skillFiles = await findSkillFiles(skillsRoot);
} catch {
  errors.push("Missing skills/ directory.");
}

if (skillFiles.length === 0) errors.push("No skills/*/SKILL.md files found.");

const names = new Set();
for (const file of skillFiles) {
  const displayPath = relative(root, file);
  const content = await readFile(file, "utf8");
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    errors.push(`${displayPath}: missing valid YAML frontmatter.`);
    continue;
  }

  const { name, description } = frontmatter;
  if (!name) errors.push(`${displayPath}: missing name.`);
  if (!description) errors.push(`${displayPath}: missing description.`);
  if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    errors.push(`${displayPath}: name must use lowercase letters, digits, and single hyphens.`);
  }
  if (name && name.length > 64) errors.push(`${displayPath}: name exceeds 64 characters.`);
  if (description && (description.length < 20 || description.length > 1024)) {
    errors.push(`${displayPath}: description must contain 20-1024 characters.`);
  }
  if (name && basename(dirname(file)) !== name) {
    errors.push(`${displayPath}: parent directory must match name (${name}).`);
  }
  if (name && names.has(name)) errors.push(`${displayPath}: duplicate skill name ${name}.`);
  if (name) names.add(name);
}

try {
  const config = JSON.parse(await readFile(join(root, "skills.sh.json"), "utf8"));
  if (!Array.isArray(config.groupings) || config.groupings.length === 0) {
    errors.push("skills.sh.json: groupings must be a non-empty array.");
  } else {
    for (const [index, group] of config.groupings.entries()) {
      if (!group.title || !Array.isArray(group.skills) || group.skills.length === 0) {
        errors.push(`skills.sh.json: grouping ${index + 1} needs a title and at least one skill.`);
        continue;
      }
      for (const name of group.skills) {
        if (!names.has(name)) errors.push(`skills.sh.json: unknown skill ${name}.`);
      }
    }
  }
} catch (error) {
  errors.push(`skills.sh.json: ${error.message}`);
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${skillFiles.length} skill(s): ${[...names].join(", ")}`);

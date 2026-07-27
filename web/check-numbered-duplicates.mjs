import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('./src/', import.meta.url);
const numberedCopy = / \d+\.[^.]+$/;

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await collect(path));
    else if (numberedCopy.test(entry.name)) results.push(relative(root.pathname, path));
  }
  return results;
}

const duplicates = await collect(root.pathname);
if (duplicates.length) {
  console.error(`Found ${duplicates.length} numbered duplicate file(s):`);
  duplicates.forEach((path) => console.error(`- src/${path}`));
  process.exitCode = 1;
} else {
  console.log('Duplicate guard passed: no numbered copy files found in src.');
}

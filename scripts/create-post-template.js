#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function pad(n) {
  return n < 10 ? '0' + n : n;
}

const now = new Date();
const yyyy = now.getFullYear();
const mm = pad(now.getMonth() + 1);
const dd = pad(now.getDate());
const dateStr = `${yyyy}-${mm}-${dd}`;
const isoStr = now.toISOString();

const template = `---
title: ""
date: ${isoStr}
categories:
  - diary
tags:
  - life
---\n\n{{< image src=".jpg" title="" >}}
`;

const fileName = `${dateStr}.md`;
const postsDir = path.join(__dirname, '../posts');
const filePath = path.join(postsDir, fileName);

if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, template);
console.log(`Created: ${filePath}`);

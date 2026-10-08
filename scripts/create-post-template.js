#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const date = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const filePath = fileURLToPath(new URL("../posts/" + date + ".md", import.meta.url));
const template = `---
title: ""
date: "${date}"
categories:
  - diary
tags:
  - life
---

`;
try {
  writeFileSync(filePath, template, { flag: "wx" });
  console.log("Created: " + filePath);
} catch (error) {
  if (error instanceof Error && "code" in error && error.code === "EEXIST") {
    console.error("File already exists: " + filePath);
    process.exit(1);
  }
  throw error;
}

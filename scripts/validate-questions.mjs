#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const questionsPath = path.join(rootDir, "questions.json");

const questions = JSON.parse(fs.readFileSync(questionsPath, "utf8"));
const issues = [];

questions.forEach((question, index) => {
    const label = `Question ${index + 1}`;

    if (!question.en || !question.ja || !question.blankWord || !question.category) {
        issues.push(`${label}: required fields are missing.`);
        return;
    }

    const matchCount = countWholeWordMatches(question.en, question.blankWord);
    const blankOccurrence = Number.isInteger(question.blankOccurrence) ? question.blankOccurrence : 1;

    if (matchCount === 0) {
        issues.push(`${label}: blankWord "${question.blankWord}" does not match the sentence.`);
    }

    if (matchCount > 1 && !Number.isInteger(question.blankOccurrence)) {
        issues.push(`${label}: blankWord "${question.blankWord}" appears ${matchCount} times. Add blankOccurrence.`);
    }

    if (Number.isInteger(question.blankOccurrence) && blankOccurrence > matchCount) {
        issues.push(`${label}: blankOccurrence ${blankOccurrence} is larger than the number of matches (${matchCount}).`);
    }
});

if (issues.length > 0) {
    console.error(`Found ${issues.length} issue(s) in questions.json`);
    issues.forEach((issue) => {
        console.error(`- ${issue}`);
    });
    process.exitCode = 1;
} else {
    console.log(`Validated ${questions.length} questions. No issues found.`);
}

function countWholeWordMatches(text, word) {
    const matches = text.match(createWholeWordRegex(word));
    return matches ? matches.length : 0;
}

function createWholeWordRegex(word) {
    return new RegExp(`\\b${escapeRegExp(word)}\\b`, "g");
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const COURSES_PATH = path.join(ROOT, 'frontend/public/data/courses.json');
const COURSE_INDEX_PATH = path.join(ROOT, 'frontend/public/data/course-index.json');
const DETAIL_DIR = path.join(ROOT, 'frontend/public/data/courses');

const VALID_CATEGORIES = new Set([
  'freud',
  'jung',
  'modern',
  'eastern',
  'dream-science',
  'systems',
  'personality',
  'evolutionary',
  'developmental',
  'social',
  'behaviorism',
  'gestalt',
  'existential',
  'cbt',
  'clinical',
  'abnormal',
  'trauma',
  'positive',
  'mindfulness',
  'attachment',
  'humanistic',
  'health',
  'emotion',
  'neuropsychology',
  'neuroscience',
  'creativity',
  'educational',
  'child',
  'love',
  'forensic',
  'consumer',
  'sports',
  'thanatology',
  'applied',
  'frontier',
]);

const VALID_DIFFICULTIES = new Set(['beginner', 'core', 'intermediate', 'advanced', 'master']);
const REQUIRED_SECTION_GROUPS = [
  ['【案例引入】', '【案例导入】'],
  ['【理论阐释】', '【理论阐述】'],
  ['【反思与启发】', '【反思与实践】'],
];
const PLACEHOLDER_PATTERN = /TODO|待补充|占位|lorem|示例内容|coming soon/i;
const MIN_CHAPTER_CHARS = 900;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function compactCourse(course) {
  const { content: _content, chapters: _chapters, ...rest } = course;
  return rest;
}

function hasRequiredSections(body) {
  return REQUIRED_SECTION_GROUPS.every((markers) => markers.some((marker) => body.includes(marker)));
}

function main() {
  const courses = readJson(COURSES_PATH);
  const courseIndex = readJson(COURSE_INDEX_PATH);
  const detailFiles = fs.readdirSync(DETAIL_DIR).filter((file) => file.endsWith('.json'));
  const issues = [];
  const ids = new Map();
  let totalChars = 0;
  let totalChapters = 0;
  const categoryCounts = new Map();
  const difficultyCounts = new Map();
  const courseStats = [];

  if (!Array.isArray(courses)) issues.push('courses.json must be an array');
  if (!Array.isArray(courseIndex)) issues.push('course-index.json must be an array');

  courses.forEach((course) => {
    if (!Number.isInteger(course.id)) issues.push(`course missing numeric id: ${course.title || '<untitled>'}`);
    if (ids.has(course.id)) issues.push(`duplicate course id: ${course.id}`);
    ids.set(course.id, course);

    ['title', 'description', 'category', 'difficulty'].forEach((field) => {
      if (!course[field] || typeof course[field] !== 'string') issues.push(`course ${course.id} missing ${field}`);
    });
    if (!VALID_CATEGORIES.has(course.category)) issues.push(`course ${course.id} unknown category: ${course.category}`);
    if (!VALID_DIFFICULTIES.has(course.difficulty)) issues.push(`course ${course.id} unknown difficulty: ${course.difficulty}`);

    const content = Array.isArray(course.content) ? course.content : [];
    if (!Array.isArray(course.content)) issues.push(`course ${course.id} content must be an array`);
    if (course.chapter_count !== content.length) {
      issues.push(`course ${course.id} chapter_count ${course.chapter_count} != content.length ${content.length}`);
    }
    if (content.length < 4) issues.push(`course ${course.id} has fewer than 4 chapters`);

    categoryCounts.set(course.category, (categoryCounts.get(course.category) || 0) + 1);
    difficultyCounts.set(course.difficulty, (difficultyCounts.get(course.difficulty) || 0) + 1);

    let courseChars = 0;
    content.forEach((chapter, index) => {
      const label = `course ${course.id} chapter ${index + 1}`;
      if (!chapter.title || typeof chapter.title !== 'string') issues.push(`${label} missing title`);
      if (!chapter.body || typeof chapter.body !== 'string') issues.push(`${label} missing body`);
      if (chapter.order !== index + 1) issues.push(`${label} order ${chapter.order} should be ${index + 1}`);

      const body = chapter.body || '';
      const chars = body.length;
      courseChars += chars;
      totalChars += chars;
      totalChapters += 1;
      if (chars < MIN_CHAPTER_CHARS) issues.push(`${label} is too short: ${chars} chars`);
      if (PLACEHOLDER_PATTERN.test(body)) issues.push(`${label} contains placeholder text`);
      if (!hasRequiredSections(body)) issues.push(`${label} missing required course sections`);
    });

    courseStats.push({
      id: course.id,
      title: course.title,
      chapters: content.length,
      chars: courseChars,
    });
  });

  for (let id = 1; id <= 100; id += 1) {
    if (!ids.has(id)) issues.push(`missing course id: ${id}`);
  }

  if (detailFiles.length !== courses.length) {
    issues.push(`detail file count ${detailFiles.length} != course count ${courses.length}`);
  }

  courses.forEach((course) => {
    const detailPath = path.join(DETAIL_DIR, `${course.id}.json`);
    if (!fs.existsSync(detailPath)) {
      issues.push(`missing detail file: ${course.id}.json`);
      return;
    }
    const detail = readJson(detailPath);
    if (JSON.stringify(detail) !== JSON.stringify(course)) {
      issues.push(`detail file differs from courses.json: ${course.id}.json`);
    }
  });

  const indexById = new Map(courseIndex.map((course) => [course.id, course]));
  courses.forEach((course) => {
    const indexItem = indexById.get(course.id);
    if (!indexItem) {
      issues.push(`course-index missing course ${course.id}`);
      return;
    }
    if (indexItem.content) issues.push(`course-index course ${course.id} should not include full content`);
    if (JSON.stringify(indexItem) !== JSON.stringify(compactCourse(course))) {
      issues.push(`course-index metadata differs for course ${course.id}`);
    }
  });

  const shortestCourses = [...courseStats].sort((a, b) => a.chars - b.chars).slice(0, 10);
  const summary = {
    courses: courses.length,
    detailFiles: detailFiles.length,
    chapters: totalChapters,
    totalChars,
    avgCharsPerChapter: Math.round(totalChars / Math.max(totalChapters, 1)),
    avgCharsPerCourse: Math.round(totalChars / Math.max(courses.length, 1)),
    categories: Object.fromEntries([...categoryCounts.entries()].sort()),
    difficulties: Object.fromEntries([...difficultyCounts.entries()].sort()),
    shortestCourses,
    issuesCount: issues.length,
    issues,
  };

  console.log(JSON.stringify(summary, null, 2));
  if (issues.length > 0) process.exit(1);
}

main();

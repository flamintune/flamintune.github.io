const fs = require("fs").promises;
const path = require("path");

const pwd = process.cwd();
const targetDir = path.join(pwd, "dist", "posts");

function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontMatter, markdownContent] = match;
  const data = {};

  frontMatter.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      let value = valueParts.join(":").trim();
      // 处理数组
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1).split(",").map((item) => item.trim());
      } // 尝试解析日期
      else if (key.toLowerCase() === "date") {
        value = new Date(value);
      }
      data[key.trim()] = value;
    }
  });

  return { data, content: markdownContent.trim() };
}

async function getMarkdownFiles(dir) {
  const files = await fs.readdir(dir);
  return files.filter((file) => path.extname(file).toLowerCase() === ".md");
}

async function extractFrontMatter(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  const { data, content: markdownContent } = parseFrontMatter(content);
  return {
    ...data,
    file: path.basename(filePath),
    summary: markdownContent.split("\n")[0].slice(0, 200), // 使用文章的第一行作为摘要
  };
}

async function generatePostsJson() {
  try {
    const markdownFiles = await getMarkdownFiles(targetDir);
    const postsData = await Promise.all(
      markdownFiles.map((file) =>
        extractFrontMatter(path.join(targetDir, file))
      ),
    );

    // 按日期排序，最新的文章排在前面
    postsData.sort((a, b) => b.date - a.date);

    const jsonContent = JSON.stringify(postsData, null, 2);
    await fs.writeFile(path.join(targetDir, "list.json"), jsonContent);
    console.log("list.json has been generated successfully.");
  } catch (error) {
    console.error("Error generating list.json:", error);
  }
}

generatePostsJson();

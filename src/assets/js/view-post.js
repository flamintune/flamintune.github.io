// assets/js/view-post.js

document.addEventListener("DOMContentLoaded", () => {
  const postContent = document.getElementById("post-content");
  const urlParams = new URLSearchParams(window.location.search);
  const postFile = urlParams.get("post");
  if (!postFile) {
    postContent.innerHTML = "文章不存在";
    return;
  }
  
  fetch(`/posts/${postFile}`)
    .then((response) => response.text())
    .then((markdown) => {
      const { content: html } = parseFrontMatter(markdown);
      postContent.innerHTML = html;
      document.title = `不吃西红柿的博客 - ${extractTitle(markdown)}`;
    })
    .catch((error) => {
      console.error("Error loading post:", error);
      postContent.innerHTML = "加载文章失败，请稍后再试。";
    });
});

function extractTitle(markdown) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : "文章";
}

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
  
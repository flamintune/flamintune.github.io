const fs = require("fs");
const dirPath = "./_posts";
const keywords = [
  "hook",
  "elements",
  "lodash",
  "newline_css",
  "react",
  "render",
  "css",
  "框架",
];

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.log("read dir error");
    return;
  }

  files.forEach((file) => {
    for (const keyword of keywords) {
      if (file.includes(keyword)) {
        // todo rename file using mv
        const oldPath = `${dirPath}/${file}`;
        const newPath = `${dirPath}/_${file}`;
        fs.rename(oldPath, newPath, () => {});
      }
    }
  });
});

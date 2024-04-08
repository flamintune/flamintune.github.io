const thoughtsNode = document.querySelector("#thoughts");
thoughtsNode.addEventListener("click", flushNewThoughts);
const thoguhtsList = [
  "微积分",
  "线性代数",
  "算法",
  "和GPT一起头脑风暴",
  "英语",
  "钢琴",
  "人际关系",
];
let prev = 0
function flushNewThoughts(e) {
  const random = Math.floor(Math.random() * thoguhtsList.length);
  prev = prev === random ? (prev + 1) % thoguhtsList.length : random
  e.target.textContent = thoguhtsList[prev];
}

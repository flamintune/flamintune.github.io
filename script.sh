#!/bin/bash

# 遍历 src/js 目录下的所有 .js 文件
for f in src/js/*.js; do
  # 检查文件名是否以 .min.js 结尾
  if [[ $f != *.min.js ]]; then
    # 如果文件名不是以 .min.js 结尾
    # 使用 terser 压缩和混淆 JavaScript 文件
    # -o 选项指定输出文件，${f##*/} 获取文件名，%.* 替换文件扩展名
    filename=$(basename -- "$f")
    filename="${filename%.*}"
    # echo ${filename}
    terser "$f" -o "assets/js/${filename}.min.js" -c -m
  fi
done
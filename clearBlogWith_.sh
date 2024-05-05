#!/bin/bash

# 获取当前目录下的所有文件（不包含目录）
for file in *; do
  # 检查是否是文件
  if [ -f "$file" ]; then
    # 重命名文件，文件名前加上下划线
    mv "$file" "_$file"
  fi
done
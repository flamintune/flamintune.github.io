@echo off
FOR %%f IN ("src/js/*.js") DO (
    terser "src/js/%%f" -o "assets/js/%%~nf.min.js" -c -m
)
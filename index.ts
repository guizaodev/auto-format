import { $ } from "bun";
import path from "node:path";
import { fileURLToPath } from "node:url"; 
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputVideoPath = path.join(__dirname, 'origin', "input.mp4");
const outputVideoPath = path.join(__dirname, 'output', "output.mp4");
const inputBgPath = path.join(__dirname, 'src/assets', "bg.png");
const fontPath = path.join(__dirname, 'src/assets', "Inter.ttf");

await $`
    ffmpeg \
        -i ${inputBgPath} \
        -i ${inputVideoPath} \
        -filter_complex " \
            [1:v] scale=w=1080:h=-1 [scaled]; \
            [0:v][scaled] \
            overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2, \
            drawtext=fontfile=${fontPath}:text='Hello World':fontcolor=black:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2' \
            " \
        -pix_fmt yuv420p \
        -c:a copy \
        ${outputVideoPath}`;
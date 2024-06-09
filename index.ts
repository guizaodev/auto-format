import { $ } from "bun";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { question, toUnixPath } from '@/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputVideoPath = path.resolve(__dirname, 'origin', "input.mp4");
const outputVideoPath = path.resolve(__dirname, 'output', "output.mp4");
const inputBgPath = path.resolve(__dirname, 'src/assets', "bg.png");
const fontPath = toUnixPath(path.resolve(__dirname, 'src/assets', "Inter.ttf"));
const outputDir = path.dirname(outputVideoPath);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const main = async () => {

    console.log(fontPath)
    const text = await question('O que deve ser mostrado? ');
    console.log(`You chose: ${text}`);

    await $`
        ffmpeg \
            -y \
            -i ${inputBgPath} \
            -i ${inputVideoPath} \
            -filter_complex " \
                [1:v] scale=w=1080:h=-1 [scaled]; \
                [0:v][scaled] \
                overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2, \
                drawtext= \
                    fontfile=${fontPath}: \
                    text=${text}: \
                    fontcolor=black: \
                    fontsize=47: \
                    x=(w-text_w)/2: \
                    y=214 \
                " \
            -pix_fmt yuv420p \
            -c:a copy \
            ${outputVideoPath}`;
}

main();

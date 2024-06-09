import { createInterface } from 'readline';

export const question = (prompt: string): Promise<string> => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

export function toUnixPath(path: string): string {
    return path.replace(/\\/g, '/').replace(/:/g, '\\\\:');
}
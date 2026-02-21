export function renderProgress(current: number, total: number, label = '') {
    const barLength = 30;
    const percentage = current / total;
    const filled = Math.round(barLength * percentage);
    const empty = barLength - filled;

    const bar = "\x1b[32m█".repeat(filled) + '\x1b[0m░'.repeat(empty);
    const percentText = Math.round(percentage * 100);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
        `${label} [${bar}\x1b[0m] ${current}/${total} (${percentText}%)`
    );

    if (current === total) {
        process.stdout.write('\x1b[0m\n');
    }
}
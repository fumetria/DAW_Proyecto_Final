export function renderProgress(current: number, total: number, label = '') {
    const barLength = 30;
    const percentage = current / total;
    const filled = Math.round(barLength * percentage);
    const empty = barLength - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const percentText = Math.round(percentage * 100);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
        `${label} [${bar}] ${current}/${total} (${percentText}%)`
    );

    if (current === total) {
        process.stdout.write('\n');
    }
}
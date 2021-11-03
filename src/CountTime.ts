export function prettifyTime(time: number): string {
  return time < 1000 ? `${time}ms` : `${(time / 1000).toFixed(2)}s`;
}

export class CountTime {
  private static startTime: { [props: string]: number } = {};

  public static start(id = "__id__"): void {
    this.startTime[id] = Date.now();
  }

  public static end(id = "__id__"): string {
    if (!this.startTime[id]) return prettifyTime(0);
    const buildTime = Date.now() - this.startTime[id];
    delete this.startTime[id];
    return prettifyTime(buildTime);
  }
}

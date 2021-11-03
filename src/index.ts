import ora, { Ora } from "ora";
import * as readline from "readline";
import chalk, { Chalk } from "chalk";
import ProgressBar from "progress";
import { CountTime } from "./CountTime";

export class Logger {
  private spinner: Ora | null;
  private bar: ProgressBar | null;
  public silent: boolean;
  public chalk: Chalk;
  public countTime = CountTime;
  public constructor() {
    this.chalk = chalk;
    this.spinner = null;
    this.silent = false;
  }

  public progress(
    name: string,
    total: number | ProgressBar.ProgressBarOptions
  ) {
    if (typeof total !== "object") {
      total = {
        total,
        callback: () => {
          this.bar = null;
        },
      };
    } else {
      const callback = total.callback;
      total.callback = () => {
        callback && callback.call(this.bar, this.bar);
        this.bar = null;
      };
    }
    this.bar = new ProgressBar(
      `${name} [:bar] :current/:total :rate/bps :percent :etas`,
      total as ProgressBar.ProgressBarOptions
    );
    return this.bar;
  }

  public tick(tokens: any) {
    if (this.bar) {
      this.bar.tick(tokens);
    }
  }

  public success(message: string): void {
    if (this.silent) return;
    this.log(chalk.green.bold("√  ") + chalk.green(message));
  }

  public warn(message: string, code?: number): void {
    if (this.silent) return;
    this.stopSpinner();
    process.stderr.write(
      chalk.yellow.bold("‼  ") + chalk.yellow(message) + "\n"
    );
    code && process.exit(code);
  }

  public error(message: string | Error, code?: number): void {
    if (this.silent) return;
    this.stopSpinner();
    if (message instanceof Error && message.stack) {
      message = message.stack;
    }
    process.stderr.write(chalk.red.bold("×  ") + chalk.red(message) + "\n");
    code && process.exit(code);
  }

  public info(message: string): void {
    if (this.silent) return;
    this.stopSpinner();
    process.stderr.write(chalk.blue.bold("!  ") + chalk.blue(message) + "\n");
  }

  public clearLine(): void {
    readline.clearLine(process.stderr, 0);
    readline.moveCursor(process.stdout, 0, -1);
  }

  public clear(): void {
    if (process.stdout.isTTY) {
      const rows: number = process.stdout.rows || 0;
      const blank = "\n".repeat(rows);
      console.log(blank);
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearScreenDown(process.stdout);
    }
  }

  public log(message: string): void {
    if (this.silent) return;
    this.stopSpinner();
    process.stdout.write(message + "\n");
  }

  public write(message: any): void {
    if (this.silent) return;
    this.stopSpinner();
    process.stdout.write(message);
  }

  public loading(message: string): void {
    if (this.silent) return;
    const styledMessage = chalk.gray.bold(message);
    if (!this.spinner) {
      this.spinner = ora({
        text: styledMessage,
        stream: process.stdout,
      }).start();
    } else {
      this.spinner.text = styledMessage;
    }
  }

  public stopSpinner(): void {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  public stopLoading(): void {
    this.stopSpinner();
  }
}

export const logger = new Logger();

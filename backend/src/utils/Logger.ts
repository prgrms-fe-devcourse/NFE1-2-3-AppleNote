/* eslint-disable no-console */
import chalk from "chalk";

export class Logger {
  public static log = (args: unknown, hidden: boolean = false): void => {
    if (hidden) return;

    console.log(
      chalk.blue(`
[${new Date().toLocaleString()}]
[Log]:`),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
  };

  public static warn = (args: unknown, hidden: boolean = false): void => {
    if (hidden) return;

    console.log(
      chalk.yellow(`
[${new Date().toLocaleString()}]
[Info]:`),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  };

  public static error = (args: unknown, hidden: boolean = false): void => {
    if (hidden) return;

    console.log(
      chalk.red(`
[${new Date().toLocaleString()}]
[Warn]:`),
      typeof args === "string" ? chalk.redBright(args) : args
    );
  };

  public static success = (args: unknown, hidden: boolean = false): void => {
    if (hidden) return;

    console.log(
      chalk.green(`
[${new Date().toLocaleString()}]
[Success]:`),
      typeof args === "string" ? chalk.greenBright(args) : args
    );
  };
}

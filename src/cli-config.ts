import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { setupCommands } from "./commands";

const program = new Command();

program.version("1.0.0").description("Task Collector");

console.log(
  chalk.blue(figlet.textSync("Task Collector", { horizontalLayout: "full" }))
);

setupCommands(program);

export { program };

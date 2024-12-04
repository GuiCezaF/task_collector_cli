import { Command } from "commander";
import { promptUserForChoice } from "./menu";

export function setupCommands(program: Command) {
  program
    .description("Start the task menu")
    .action(() => {
      promptUserForChoice();
    });
}

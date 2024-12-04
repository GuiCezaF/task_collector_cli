import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";
import { getActiveTasks } from "../lib/getTasks";
import { createTable } from "../utils/config-table";

export function getActiveTasksCommand(program: Command) {
  program
    .command("get-active-tasks")
    .description("Retrieve active tasks")
    .action(async () => {
      const spinner = ora("Fetching active tasks...\n").start();

      try {
        const activeTasks = await getActiveTasks();
        const activeData = [
          ["Title", "Project", "Priority", "Due Date"],
          ...activeTasks.map(task => [task.title, task.project, task.priority, task.dueDate])
        ];

        createTable(activeData);
        spinner.succeed(chalk.green("Active tasks loaded successfully!"));
      } catch (error) {
        spinner.fail(chalk.red(`Error: ${error instanceof Error ? error.message : error}`));
      }
    });
}

import inquirer from "inquirer";
import chalk from "chalk";
import { getActiveTasks } from "../lib/getTasks";
import { syncTasks } from "../lib/getTasks";
import { createTable } from "../utils/config-table";
import ora from "ora";

export function promptUserForChoice() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: [
          "Get Active Tasks",
          "Get Finished Tasks",
          "Get All Tasks",
          "Sync Tasks",
        ],
      },
    ])
    .then(async (answers) => {
      const { choice } = answers;
      const spinner = ora(`Doing ${choice}...\n`).start();
      switch (choice) {
        case "Get Active Tasks":
          await getActiveTasksAndDisplay();
          spinner.succeed(chalk.green(" Active tasks loaded successfully!"));
          break;
        case "Get Finished Tasks":
          spinner.warn(chalk.yellow(" Get Finished Tasks, Not implemented yet"));
          spinner.stop();
          break;
        case "Get All Tasks":
          spinner.warn(chalk.yellow(" Get All Tasks, Not implemented yet"));
          spinner.stop();
          break;
        case "Sync Tasks":
          await syncTasksAndNotify();
          spinner.succeed(chalk.green(" Sync tasks successfully!"));
          break;
        default:
          spinner.fail(chalk.red("Invalid choice!"));
          spinner.stop();
          break;
      }
    });
}

async function getActiveTasksAndDisplay() {
  const activeTasks = await getActiveTasks();
  const activeData = [
    ["Title", "Project", "Priority", "Due Date"],
    ...activeTasks.map((task) => [task.title, task.project, task.priority, task.dueDate]),
  ];
  createTable(activeData);
  console.log(chalk.green("Active tasks loaded successfully!"));
}

async function syncTasksAndNotify() {
  await syncTasks();
  console.log(chalk.green("Tasks synchronized successfully!"));
}

#!/usr/bin/env bun

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import ora from "ora";
import { getActiveTasks, syncTasks } from "../src/lib/getTasks"; 
import { createTable } from "../src/utils/config-table";

program.version("1.0.0").description("Task Collector");

console.log(
  chalk.blue(figlet.textSync("Task Collector", { horizontalLayout: "full" }))
);

program.action(() => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: " Choose an option:",
        choices: [
          "Get Active Tasks",
          "Get Finished Tasks",
          "Get All Tasks",
          "Sync Tasks",
        ],
      },
    ])
    .then(async (result) => {
      const spinner = ora(`Doing ${result.choice}...\n`).start();
      
      try {
        switch (result.choice) {
          case "Get Active Tasks":
            const activeTasks = await getActiveTasks();
            const activeData = [
              ['Title', 'Project', 'Priority', 'Due Date'], 
              ...activeTasks.map(task => [task.title, task.project, task.priority, task.dueDate])
            ];
            createTable(activeData);
            spinner.succeed(chalk.green("Active tasks loaded successfully!"));
            break;

          case "Get Finished Tasks":
            console.log(chalk.yellow("Not implemented"));
            break;

          case "Get All Tasks":
            console.log(chalk.yellow("Not implemented"));
            break;

          case "Sync Tasks":
            await syncTasks();
            spinner.succeed(chalk.green(" Tasks synchronized successfully!"));
            break;

          default:
            spinner.fail(chalk.red("Invalid choice!"));
            break;
        }
      } catch (error) {

        spinner.fail(chalk.red(`Error: ${error}`));
      }
    });
});

program.parse(process.argv);

import type { Command } from "commander";

export function syncTasksCommand(program: Command){
  program
    .command("sync-tasks")
    .description("Synchronize tasks with the API")
    .action(async () => {
      console.log("Synchronize tasks");
    });

}
import chalk from "chalk";

type Tasks = {
  id: number,
  title: string,
  project: string,
  status: string,
  priority: string,
  description: string,
  dueDate: string,
  created_at: string,
  updated_at: string,
}
const API_URL = "localhost:3333/api"

export async function getActiveTasks(): Promise<Pick<Tasks, 'title' | 'project' | 'priority' | 'dueDate'>[]> {
  try {
    const res = await fetch(`${API_URL}/active-tasks`);

    if (!res.ok) {
      throw new Error(`Erro ao buscar as tasks ativas: ${res.statusText}`);
    }

    const tasks: Tasks[] = await res.json();

    return tasks.map(({ title, project, priority, dueDate }) => ({
      title,
      project,
      priority,
      dueDate,
    }));
  } catch (error) {
    console.error('Erro ao buscar as tasks ativas:', error);
    return [];
  }
}

export async function getAllTasks(): Promise<Tasks[]> {

  const res = await fetch(`${API_URL}/tasks`);
  const data = await res.json();
  
  return data;
}

export async function syncTasks(): Promise<void> {

  const res = await fetch(`${API_URL}/sync`);

  if (res.ok) {
    console.log(chalk.green("Tarefas sincronizadas com sucesso! ✅")); 
  }
  else {
    throw new Error("Failed to sync tasks");
  }
}
export async function getFinishedTasks(): Promise<Tasks[]> {

  const res = await fetch(`${API_URL}/finished-tasks`);
  const data = await res.json();
  
  return data;
}
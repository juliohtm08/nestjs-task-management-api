import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable() // Indica que essa classe pode ser injetada em outras partes do aplicativo como um serviço
export class TaskService {
  // Lista privada para armazenar as tarefas temporariamente em memória
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    // Adiciona a nova tarefa à lista de tarefas
    this.tasks.push(task);

    // Exibe a lista de tarefas no console (apenas para depuração)
    console.log(this.tasks);
  }
}

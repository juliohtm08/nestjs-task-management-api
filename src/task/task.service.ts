import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable() // Indica que essa classe pode ser injetada em outras partes do aplicativo como um serviço
export class TaskService {
  // Lista privada para armazenar as tarefas temporariamente em memória
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatusEnum.TO_DO;

    // Adiciona a nova tarefa à lista de tarefas
    this.tasks.push(task);
  }

  findById(id: string): TaskDto {
    // Filtra a lista para encontrar a tarefa com o ID correspondente
    const foundTask = this.tasks.filter((t) => t.id === id);

    // Se a tarefa for encontrada, retorna o primeiro elemento (único, pois IDs são únicos)
    if (foundTask.length) {
      return foundTask[0];
    }

    // Se a tarefa não for encontrada, lança uma exceção HTTP 404 (Not Found)
    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    // Filtra a lista de tarefas com base nos parâmetros recebidos na requisição
    return this.tasks.filter((t) => {
      let match = true;

      // Filtra por título, se o parâmetro 'title' for fornecido
      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }

      // Filtra por status, se o parâmetro 'status' for fornecido
      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  update(task: TaskDto) {
    // Encontra o índice da tarefa na lista com base no ID
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      // Se a tarefa for encontrada, atualiza os dados na posição correspondente
      this.tasks[taskIndex] = task;
      return;
    }

    // Se a tarefa não for encontrada, lança uma exceção HTTP 400 (Bad Request)
    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    // Encontra o índice da tarefa na lista com base no ID
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      // Se a tarefa for encontrada, remove-a da lista
      this.tasks.splice(taskIndex, 1);
      return;
    }

    // Se a tarefa não for encontrada, lança uma exceção HTTP 400 (Bad Request)
    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

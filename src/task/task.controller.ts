import { Body, Controller, Post } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task') // Define um controlador para a rota '/task'
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post() // Define um endpoint HTTP POST para criar uma nova tarefa
  create(@Body() task: TaskDto) {
    // Recebe os dados da requisição no corpo e os passa para o serviço de tarefas
    this.taskService.create(task);
  }
}

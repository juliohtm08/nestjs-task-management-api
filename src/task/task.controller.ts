import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task') // Define um controlador para a rota '/task'
export class TaskController {
  // Injeta o serviço de tarefas no controlador para gerenciar as operações relacionadas
  constructor(private readonly taskService: TaskService) {}

  @Post() // Define um endpoint HTTP POST para criar uma nova tarefa
  create(@Body() task: TaskDto) {
    // Recebe os dados da requisição no corpo e os passa para o serviço de tarefas
    this.taskService.create(task);
  }

  @Get('/:id') // Define um endpoint HTTP GET para buscar uma tarefa pelo ID
  findById(@Param('id') id: string): TaskDto {
    // Extrai o parâmetro 'id' da URL e chama o serviço para encontrar a tarefa correspondente
    return this.taskService.findById(id);
  }

  @Get() // Define um endpoint HTTP GET para buscar todas as tarefas com parâmetros opcionais de filtro
  findAll(@Query() params: FindAllParameters): TaskDto[] {
    // Passa os parâmetros opcionais de busca para o serviço e retorna a lista de tarefas filtradas
    return this.taskService.findAll(params);
  }

  @Put() // Define um endpoint HTTP PUT para atualizar uma tarefa existente
  update(@Body() task: TaskDto) {
    // Recebe os dados atualizados da tarefa no corpo da requisição e os passa para o serviço
    this.taskService.update(task);
  }

  @Delete('/:id') // Define um endpoint HTTP DELETE para remover uma tarefa pelo ID
  remove(@Param('id') id: string) {
    // Chama o serviço para remover a tarefa com base no ID fornecido
    return this.taskService.remove(id);
  }
}

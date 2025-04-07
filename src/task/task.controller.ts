import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  // Injeta o serviço de tarefas no controlador para gerenciar as operações relacionadas
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    // Recebe os dados da requisição no corpo e os passa para o serviço de tarefas
    return await this.taskService.create(task);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    // Extrai o parâmetro 'id' da URL e chama o serviço para encontrar a tarefa correspondente
    return await this.taskService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    // Passa os parâmetros opcionais de busca para o serviço e retorna a lista de tarefas filtradas
    return await this.taskService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    // Recebe os dados atualizados da tarefa no corpo da requisição e os passa para o serviço
    await this.taskService.update(params.id, task);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    // Chama o serviço para remover a tarefa com base no ID fornecido
    return await this.taskService.remove(id);
  }
}

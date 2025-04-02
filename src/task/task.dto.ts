// DTO (Data Transfer Object) para representar uma tarefa
export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: string;
}

// Interface para os parâmetros de busca ao listar tarefas
export interface FindAllParameters {
  title: string;
  status: string;
}

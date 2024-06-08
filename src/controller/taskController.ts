import { Request, Response } from 'express';
import Tarefa from '../models/tarefa'; 

class TaskController {
  static createTask(req: Request, res: Response): void {
    res.render('tasks/create');
  }

  static async createTaskSave(req: Request, res: Response): Promise<void> {
    const { nome, descricao, prioridade } = req.body;


    try {
      const tarefa = { nome, descricao, prioridade };
      await Tarefa.create(tarefa);
      res.redirect(`/tasks`);
    } catch (err) {
      res.status(500).send('Erro ao criar a tarefa');
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;

    try {
      const task = await Tarefa.findOne({ where: { id: id }, raw: true });
      if (task) {
        res.render('tasks/edit', { task });
      } else {
        res.status(404).send('Tarefa não encontrada');
      }
    } catch (err) {
      res.status(500).send('Erro interno do servidor');
    }
  }

  static async updateTaskPost(req: Request, res: Response): Promise<void> {
    const id: number = +req.body.id;
  
    const tarefa = {
      nome: req.body.nome, 
      descricao: req.body.descricao 
    };
  
    try {
      await Tarefa.update(tarefa, { where: { id: id } });
      res.redirect('/tasks');
    } catch (err) {
    }
  }

  static async showTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await Tarefa.findAll({ raw: true });
      res.render('tasks/all', { tasks });
    } catch (err) {
      res.status(500).send('Erro ao exibir as tarefas');
    }
  }

static async deleteTask(req: Request, res: Response): Promise<Response> {
  const id: string = req.params.id;

  try {
      const task = await Tarefa.findOne({ where: { id: id } });
      if (!task) {
          return res.status(404).send('Tarefa não encontrada');
      }
      
      await Tarefa.destroy({ where: { id: id } });
      return res.status(200).send('Tarefa excluída com sucesso');
  } catch (err) {
      return res.status(500).send('Erro ao excluir a tarefa');
  }
}


  static async toggleTaskStatus(req: Request, res: Response): Promise<void> {
    const id: string = req.body.id;
    const nome: string = req.body.nome;
    const descricao: string = req.body.descricao;
    const prioridade: string = req.body.prioridade;
    const finalizada: boolean = req.body.finalizada === 'on';

    try {
        await Tarefa.update({ 
            nome: nome,
            descricao: descricao,
            prioridade: prioridade,
            finalizada: finalizada
        }, { where: { id: id } });
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).send('Erro ao atualizar a tarefa');
    }
  }

  
}

export default TaskController;

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async getAllTask(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getById(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  createTask(body: Task): Promise<Task> {
    return this.prisma.task.create({ data: body });
  }

  async updateTask(id: number, body: Task): Promise<Task> {
    await this.getById(id);
    return this.prisma.task.update({ where: { id }, data: body });
  }

  async deleteTask(id: number): Promise<Task> {
    await this.getById(id);
    return this.prisma.task.delete({ where: { id } });
  }
}

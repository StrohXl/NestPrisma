import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreate } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  getTask() {
    return this.taskService.getAllTask();
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
     return await this.taskService.getById(Number(id));
  }

  @Post()
  createTask(@Body() body: TaskCreate) {
    return this.taskService.createTask(body);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() body: TaskCreate) {
    return this.taskService.updateTask(Number(id), body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
}

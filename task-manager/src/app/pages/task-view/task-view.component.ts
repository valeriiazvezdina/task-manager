import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IList } from 'src/app/models/list.model';
import { ITask } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  public lists?: IList[];
  public tasks?: ITask[];

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['listId']) {
        this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = undefined;
      }
      });
    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    });
  }

  public onTaskClick(task: ITask): void {
    this.taskService.completeTask(task).subscribe(() => {
      task.completed = !task.completed;
    })
  }
}

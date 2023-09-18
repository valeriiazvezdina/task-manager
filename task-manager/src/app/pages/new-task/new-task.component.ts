import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ITask } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public listId: string = '';

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.listId = params['listId'];
    });
  }

  public addNewTask(title: string): void {
    this.taskService.addTask(this.listId, title).subscribe((newTask: ITask) => {
      this.router.navigate(['/lists', this.listId]);
    });
  }
}

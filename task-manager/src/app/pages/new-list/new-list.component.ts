import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IList } from 'src/app/models/list.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  constructor(private taskService: TaskService, private router: Router) {};

  public createNewList(title: string): void {
    this.taskService.createList(title).subscribe((response: IList) => {
      this.router.navigate(['/lists', response._id])
    });
  };
}

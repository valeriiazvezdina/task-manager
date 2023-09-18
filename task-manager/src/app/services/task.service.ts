import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { IList } from '../models/list.model';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequest: WebRequestService) { }

  public createList(title: string): Observable<IList> {
    return this.webRequest.post('lists', { title }) as Observable<IList>;
  }

  public getLists(): Observable<IList> {
    return this.webRequest.get('lists') as Observable<IList>;
  }

  public getTasks(listId: string): Observable<ITask> {
    if (listId) return this.webRequest.get(`lists/${listId}/tasks`) as Observable<ITask>;
    else return new Observable<{}> as Observable<ITask>;
  }

  public addTask(listId:string, title: string): Observable<ITask> {
    return this.webRequest.post(`lists/${listId}/tasks`, { title }) as Observable<ITask>;
  }

  public completeTask(task: ITask): Observable<ITask> {
    return this.webRequest.patch(`lists/${task._listId}/tasks/${task._id}`, { completed: !task.completed }) as Observable<ITask>;
  }
}

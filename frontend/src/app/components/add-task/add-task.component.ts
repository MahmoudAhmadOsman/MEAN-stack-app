import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { UserService } from "../../services/user.service";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  name: string;
  done: boolean;
  owner: string;

  constructor(
    private _tasks: TasksService,
    private _userService: UserService,
    private _router: Router,
    private _flash: FlashMessagesService
  ) {}

  ngOnInit() {
    const user = this._userService.getCurrentUser();
    this.owner = user.id;
    this.done = false;
  }

  onAddTask() {
    if (!this.name) {
      this._flash.show("Task name is requried", { cssClass: "alert-danger" });
      return false;
    }

    const task = {
      name: this.name,
      owner: this.owner,
      done: this.done,
    };

    this._tasks.saveTask(task).subscribe((resp) => {
      this._flash.show("Task Saved", { cssClass: "alert-success" });
      this._router.navigate(["/main"]);
    });
  }
}

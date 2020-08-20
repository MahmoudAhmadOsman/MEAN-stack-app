import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { TasksService } from "../../services/tasks.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  tasks: any;

  constructor(
    private _taskService: TasksService,
    private _userService: UserService,
    private _flash: FlashMessagesService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._fetchTasks();
  }

  deleteTask(taskId) {
    this._taskService.deleteTask(taskId).subscribe((resp) => {
      if (!resp.success) {
        this._flash.show(resp.message, { cssClass: "alert-danger " });
      } else {
        this._fetchTasks();
        this._flash.show("Task Deleted", { cssClass: "alert-success " });
      }

      this._router.navigate(["/main"]);
    });
  }

  editTask(taskId) {
    //TODO: Assignment: Implment Edit
    this._flash.show(
      "This method is left as an assignment. Try to implement it",
      { cssClass: "alert-info" }
    );
    return false;
  }

  private _fetchTasks() {
    const currentUser = this._userService.getCurrentUser();
    const query = { owner: currentUser.id };
    this._taskService.getTasks(query).subscribe((resp) => {
      this.tasks = resp.tasks;
    });
  }
}

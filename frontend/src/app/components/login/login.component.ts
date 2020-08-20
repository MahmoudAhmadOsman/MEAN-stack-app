import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { UserService } from "../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _userService: UserService,
    private _flash: FlashMessagesService,
    private _router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    if (!this.email || !this.password) {
      this._flash.show("All fields are required", { cssClass: "alert-danger" });
      return false;
    }

    const user = {
      email: this.email,
      password: this.password,
    };

    this._userService.auth(user).subscribe((resp) => {
      if (!resp.success) {
        this._flash.show(resp.message, { cssClass: "alert-danger" });
        return false;
      }

      this._userService.saveUserDate(resp.token, resp.user);
      this._router.navigate(["/main"]);
    });
  }
}

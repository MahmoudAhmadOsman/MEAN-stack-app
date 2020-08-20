import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  constructor(
    private _flash: FlashMessagesService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {}

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this._flash.show("All fields are required", { cssClass: "alert-danger" });
      return false;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this._userService.createAccount(user).subscribe((resp) => {
      if (!resp.success) {
        this._flash.show(resp.message, { cssClass: "alert-danger" });
        return false;
      }

      this._flash.show("Account was created", { cssClass: "alert-success" });
      return this._router.navigate(["/login"]);
    });
  }
}

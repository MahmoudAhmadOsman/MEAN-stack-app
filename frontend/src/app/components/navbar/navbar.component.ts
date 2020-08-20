import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit() {}

  onLogOutClicked() {
    this._userService.logOut();
    this._router.navigate(["/login"]);
    return false;
  }
}

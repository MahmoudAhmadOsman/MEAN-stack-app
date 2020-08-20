import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { AddTaskComponent } from "./components/add-task/add-task.component";

import { UserService } from "./services/user.service";
import { TasksService } from "./services/tasks.service";

import { AuthGuard } from "./guards/auth.guard";

const AppRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "addTask", component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    FlashMessagesModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    UserService,
    TasksService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

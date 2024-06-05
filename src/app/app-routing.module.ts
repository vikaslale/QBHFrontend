import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashaboardComponent } from "./component/dashaboard/dashaboard.component";
import { AddUserComponent } from "./component/add-user/add-user.component";
import { NotfoundComponent } from "./component/notfound/notfound.component";

import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  { path: "", component: DashaboardComponent },
  //{ path: "register", component: RegistrationComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        component: DashaboardComponent,
        // canActivate: [AuthGuard],
      },
      {path: "adduser", component: AddUserComponent}
       //canActivate: [AuthGuard]}
    ],
  },

  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

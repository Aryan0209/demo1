import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ModalModule } from "ngx-bootstrap/modal";
import { ResetComponent } from "./modals/reset/reset.component";
import { BadgeModule } from "primeng/badge";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { MessagesModule } from "primeng/messages";
import { ScrollPanelModule } from "primeng/scrollpanel";

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    ResetComponent
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule,
    RouterModule,
    BadgeModule,
    OverlayPanelModule,
    MessagesModule,
    ScrollPanelModule,
  ],
})
export class CommonItemModule {}

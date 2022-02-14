import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/tokens/session.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

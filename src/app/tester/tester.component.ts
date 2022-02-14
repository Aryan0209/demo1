import { Component, OnInit } from '@angular/core';
import { SessionService } from '../tokens/session.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.sass'],
})
export class TesterComponent implements OnInit {
  user: any;
  user_: any;
  constructor(private ssn: SessionService) {}

  ngOnInit(): void {
    this.user = this.ssn.getTrans_legal();
    this.user_ = JSON.stringify(this.user);
  }
}

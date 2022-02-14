import { Component, Input, OnInit } from '@angular/core';
import { LegalFormViewService } from '../legal-form-view/legal-form-view.service';

@Component({
  selector: 'app-dailog-table',
  templateUrl: './dailog-table.component.html',
  styleUrls: ['./dailog-table.component.sass']
})
export class DailogTableComponent implements OnInit {

  @Input() f_id
  @Input() uid
  logs: any

  constructor(
    private svs: LegalFormViewService
  ) { }

  ngOnInit(): void {
    this.logs = this.svs.getRemarkLog(this.f_id, "4", this.uid).subscribe(res => (this.logs = res))
  }

}

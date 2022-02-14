import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/tokens/session.service';
import { LegalFormViewService } from '../../legal-form-view/legal-form-view.service';
import { remarkLogModel } from '../../table-ld/remark-log-model';

@Component({
  selector: 'app-cs-table',
  templateUrl: './cs-table.component.html',
  styleUrls: ['./cs-table.component.sass']
})
export class CsTableComponent implements OnInit {


  @Input() remarkLogs: remarkLogModel[];
  @Input() initialFormData: any
  @Input() role: String;
  @Input() fState: Number
  @Input() u_id
  @Input() state: string

  lockedCustomers: any[];
  filesToShow = []
  showModal: boolean = false;

  // lockedCustomers: any[];
  navigateOnClick = () => {
    // this.router.navigate(['/init/form'], { state: { initialFormData: this.initialFormData } })
  }

  getStatus(status: number) {
    if (status === 1) {
      return 'Initiated';
    }
    if (status === 2) {
      return 'Approved.';
    }
    if (status === 3) {
      return 'Approved. ';
    }
    if (status === 11) {
      return "CS Draft submit"
    }
    if (status === 12) {
      return "Approved "
    }
    if (status === 13) {
      return "Please add closure doc"
    }
    if (status === 22) {
      return "Reconsider"
    }
    if (status === 5) {
      return "Rejected"
    }
  }

  rowGroupMetadata: any;

  constructor(
    private router: Router,
    private viewService: LegalFormViewService,
    private session: SessionService
  ) { }

  ngOnInit() {
    console.log(this.remarkLogs)
  }
  show(index) {
    this.filesToShow = []
    let forRemark = this.remarkLogs[index]
    forRemark.assets.forEach(asset => {
      if (asset.asset_type === 'legaldocs_drafts') this.filesToShow.push(asset.value2)
      if (asset.asset_type === 'legaldocs_Optional_doc') this.filesToShow.push(asset.value4)
    })
    console.log(this.filesToShow)
    return this.showModal = true;
  }
  public iconList = [ // array of icon class list based on type
    { type: "xlsx", icon: "fa fa-5x  fa-file-excel-o" },
    { type: "pdf", icon: "fa fa-5x  fa-file-pdf-o" },
    { type: "jpg", icon: "fa fa-5x  fa-file-image-o" },
    { type: "png", icon: "fa fa-5x  fa-file-image-o" },
    { type: "jpeg", icon: "fa fa-5x  fa-file-image-o" },
    { type: "svg", icon: "fa fa-5x  fa-file-image-o" },
    { type: "docx", icon: "fa fa-5x  fa-file-word-o" },
  ];
  getFileData(filename) { // this will give you icon class name
    let ext = filename.split(".").pop();
    let name = filename.split('/').pop();
    let data = {
      icon: 'fa fa-5x fa-file-o',
      name
    }
    let obj = this.iconList.filter(i => {
      if (i.type === ext) {
        return true;
      }
    });
    if (obj.length > 0) {
      let icon = obj[0].icon;
      data.icon = icon;
    } else {
      data.name = name;
    }
    return data
  }
  onOpen(file) {
    setTimeout(() => window.open(file), 500);
  }
}
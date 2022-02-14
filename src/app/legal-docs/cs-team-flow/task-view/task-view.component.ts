import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// //activated route
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/tokens/session.service';
import { LegalFormViewService } from '../../legal-form-view/legal-form-view.service';
// import { CsTeamMember } from '../models/CSTeamMember';
import LegalFormDetails from '../../models/LegalFormDetails';
import { CsTeamService } from '../cs-team.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.sass']
})



export class CsTaskViewComponent implements OnInit {
  public ID: string;
  public formInfo: LegalFormDetails
  public username: string;
  public remarks: string = ""
  public remarkLog: any[]
  public userRole: string;
  public showStatusButtons: boolean;
  public showSpinner: boolean = false
  @ViewChild('fileInput') inputEl: ElementRef;
  public formData: FormData = new FormData()
  public f_state: Number
  public files: any[] = [];
  public AUTH_ID: Number
  public showUploadModal: boolean = false
  public showFileModal: boolean = false
  public filesToShow: any[] = []
  public loading: boolean = false
  private otherPartyFormControls = ['other_party1', 'other_party2', 'other_party3', 'other_party4']
  public numOfOtherParties = 0
  public other_parties: string[] = []
  public submitProcess: boolean = false

  upload(event) {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.formData.append('draft_attachments', inputEl.files.item(i));
      }
      for (let f of event.target.files) {
        this.files.push(f.name);
      }
    }
  }

  selectFiles(event) {
    console.log('z', event.files)
    console.log('x', event.currentFiles)
    let fileCount: number = event.currentFiles.length;
    if (fileCount) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.files.push(event.currentFiles[i]);
      }
    }
    console.log(this.files)
  }

  toggleUpload(event) {
    event.preventDefault()
    this.showUploadModal = true
  }

  attachFiles() {
    let fileCount: number = this.files.length;
    if (fileCount) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.formData.append('draft_attachments', this.files[i]);
      }
    }
  }
  removeFile(event) {
    const index = this.files.indexOf(event.file);
    this.files.splice(index, 1);
  }
  close(event, mode = 0) {
    if (mode === 1)
      this.toastr.success("File upload", 'Successful')
    console.log('here closing')
    this.showUploadModal = false
  }

  constructor(
    private route: ActivatedRoute,
    private formDetailsService: LegalFormViewService,
    private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private csServices: CsTeamService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ID = this.route.snapshot.paramMap.get('id');
    this.AUTH_ID = this.session.getTrans_legal().loginId
    this.userRole = this.session.getTrans_legal().role;
    this.username = this.session.getTrans_legal().firstname + " " + this.session.getTrans_legal().lastname;
    this.loading = true

    this.formDetailsService.getDetail(Number(this.ID), this.AUTH_ID).subscribe((res) => {
      this.formInfo = res[0]
      this.other_parties = this.otherPartyFormControls.filter(c => {
        return this.formInfo[c] !== "null"
      })
      console.log(this.other_parties)
      this.numOfOtherParties = this.other_parties.length
      this.formDetailsService.getRemarkLog(this.formInfo.userable_id, "66", this.AUTH_ID).subscribe(res => {
        if (res) this.remarkLog = res
        this.loading = false
      })
      console.log("Assets", this.formInfo.assets)
    })

    this.f_state = history.state.state
    this.f_state = Number(this.route.snapshot.paramMap.get('st'))
    console.log(this.f_state)
    console.log(this.formInfo)

  }

  open(file) {
    setTimeout(() => window.open(file), 500);
  }

  onOpen(mode) {
    this.filesToShow = []
    this.showFileModal = true
    if (mode === 2) this.formInfo.assets.forEach(a => {
      if (a.asset_type === "legaldocs_drafts") return this.filesToShow.push(a.value2)
    })
    if (mode === 3) this.formInfo.assets.forEach(a => {
      if (a.asset_type === "legaldocs_signed_copy") return this.filesToShow.push(a.value3)
    })
    if (mode === 4) this.formInfo.assets.forEach(a => {
      if (a.asset_type === "legaldocs_Optional_doc") return this.filesToShow.push(a.value4)
    })
    this.formInfo.assets.forEach(asset => {
      console.log(asset, mode)
      if (mode === 1 && (asset.asset_type === "legaldocs_dept" || asset.asset_type === 'legaldocs')) return this.filesToShow.push(asset.value)
    })
  }

  calcNumberOfAssets(filter: string) {
    let filtered = this.formInfo.assets.filter(asset => asset.asset_type === filter).length
    return filtered
  }


  openDocument(path: string) {
    const iframe =
      "<iframe width='100%'style='transform:scale(0.5)'height='100%' src='" +
      path +
      "'></iframe>";
    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
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
  public supportedFormats = ['xlsx', 'pdf', 'jpg', 'png', 'jpeg', 'svg', 'docx']
  getFileData(filename) { // this will give you icon class name
    let ext = filename.split(".").pop();
    let name = filename.split('/').pop()
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

  onSubmit = async () => {
    this.showSpinner = true;
    this.submitProcess = true
    this.attachFiles()
    this.formData.append('remark', this.remarks);
    this.formData.append('form_id', String(this.formInfo.id));
    this.formData.append('userable_id', String(this.formInfo.userable_id));
    this.formData.append('remark_by', this.username);
    this.formData.append('role', this.userRole);
    this.formData.append('user_id', String(this.AUTH_ID))

    if (this.f_state === 22)
      await this.csServices.respondTorecon(String(this.formInfo.id), this.formData, this.AUTH_ID).subscribe(res => {
        if (res.message) {
          this.toastr.success(res.message);
          this.router.navigate(['history']).then(() => window.location.reload)
        }
        else this.toastr.error(res.message)
        this.router.navigate(['/history']).then(() => window.location.reload)
      }, err => {
        this.toastr.error("Something went wrong")
        console.error(err)
        this.submitProcess = false
      }, () => {
        this.showSpinner = false;
        this.submitProcess = false
      })
    else {
      this.submitProcess = true
      await this.csServices.approveCsTodo(this.formData, this.AUTH_ID).subscribe(res => {
        if (res.message) {
          this.toastr.success(res.message);
          this.router.navigate(['history']).then(() => window.location.reload)
        }
        else this.toastr.error(res)
        this.router.navigate(['/history']).then(() => window.location.reload)
      }, err => {
        this.toastr.error("Something went wrong")
        console.error(err)
        this.submitProcess = false
        // this.router.navigate(['/history']).then(() => window.location.reload)
      }, () => {
        this.submitProcess = false
        this.showSpinner = false;
      })
    }
  }
}
// //end param is main status
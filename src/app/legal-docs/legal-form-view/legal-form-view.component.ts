import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
//activated route
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/tokens/session.service';
import { environment } from 'src/environments/environment';
import { CsTeamMember } from '../models/CSTeamMember';
import LegalFormDetails from '../models/LegalFormDetails';
import { OKLogin } from '../models/OkLogin';
import { LegalFormViewService } from './legal-form-view.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-legal-form-view',
  templateUrl: './legal-form-view.component.html',
  styleUrls: ['./legal-form-view.component.sass']
})



export class LegalFormViewComponent implements OnInit {
  public f_state: Number
  public ID: string;
  public formInfo: LegalFormDetails
  public username: string;
  public remarks: string = ""
  public remarkLog: any[]
  public userRole: string;
  public showStatusButtons: boolean;
  public url: string = environment.legal_api + '/legaldocform/'
  public csTeamMembers: CsTeamMember[] = []
  public allotedCsMemberId: string;
  public files: any[] = [];
  @ViewChild('fileInput') inputEl: ElementRef;
  public formData: FormData = new FormData()
  public authUser: OKLogin
  public AUTH_ID: Number
  public flag: boolean
  public contactDetails: any
  public submit_process: boolean = false
  public reconWithAttachFlag: boolean = false
  public hod2AllowStates = []
  public showFileModal: boolean = false
  public showUploadModal: boolean = false
  public filesToShow: any[] = [];
  public loading: boolean = false
  public closureAttached: boolean = false
  private otherPartyFormControls = ['other_party1', 'other_party2', 'other_party3', 'other_party4']
  public numOfOtherParties = 0
  public other_parties: string[] = []

  constructor(
    private route: ActivatedRoute,
    private formDetailsService: LegalFormViewService,
    private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.ID = this.route.snapshot.paramMap.get('formId');
    this.authUser = this.session.getTrans_legal()
    this.AUTH_ID = this.session.getTrans_legal().loginId
    this.userRole = this.authUser.role;
    this.username = this.authUser.firstname + " " + this.authUser.lastname;
    this.loading = true
    this.formDetailsService.getDetail(Number(this.ID), this.AUTH_ID).subscribe(res => {
      this.formInfo = res[0]
      this.contactDetails = res[1][0]
      console.log(this.contactDetails)
      this.formDetailsService.getRemarkLog(this.formInfo.userable_id, "66", this.AUTH_ID).subscribe(res => {
        if (res) this.remarkLog = res
        this.loading = false
      })
      console.log(this.formInfo)
      this.other_parties = this.otherPartyFormControls.filter(c => {
        return this.formInfo[c] !== "null"
      })
      console.log(this.other_parties)
      this.numOfOtherParties = this.other_parties.length
    })
    if (this.userRole === "hod2") this.formDetailsService.getCSMembers(this.AUTH_ID).subscribe(res => (this.csTeamMembers = res))
    this.f_state = history.state.state
    this.f_state = Number(this.route.snapshot.paramMap.get('st'))
    let hod2Arr = [2, 12]

    this.showStatusButtons = (this.userRole === "hod1" && this.f_state === 1) || (this.userRole === "hod2" && hod2Arr.includes(this.f_state as number));
    this.flag = (this.f_state === 11 && this.userRole === 'initiator') || (this.f_state === 12 && this.userRole === "hod2")



  }

  onOpen(file) {
    setTimeout(() => window.open(file), 500);
  }

  filter(filter: string) {
    this.filesToShow = []
    if (filter === 'legaldocs_drafts') {
      this.formInfo.assets.forEach(asset => {
        if (asset.asset_type === filter) this.filesToShow.push(asset.value2)
      })
    }
    if (filter === 'legaldocs_signed_copy') {
      this.formInfo.assets.forEach(asset => {
        if (asset.asset_type === filter) this.filesToShow.push(asset.value3)
      })
    }
    if (filter === 'legaldocs_dept') {
      console.log(this.formInfo.assets)
      this.formInfo.assets.forEach(asset => {
        console.log(asset)
        if (asset.asset_type === filter || asset.asset_type === 'legaldocs') return this.filesToShow.push(asset.value)
      })
    }
    console.log(this.filesToShow)
    return this.showFileModal = true
  }

  calcNumberOfAssets(filter: string) {
    let filtered = this.formInfo.assets.filter(asset => asset.asset_type === filter).length
    return filtered
  }

  calcState(act) {
    if (act === "app") {
      return this.userRole === "hod1" ? 2 : 3
    }
    if (act === "rej") return 5
    if (act === "recon") return this.userRole === "hod1" ? 4 : 6
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



  uploadCDoc() {

    let fileCount: number = this.files.length;
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {

        if (this.f_state === 11) {
          this.formData.append('optional_doc', this.files[i]);
          this.reconWithAttachFlag = true

        }
        else {
          this.formData.append('signed_copy', this.files[i])
          this.closureAttached = true
        };
      }

    }
    console.log("flag for optional ,, closure", this.reconWithAttachFlag, this.closureAttached)
  }
  /////////////////////////////////////////////////////////////////////
  calcMainStatus = (act) => {
    if (act === 'rej') return 5
    if (act === 'recon') return 4
    else return this.formInfo.status
  }

  attachClosureOrReconDoc(mode = 0) {
    this.submit_process = true
    this.uploadCDoc()
    this.formData.append('role', this.userRole)
    this.formData.append('userable_id', String(this.formInfo.userable_id))
    this.formData.append('remark_by', this.username)
    this.formData.append('form_id', String(this.formInfo.id))
    console.log(this.formData.getAll('optional_doc'))
    if (this.reconWithAttachFlag) return

    if (this.closureAttached) {
      console.log("calling closure api")
      this.formDetailsService.attachClosureDoc(this.formData, this.AUTH_ID).subscribe(res => {
        if (res) this.toastr.success("Attachment submitted")
        else this.toastr.error('Something went wrong!')
        setTimeout(() => {
          this.router.navigate(['/history']).then(() => (window.location.reload()))
        }, 2000);
      }, err => {
        this.toastr.error('Something went wrong!')
        window.location.reload()
        this.submit_process = false
      }, () => this.submit_process = false)
    }
  }

  changeFormStatus(action: "app" | "rej" | "recon") {  //for init-hod1-hod2
    if (this.f_state === 12 && this.userRole === 'hod2') return this.respondDraft(action)

    console.log(this.remarks, this.allotedCsMemberId)
    if (action === "app" && this.userRole === "hod2" && (!this.remarks || !this.allotedCsMemberId)) return alert("Please add remarks and allot CS Member")
    if (action !== "app" && this.remarks === "") return alert("Please add remarks.")

    const stateChange = this.calcState(action)
    const mainStatus = this.calcMainStatus(action)
    this.submit_process = true
    this.formDetailsService.changeDocStatus(this.ID, stateChange, this.remarks, this.username, mainStatus, this.allotedCsMemberId, this.AUTH_ID).subscribe(res => {
      if (res) {
        this.toastr.success("Form status is now changed.")
        setTimeout(() => {
          this.submit_process = false
          this.router.navigate(['/history']).then(() => (window.location.reload()))
        }, 2000);
      }
      else this.toastr.error('Something went wrong!')

    }, err => {
      this.toastr.error('Something went wrong!')
      this.submit_process = false
      window.location.reload()
    }, () => this.submit_process = false)
  }

  reconsiderWithAttach() {
    this.submit_process = true
    this.formData.append('role', this.userRole)
    this.formData.append('userable_id', String(this.formInfo.userable_id))
    this.formData.append('remark_by', this.username)
    this.formData.append('form_id', String(this.formInfo.id))
    this.formData.append('recon_with_attach', 'true')
    this.formData.append('user_id', String(this.AUTH_ID))
    this.formData.append('remark', this.remarks)

    this.submit_process = true

    this.formDetailsService.reconWithAttach(this.formData, this.AUTH_ID, this.formInfo.id).subscribe(res => {
      if (res) this.toastr.success("Draft reconsidered with attachment. ")
      else this.toastr.error('Something went wrong!')
      setTimeout(() => {
        this.submit_process = false
        this.router.navigate(['/history']).then(() => (window.location.reload()))
      }, 2000);
    }, err => {
      this.toastr.error('Something went wrong!')
      this.submit_process = false
      console.log(err)
    },
      () => this.submit_process = false
    )
  }

  respondDraft(action: "app" | "rej" | "recon") {  //only for inititiator or hod2 --to reject or approve draft with comment
    let newState: Number
    this.uploadCDoc()
    if (action === 'app') newState = 12
    if (action === 'recon') {
      if (this.userRole === 'hod2') newState = 23
      else if (this.userRole === 'initiator') newState = 22
    }
    if (action === 'rej') newState = 5

    let mainStatus = this.formInfo.status
    if (action === 'recon' && this.reconWithAttachFlag) return this.reconsiderWithAttach()

    if (this.f_state === 12 && this.userRole === 'hod2') {
      if (action === 'app') {
        newState = 13
        mainStatus = 2
      }
    }
    this.submit_process = true
    this.formDetailsService.changeDocStatus(this.ID, newState, this.remarks, this.username, mainStatus, null, this.AUTH_ID).subscribe(res => {
      if (res) {
        this.toastr.success("Status changed")
        setTimeout(() => {
          this.submit_process = false
          this.router.navigate(['/history']).then(() => (window.location.reload()))
        }, 2000);

      }

    }, err => {
      this.toastr.error('Something went wrong. Could not change status!')
      console.error(err)   //@TODO  relod
      this.submit_process = false
    }, () => this.submit_process = false
    )
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
    console.log("here")
    this.showUploadModal = !this.showUploadModal
  }


  removeFile(event) {
    const index = this.files.indexOf(event.file);
    this.files.splice(index, 1);
  }
  close(event, mode = 0) {
    if (mode === 1)
      this.toastr.success("File uploaded successfully")
    console.log('here closing')
    this.showUploadModal = false
  }

  counter() {
    let ret = []
    for (let i = 1; i <= this.numOfOtherParties; i++)
      ret.push(i)

    return ret

  }
}
//end param is main status
// intern1@solargroup.com
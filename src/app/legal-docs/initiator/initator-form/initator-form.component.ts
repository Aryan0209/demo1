import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SessionService } from 'src/app/tokens/session.service';
import { InitiatorService } from '../initiator.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import LegalFormDetails from '../../models/LegalFormDetails';
import { LegalFormViewService } from '../../legal-form-view/legal-form-view.service';
import { OKLogin } from '../../models/OkLogin';
import { AuthLegalService } from '../../auth/auth-legal.service';
import { PartyName } from '../../models/PartyName';
import { DocumentTypes } from '../../models/DocumentTypes';

@Component({
  selector: 'app-initator-form',
  templateUrl: './initator-form.component.html',
  styleUrls: ['./initator-form.component.sass'],
})
export class InitatorFormComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  public initState: number;
  public files: any[] = [];
  public initialFormData: LegalFormDetails;
  public name;
  public InitiatorForm: FormGroup;
  public formData: FormData = new FormData();
  public submit_process: boolean = false;
  public today: any;
  public deptt: String;
  public User: OKLogin;
  public showNewPartyName: boolean = false;
  public UserHOD: String;
  public document_types: DocumentTypes[] = [];
  public party_names: PartyName[] = [];
  public daysReq;
  public showAddDialog;
  public mode: number;
  public reload: boolean = true;
  public newNameModel: string = '';
  public newTypeMinDays: number;
  public newTypeMaxDays: number;
  public showUploadModal: boolean = false;
  public filesToShow: any[] = [];
  public isRenewReq: boolean = false;
  public numOfParties: number = 1;
  public sorter;
  private otherPartyFormControls = [
    'other_party1',
    'other_party2',
    'other_party3',
    'other_party4',
  ];

  upload(event) {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = event.files.files.length;
    if (fileCount > 0) {
      // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.formData.append('attachments', event.files.files.item(i));
      }
      for (let f of event.target.files) {
        this.files.push(f.name);
      }
    }
  }
  selectFiles(event) {
    console.log('z', event.files);
    console.log('x', event.currentFiles);
    let fileCount: number = event.currentFiles.length;
    if (fileCount) {
      // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.files.push(event.currentFiles[i]);
      }
    }
    console.log(this.files);
  }

  toggleUpload(event) {
    event.preventDefault();
    this.showUploadModal = true;
  }

  attachFiles() {
    let fileCount: number = this.files.length;
    if (fileCount) {
      // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.formData.append('attachments', this.files[i]);
      }
    }
  }
  removeFile(event) {
    const index = this.files.indexOf(event.file);
    this.files.splice(index, 1);
  }
  close(event, mode = 0) {
    if (mode === 1) this.toastr.success('Selected file(s) uploaded');
    console.log('here closing');
    this.showUploadModal = false;
  }
  clear() {
    this.files = [];
  }

  onSubmit() {
    this.submit_process = true;
    this.attachFiles();

    for (const field in this.InitiatorForm.controls) {
      this.formData.append(field, this.InitiatorForm.get(field).value);
    } ///@todo: add all form data to formData

    this.formData.append('id', String(this.User.loginId));
    this.formData.append('department', String(this.User.department));
    console.log(this.isRenewReq);
    console.warn(this.initialFormData);

    if (this.initialFormData && this.initialFormData.status === 4) {
      //TODO also add role validation
      console.log(this.initialFormData);
      this.formData.append('role', 'initiator');
      this.formData.append(
        'userable_id',
        String(this.initialFormData['userable_id'])
      );
      this.formData.append('user_id', String(this.User.loginId));

      return this.initService
        .reconsiderSubmit(
          this.formData,
          this.initialFormData.id,
          this.User.loginId
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (res) this.toastr.success('Successfully updated the request');
            else this.toastr.error('Failed to update the request');
            this.router
              .navigate(['/legal-docs/history'])
              .then(() => window.location.reload);
          },
          (err) => {
            console.log(err);
            this.toastr.error('Failed to update the request');
          },
          () => (this.submit_process = false)
        );
    } else if (
      this.initialFormData &&
      this.initialFormData.status === 2 &&
      this.isRenewReq
    ) {
      //TODO also add role validation
      this.submit_process = true
      console.log('idhar');
      this.formData.append('form_id', String(this.initialFormData.id));
      this.initService.renewForm(this.formData).subscribe(
        (res) => {
          if (res) this.toastr.success('Successfully Submitted', 'Success');
          else this.toastr.error('Failed to submit', 'Error');
          this.router.navigate(['history']).then(() => window.location.reload);
        },
        (err) => {
          this.router.navigate(['history']).then(() => window.location.reload);
          this.toastr.error('Failed to submit', 'Error');
        }, () => this.submit_process = false
      );
    } else
      this.submit_process = true
    this.initService
      .submitInitatorForm(this.formData, this.User.loginId)
      .subscribe(
        (res) => {
          if (res.id)
            this.toastr.success('Successfully Submitted', 'Success');
          else this.toastr.error('Failed to submit', 'Error');
          this.router
            .navigate(['history'])
            .then(() => window.location.reload);
        },
        (error) => {
          this.toastr.error('Failed to submit', 'Error');
          console.log(error);
          this.router
            .navigate(['history'])
            .then(() => window.location.reload);
        }, () => this.submit_process = false
      );
    console.log(this.InitiatorForm.value);
  }

  constructor(
    private session: SessionService,
    private fb: FormBuilder,
    public initService: InitiatorService,
    private toastr: ToastrService,
    private router: Router,
    private formVService: LegalFormViewService,
    private authService: AuthLegalService
  ) {
    const today = new Date().toISOString();
    this.today = today;
    this.InitiatorForm = this.fb.group({
      document_type: [null, Validators.compose([Validators.required])],
      document_end_date: ['', Validators.compose([Validators.required])],
      document_start_date: ['', Validators.compose([Validators.required])],
      category: [null, Validators.compose([Validators.required])],
      complexity: [null, Validators.compose([Validators.required])],
      priority: [null, Validators.compose([Validators.required])],
      requester_name: ['', Validators.compose([Validators.required])],
      party_name: [null, Validators.compose([Validators.required])],
      authorized_by: ['', Validators.compose([Validators.required])],
      request_date: ['', Validators.compose([Validators.required])],
      required_days: ['', Validators.compose([Validators.required])],
      if_recurring: ['', Validators.compose([Validators.required])],
      remark: ['', Validators.compose([])],
      required_date: ['', Validators.compose([Validators.required])],
      agreement_date: ['', Validators.compose([])],
      other_party2: [null, Validators.compose([])],
      other_party3: [null, Validators.compose([])],
      other_party1: [null, Validators.compose([])],
      other_party4: [null, Validators.compose([])],
    });
  }

  get f() {
    return this.InitiatorForm.controls;
  }

  cancel() {
    console.log('here');
    this.showAddDialog = false;
    this.reload = true;
    this.newTypeMaxDays = 1;
    this.newNameModel = 'string';
    this.newTypeMinDays = 2;
    this.InitiatorForm.get('document_type').setValue('');
    this.InitiatorForm.get('party_name').setValue('');
  }

  handlePartyNamChange(e) {
    if (this.InitiatorForm.get('party_name').value === 'Other') {
      this.showAddDialog = true;
      console.log(this.showAddDialog);
      this.mode = 2;
    }
  }
  setRequiredDays($event) {
    console.log('here');

    let selectedType = this.InitiatorForm.get('document_type').value;

    if (selectedType === 'Other') {
      this.showAddDialog = true;
      this.mode = 1;
      return;
    }
    let req_days = this.document_types.find(
      (x) => x.name === selectedType
    ).required_days;
    this.InitiatorForm.get('required_days').setValue(req_days);
    console.log(this.InitiatorForm.get('required_days').value);
    this.daysReq = req_days;
  }

  addNewEntries() {
    if (this.mode === 2) {
      this.initService.addParty({ party_name: this.newNameModel }).subscribe(
        (res) => {
          this.toastr.success(res.message);
        },
        (e) => {
          this.toastr.error(e);
        }
      );
      this.cancel();
    } else {
      let req_days = `${this.newTypeMinDays}-${this.newTypeMaxDays}`;
      this.initService
        .addDocumentType({ name: this.newNameModel, required_days: req_days })
        .subscribe(
          (res) => {
            this.toastr.success(res.message);
          },
          (e) => {
            this.toastr.error(e);
          }
        );
    }
    this.cancel();
    this.reload = true;

    this.initService.getParties().subscribe(
      (res) => {
        //sort alphabetically based on name_of_party
        res.sort(this.sorter);
        this.party_names = res;
        console.warn('HERERRERE');

        this.reload = false;
      },
      (err) => {
        this.toastr.error('Something went wrong', ' Please try again later');
        console.log(err);
      }
    );

    this.initService.getDocumentTypes().subscribe(
      (res) => {
        res.sort((a, b) => {
          if (a.name < b.name) return -1;
          else if (a.name > b.name) return 1;
          else return 0;
        });
        this.document_types = res;
        this.reload = false;
      },
      (err) => {
        this.toastr.error('Something went wrong', ' Please try again later');
        console.log(err);
      }
    );
  }

  getFormValidationErrors($event) {
    Object.keys(this.InitiatorForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors =
        this.InitiatorForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  printIni($event) {
    console.log(this.InitiatorForm.value);
    this.getFormValidationErrors($event);
  }
  addNewParty() {
    let newParty: PartyName;
    this.initService.addParty(newParty).subscribe((res) => console.log(res));
  }
  addNewType() {
    let newType: DocumentTypes;
    this.initService
      .addDocumentType(newType)
      .subscribe((res) => console.log(res));
  }

  cancelWithoutEntries() {
    console.log('cancelling wihout entries');
    this.showAddDialog = false;
    if (this.InitiatorForm.get('document_type').value == 'Other')
      this.InitiatorForm.get('document_type').setValue('');
    if (this.InitiatorForm.get('party_name').value == 'Other')
      this.InitiatorForm.get('party_name').setValue('');
  }

  ngOnInit(): void {
    console.clear();
    this.sorter = (a, b) => {
      if (a.name_of_party < b.name_of_party) return -1;
      else if (a.name_of_party > b.name_of_party) return 1;
      else return 0;
    };
    this.initialFormData = history.state.initialFormData;

    this.isRenewReq = history.state.mode === 1;
    console.warn(history.state);
    this.User = this.session.getTrans_legal();

    try {
      this.initService.getParties().subscribe(
        (res) => {
          //sort alphabetically based on name_of_party
          res.sort(this.sorter);
          this.party_names = res;
        },
        (err) => {
          this.toastr.error('Something went wrong', ' Please try again later');
          console.log(err);
        }
      );
      this.initService.getDocumentTypes().subscribe(
        (res) => {
          //sort alphabetically based on document_type
          res.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
          });

          this.document_types = res;
        },
        (err) => {
          this.toastr.error('Something went wrong', ' Please try again later');
          console.log(err);
        }
      );
      if (this.party_names && this.document_types) this.reload = false;
    } catch (error) {
      console.log(error);
    }

    this.initService
      .getHOD(this.User.department, this.User.loginId)
      .subscribe((res) => {
        this.UserHOD = res.hod_name;
        console.log(this.UserHOD);
        this.InitiatorForm.get('authorized_by').setValue(this.UserHOD);
        // this.InitiatorForm.get('authorized_by').disable()
        // this.InitiatorForm.get('agreement_date').setValue("")
      });

    this.InitiatorForm.get('if_recurring').valueChanges.subscribe((val) => {
      if (val === 'yes') {
        this.InitiatorForm.controls['agreement_date'].setValidators([
          Validators.required,
        ]);
      } else {
        this.InitiatorForm.controls['agreement_date'].clearValidators();
        this.InitiatorForm.controls['agreement_date'].setValue('');
      }
      this.InitiatorForm.controls['agreement_date'].updateValueAndValidity();
    });

    this.InitiatorForm.get('request_date').setValue(this.today);
    // this.InitiatorForm.get('request_date').disable()
    this.InitiatorForm.get('requester_name').setValue(
      this.User.firstname + ' ' + this.User.lastname
    );
    // this.InitiatorForm.get('requester_name').disable()
    this.deptt = this.User.department;
    this.initialFormData.assets = this.initialFormData.assets.filter(
      (ass) => ass.value !== null
    );
    console.warn('filtered assets', this.initialFormData.assets);
    if (this.initialFormData) {
      for (let [key, value] of Object.entries(this.InitiatorForm.value)) {
        this.InitiatorForm.get(key).setValue(this.initialFormData[key]);
        console.log(key, value);
      }
      let initialDataReqDays = this.initialFormData.required_days;
      this.InitiatorForm.get('required_days').setValue(initialDataReqDays);
      this.InitiatorForm.get('if_recurring').setValue(
        this.initialFormData.if_recurring
      );

      let initialNumOfParties =
        this.otherPartyFormControls.filter((c) => {
          return this.initialFormData[c] !== null;
        }).length - 1;
      console.log(initialNumOfParties);
      this.numOfParties = initialNumOfParties;

      // if (this.isRenewReq) this.InitiatorForm.get('remark').setValue("Renew : ")
    }
    console.log(this.InitiatorForm.value);
  }

  public iconList = [
    // array of icon class list based on type
    { type: 'xlsx', icon: 'fa fa-file-excel-o' },
    { type: 'pdf', icon: 'fa fa-file-pdf-o' },
    { type: 'jpg', icon: 'fa fa-file-image-o' },
    { type: 'docx ', icon: 'fa fa-file-word-o' },
  ];

  getFileExtension(filename) {
    // this will give you icon class name
    let ext = filename.split('.').pop();
    let obj = this.iconList.filter((row) => {
      if (row.type === ext) {
        return true;
      }
    });
    if (obj.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return '';
    }
  }
  public ret = []
  counter() {
    console.log(this.numOfParties)
    this.ret = [];
    for (let i = 1; i < this.numOfParties; i++) {
      this.ret.push(i);
    }

    for (let j = this.numOfParties + 1; j <= 4; j++) {
      this.InitiatorForm.get('other_party' + j).setValue(null);
      this.InitiatorForm.get('other_party' + j).clearValidators();
    }
  }
}
//

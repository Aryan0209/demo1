import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/tokens/session.service';
import { LegalHistoryService } from './legal-history.service';
import { OKLoginTransC } from '../models/OkLogin';
import { LegalFormViewService } from '../legal-form-view/legal-form-view.service';
import { OKLogin } from '../models/OkLogin';
import { throttle } from 'underscore'


import { Table } from 'primeng/table';

@Component({
  selector: 'app-lega-history',
  templateUrl: './lega-history.component.html',
  styleUrls: ['./lega-history.component.sass'],
})
export class LegaHistoryComponent implements OnInit {
  @ViewChild('dt') table: Table;
  public display: boolean = false;
  public AUTH_ID: Number;
  public User: OKLogin = new OKLoginTransC();
  public newrange = '';
  public message = '';
  public logs: Array<any> = [];
  public stateQuery;
  public loading: boolean = false;
  public results = {
    inp: [],
    app: [],
    rej: [],
    recon: [],
    closure: [],
    sub: [],
  };
  private visitState = {
    app: false,
    rej: false,
    recon: false,
    closure: false,
    sub: false,
  }

  public show = false;
  public showPTemplate = () => (this.show = !this.show);
  public initialFormData: any;
  public statuses = [
    { label: 'Initiated', value: 1 },
    { label: 'Deptt HOD Approved', value: '2' },
    { label: 'Deptt HOD Reconsidered', value: '4' },
    { label: 'Rejected', value: '5' },
    { label: 'CS HOD Approved', value: '3' },
    { label: 'CS HOD Reconsider', value: '6' },
    { label: 'Closure Attached', value: '14' },
    { label: 'Initiator Reconsidered', value: '22' },
    { label: 'CS HOD Reconsidered Draft', value: '23' },
    { label: 'Draft Submitted', value: '11' },
    { label: 'Initiator Approved Draft', value: '12' },
    { label: 'Waiting for closure', value: '13' },
    { label: 'Waiting renewal', value: '16' },
    { label: 'Renewed', value: '15' },
  ];

  constructor(
    private route: Router,
    private session: SessionService,
    private historyService: LegalHistoryService,
    private formVsvc: LegalFormViewService
  ) { }
  role: String;

  ngOnInit(): void {
    this.User = this.session.getTrans_legal();
    this.User = Object.assign({}, this.session.getTrans_legal());
    this.role = this.User.role;
    this.AUTH_ID = this.session.getTrans_legal().loginId;

    this.loadInitial()

    // this.loadQueries();
  }

  loadInitial() {
    this.loading = true
    this.historyService.loadHistoryFor('inp').subscribe(res => {
      // console.log(res);
      this.results.inp = res.data.inp;
    }, err => {
      console.log(err)

    }, () => {
      console.log(this.results)
      this.loading = false
    })
  }

  loadForStatus(statusStr: string) {
    this.loading = true
    this.historyService.loadHistoryFor(statusStr).subscribe(
      res => this.results[statusStr] = res.data[statusStr],
      err => console.log(err),
      () => {
        console.log(this.results)
        this.loading = false
      }
    )
  }

  // loadQueries() {
  //   this.load(this.stateQuery.inp, 'inp');
  //   this.load(this.stateQuery.app, 'app');
  //   this.load(this.stateQuery.recon, 'recon');
  //   this.load(this.stateQuery.closure, 'closure');
  //   this.load(this.stateQuery.rej, 'rej');
  //   if (this.role === 'cs_member') this.load(this.stateQuery.sub, 'sub');
  // }

  // load(queries: number[][], field) {
  //   for (let [state, status] of queries) {
  //     console.log('requesting for', state, status);

  //     this.historyService.getHistory(status, state).subscribe((res) => {
  //       console.log('Fetched data at', state, '@', status, '==>', res);
  //       this.results[field] = this.results[field].concat(res);
  //     });
  //   }
  // }

  // calcStateQuery = () => {
  //   let stateQ = {
  //     inp: [[]],
  //     app: [[]],
  //     rej: [[5, 5]],
  //     recon: [[]],
  //     closure: [[14, 2]],
  //     sub: [[11, 1]],
  //   };

  //   if (this.role === 'initiator') {
  //     stateQ.inp = [
  //       [1, 1],
  //       [2, 1],
  //       [3, 1],
  //       [11, 1],
  //       [23, 1],
  //     ];
  //     stateQ.recon = [
  //       [4, 4],
  //       [6, 4],
  //       [22, 1],
  //     ];
  //     stateQ.app = [
  //       [12, 1],
  //       [13, 2],
  //     ];
  //     stateQ.closure.push([16, 2], [15, 2]);
  //   }

  //   if (this.role === 'hod1') {
  //     stateQ.inp = [[1, 1]];
  //     stateQ.recon = [[4, 4]];
  //     stateQ.app = [
  //       [2, 1],
  //       [3, 1],
  //       [11, 1],
  //       [12, 1],
  //       [13, 2],
  //       [23, 1],
  //       [22, 1],
  //       [6, 4],
  //     ];
  //   }

  //   if (this.role === 'hod2') {
  //     stateQ.inp = [
  //       [2, 1],
  //       [12, 1],
  //       [22, 1],
  //     ];
  //     stateQ.recon = [
  //       [6, 4],
  //       [23, 1],
  //     ];
  //     stateQ.app = [
  //       [13, 2],
  //       [3, 1],
  //       [11, 1],
  //     ];
  //   }

  //   if (this.role === 'cs_member') {
  //     stateQ.inp = [[3, 1]];
  //     stateQ.recon = [
  //       [22, 1],
  //       [23, 1],
  //     ];
  //     stateQ.app = [
  //       [13, 2],
  //       [12, 1],
  //     ];
  //   }
  //   return stateQ;
  // };

  print() {
    console.log('results', this.results);
  }

  loadOnVisit(field: string) {
    console.log('visiting response for', field, this.visitState);
    if (!this.visitState[field]) {
      this.visitState[field] = true;
      this.loadForStatus(field);
    }
  }

  handleRenew(id) { }
  onClick(id, st) {
    const rowId = id;

    if (this.role === 'cs_member') {
      return this.route.navigate(['csteam/task-view', rowId, st], {
        state: {
          state: st,
        },
      });
    }

    this.route.navigate(['/l-form-view', rowId, st], {
      state: {
        state: st,
      },
    });
  }

  editDoc(id, state, mode = 0) {
    console.log(id, state);
    let initialData: any;
    localStorage.setItem('activeLFormId', id);
    this.formVsvc.getDetail(id, this.AUTH_ID).subscribe((res) => {
      initialData = res[0];
      this.route.navigate(['/init/form'], {
        state: { initialFormData: initialData, mode },
      });
    });
  }
  sortByDate = function (a, b) {
    return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
  };
  getStatus(state: number) {
    if (state === 1) {
      return ['INITIATED', 'init'];
    }
    if (state === 2) {
      return ['DEPTT HOD APPROVD', 'app'];
    }
    if (state === 4) return ['DEPTT HOD RECONSIDERED', 'recon'];

    if (state === 6) return ['CS HOD RECONSIDERED', 'recon'];

    if (state === 3) {
      return ['CS HOD APPROVED', 'h2app'];
    }
    if (state === 11) {
      return ['DRAFT SUBMITTED', 'sub'];
    }
    if (state === 12) {
      return ['INITIATOR APPROVED', 'app'];
    }
    if (state === 13) {
      return ['WAITING FOR CLOSURE', 'h2app'];
    }
    if (state === 14) {
      return ['CLOSURE ATTACHED', 'closure'];
    }
    if (state === 16) {
      return ['WAITING RENEWAL', 'renew'];
    }
    if (state === 15) {
      return ['RENEWED', ''];
    }
    if (state === 22) {
      return ['INITIATOR RECONSIDERED', 'recon1'];
    }
    if (state === 23) {
      return ['CS HOD RECONSIDERED', 'recon'];
    }
    if (state === 5) {
      return ['REJECTED', 'rej'];
    }
  }

  showDialog(id: number) {
    this.logs = [];
    this.display = true;

    const fetch = () => {
      console.warn('requesting logs')
      this.formVsvc
        .getRemarkLog(id, 4, this.AUTH_ID)
        .subscribe((res) => (this.logs = res));
    }
    throttle(fetch, 5000)()
  }

  // public throttledShowDialog = throttle(this.showDialog, 3000)

  clear(table: Table) {
    table.clear();
  }

  closeLogDialog(event) {
    this.logs = [];
    this.display = false;
  }
}

// below calc state query
// this.historyService.getHistory(1, state.inp).subscribe(res => {
//   this.LegalDocInProgress = res;
//   console.log("InP \n", res)
//   if (this.User.role === "hod2") {
//     this.historyService.getHistory(1, state.draft_app).subscribe(res => {
//       this.LegalDocInProgress = this.LegalDocInProgress.concat(res)
//       console.log("InP_withstatus1 \n ", state.draft_app, res)
//     })
//   }
//   console.log("bf", this.LegalDocInProgress)
//   this.LegalDocInProgress = this.LegalDocInProgress.sort(this.sortByDate)
//   console.log("af", this.LegalDocInProgress)
//   this.dtTrigger1.next()
// }
// );

// this.historyService.getHistory(1, state.app).subscribe(res => {
//   this.LegalDocApproved = res;
//   console.log("App_with_status1 \n", res, state.app)

//   this.historyService.getHistory(2, state.app).subscribe(res => {
//     this.LegalDocApproved = this.LegalDocApproved.concat(res)
//     console.log("App_withstatus2, \n", state.app, res)
//   })
//   if (this.User.role !== 'initiator') {
//     this.historyService.getHistory(2, state.closure).subscribe(res => {
//       this.LegalDocApproved = this.LegalDocApproved.concat(res)
//       console.log("App_withstatus2, \n", state.closure, res)
//     })
//   }
//   if (this.User.role === 'hod2') {
//     this.historyService.getHistory(2, 13).subscribe(res => {
//       this.LegalDocApproved = this.LegalDocApproved.concat(res)
//       console.log("App_withstatus2 \n", 13, res)
//     })
//   }
//   this.dtTrigger2.next()
// }
// );

// this.historyService.getHistory(5, state.rej).subscribe(res => {
//   this.LegalDocRejected = res;
//   this.dtTrigger3.next()
//   console.log("Rej \n", res)
// }
// );
// // if (this.User.role === "initiator") { ///! REVERT BACK HERE
// this.historyService.getHistory(4, state.recon).subscribe(res => {
//   this.LegalDocReconsider = res;
//   if (this.User.role === 'hod2') this.historyService.getHistory(4, state.draft_recon).subscribe(res => (this.LegalDocReconsider = this.LegalDocReconsider.concat(res)))
//   this.LegalDocReconsider = this.LegalDocReconsider.sort(this.sortByDate)
//   this.dtTrigger4.next();
//   console.log("Recon \n", res)
// });

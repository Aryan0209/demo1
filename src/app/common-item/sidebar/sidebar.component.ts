import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/tokens/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  @Input() toggle: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();
  public time: any;
  public assets = environment.assets;
  public isLoggedIn$: Observable<boolean>;

  constructor(private session: SessionService) {}

  ngOnInit(): void {
    this.time = new Date().getTime();
    this.isLoggedIn$ = this.session.isLoggedIn;
  }
  removeLSt() {
    localStorage.removeItem('activeLFormId');
  }
  toggleMenu() {
    this.toggle = !this.toggle;
    this.toggleEvent.emit(this.toggle);
    localStorage.setItem('sidebar', this.toggle.toString());
  }
  t_access(role: string) {
    return role === this.session.getTrans_legal().role;
  }
  t_authority(authority: string) {
    return authority === this.session.getTrans_legal().authority;
  }
  t_access_legal(role: string) {
    return this.session.getTrans_legal().role === role;
  }

  t_authority_legal(authority: string) {
    return authority === this.session.getTrans_legal().authority;
  }
}

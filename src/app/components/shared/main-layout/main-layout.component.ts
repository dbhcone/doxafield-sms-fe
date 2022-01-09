import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';
import { updateTitle } from 'src/app/store/actions/nav.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  navs: INavigation[] = [];

  bottomNavs: INavigation[] = [];

  navStore: Observable<{ title: string }>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {
    this.navs = [
      { name: 'Dashboard', route: 'dashboard', icon: 'dashboard' },
      { name: 'Academics', route: 'academics', icon: 'school' },
      { name: 'Admissions', route: 'admissions', icon: 'people' },
      { name: 'Pupils', route: 'pupils', icon: 'groups' },
      { name: 'Assessment', route: 'assessment', icon: 'book' },
      { name: 'Finance', route: 'finance', icon: 'attach_money' },
      { name: 'Hr', route: 'hr', icon: 'group', alt: 'Human Resource' },
      { name: 'Communications', route: 'communications', icon: 'chat' },
    ];

    this.bottomNavs = [
      { name: 'Settings', route: 'settings', icon: 'settings' },
      { name: 'Users', route: 'users', icon: 'group' },
      { name: 'Logout', route: '/logout', icon: 'logout' },
    ];
    this.navStore = store.select('obj');
  }

  updateNavTitle(nav: INavigation) {
    this.store.dispatch(updateTitle({ title: nav.alt || nav.name }));
  }
}

export interface INavigation {
  name: string;
  route: string;
  icon: string;
  alt?: string;
  children?: { name: ''; route: ''; icon: '' }[];
}

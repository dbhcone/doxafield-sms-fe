import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  navs: INavigations[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.navs = [
      { name: 'Dashboard', route: 'dashboard', icon: 'dashboard' },
      { name: 'Academics', route: 'academics', icon: 'school' },
      { name: 'Finance', route: 'finance', icon: 'attach_money' },
      { name: 'Students', route: 'students', icon: 'people' },
      { name: 'Hr', route: 'hr', icon: 'group' },
    ];
  }
}

export interface INavigations {
  name: string;
  route: string;
  icon: string;
  children?: { name: ''; route: ''; icon: '' }[];
}

import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu Interface
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  roles?: string[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Método para filtrar elementos del menú según el rol del usuario
  filterMenuItemsByRole(role: string): Menu[] {
    return this.MENUITEMS.filter((item) => {
      if (item.roles && item.roles.length > 0) {
        return item.roles.includes(role);
      }
      return true;
    });
  }

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe(() => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    {
      headTitle1: "General",
    },
    {
      title: "Dashboard",
      icon: "home",
      type: "link",
      badgeType: "light-primary",
      active: true,
      path: "/dashboard/default",
    },
    {
      headTitle1: "Separator",
    },
    {
      title: "example",
      path: "/ejemplo",
      icon: "learning",
      type: "link",
      badgeType: "light-secondary",
      active: false,
    },
    {
      headTitle1: "Choose tema",
      roles: ["Administrador", "Estudiante"],
    },
    {
      title: "Workshop Registration",
      path: "/workshop",
      icon: "email",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Estudiante"],
    },
    {
      title: "Modality",
      path: "/modality",
      icon: "email",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Estudiante"],
    },
    {
      title: "Documentos",
      path: "/sustentation-documents",
      icon: "email",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Documentos"],
    },
    {
      headTitle1: "See Groups",
      roles: ["Administrador", "Estudiante"],
    },
    {
      title: "Groups",
      path: "/group",
      icon: "search",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Estudiante"],
    },
    {
      headTitle1: "Comision academic",
      roles: ["Administrador", "Comisión Academica"],
    },
    {
      title: "Management topic",
      path: "/management-topic",
      icon: "user",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Comisión Academica"],
    },
    {
      title: "Management tutor",
      path: "/management-tutor",
      icon: "user",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Comisión Academica"],
    },
    {
      title: "Management court",
      path: "/management-court",
      icon: "user",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Comisión Academica"],
    },
    {
      title: "Management schedule",
      path: "/management-schedule",
      icon: "user",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Comisión Academica"],
    },
    {
      headTitle1: "System Administration",
      roles: ["Administrador", "Comisión Academica"],
    },
    {
      title: "Users",
      path: "/user",
      icon: "user",
      type: "link",
      badgeType: "light-secondary",
      active: false,
      roles: ["Administrador", "Comisión Academica"],
    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}

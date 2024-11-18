import { Type } from "@angular/core";
import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export interface BootstrapModalConfig {
  title: string;
  component: Type<any>;
  options?: NgbModalOptions & IBootstrapModalCustomOptions;
  data?: any;
}

export interface IBootstrapModalCustomOptions {
  headerClass?: string;
}

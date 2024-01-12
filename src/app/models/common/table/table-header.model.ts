import { Pipe } from "@angular/core";
import { TableHeaderCustomActions } from "src/types/types";

export class TableHeaderModel {
  name: string;
  orderColumnName?: string;
  fieldValue?: string;
  applyCanSaveSettingsDirective?: boolean;
  tooltip?: boolean;
  customActions?: TableHeaderCustomActions[];
  hide?: boolean;
  pipe?: Pipe;
  pipeArgs?: any;

  constructor(options: {
    name: string,
    orderColumnName?: string,
    fieldValue?: string,
    applyCanSaveSettingsDirective?: boolean,
    tooltip?: boolean,
    customActions?: TableHeaderCustomActions[],
    hide?: boolean,
    pipe?: Pipe,
    pipeArgs?: any
  }) {
    this.name = options.name;
    this.orderColumnName = options.orderColumnName;
    this.fieldValue = options.fieldValue;
    this.applyCanSaveSettingsDirective = options.applyCanSaveSettingsDirective;
    this.tooltip = options.tooltip;
    this.customActions = options.customActions;
    this.hide = options.hide;
    this.pipe = options.pipe;
    this.pipeArgs = options.pipeArgs;
  }
}

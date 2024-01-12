export type TableHeader = {
  name: string,
  orderColumnName?: string,
  fieldValue?: string,
  applyCanSaveSettingsDirective?: boolean,
  tooltip?: boolean,
  customActions?: TableHeaderCustomActions[],
  hide?: boolean
}

export type TableHeaderCustomActions = {
  actionName?: string,
  class?: string,
  icon?: string,
  tooltip?: string,
  tooltipId?: string
}

export type MethodOption = {
  value: string,
  name?: string,
  text: string,
  methodId: string
}

export type ParamQueryType = "Date" | "boolean" | "Array";

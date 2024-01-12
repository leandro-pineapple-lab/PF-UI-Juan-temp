const deliveryMethods: DeliveryMethods = {
  ['Email']: 'E',
  ['SMS']: 'S',
  ['Internal']: 'I',
  ['Website']: 'W',
  ['Alert']: 'A',
}

type DeliveryMethods = {
  [key: string]: string;
}

export default deliveryMethods;

export interface DatepickerV1Range {
    value: Date[];
    label: string;
  }
  
  export interface CardLightDescription {
    icon: string;
    title: string;
    price: string;
    growth?: string;
    colorClass?: string;
  }
  
  export interface TableColumns<T> {
    name: string;
    dataKey: keyof T;
    highlightedKey?: string;
    highlightClass?: string;
  }
  
  export interface CustomNgSelect<T> {
    value: T;
    label: string;
  }
  
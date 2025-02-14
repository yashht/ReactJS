export interface causeDataRes {
    title: any
    _id: any
    message: string
    data: causeResponce[]
  }
  
  export interface causeResponce {
    _id: string
    title: string
    icon: string
    image: string
    quote: string
    quoteBy: string
    updatedAt: string
    causeList: causeDataRes[]
  }
  export interface submittCauseParams {
    quoteBy: string,
    quote: string,
    image: any,
    id:string,
    thumbnailfile: any
    quoteby: string
  }

  export interface updateCauseParams {
    quoteBy: string,
    quote: string,
    image: any,
    id:string
  }

  export interface formValueCause {
    quoteBy: string,
    quote: string,
    image: any,
    id:string,
    title: string,
    icon: string,
    _id: string
  }


  export interface updateCauseData {
    message: string
    data: updateCauseRes
  }
  
  export interface updateCauseRes {
    _id: string
    title: string
    icon: string
    image: string
    quote: string
    quoteBy: string
    updatedAt: string
    status: string
    programs: string
  }

  export interface updateErrorCause {
    message?: string
  }

 export  interface ItemType {
    _id: string;
    quote: string;
    quoteBy: string;
    item: any
    // Add other properties as needed
  }


export type editCauseForm = {
    [key: string]: {
      name: string;
      validate: {
        required: {
          value: boolean;
        };
        maxLength?: {
          value: number;
          message: string;
        };
        // Add other validation properties if needed
      };
    };
  };

 export interface categoryIcon {
    value: string;
    label: string;
  }


 export interface causeTableColumn {
    label: React.ReactNode;
    key: string;
    filter: boolean;
    sorting: boolean;
  }

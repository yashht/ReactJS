export interface  categoryDataRes{
    message: string
    data: categoryResponce[]
  }
  
  export interface categoryResponce {
    _id: string
    title: string
    causeID: string
    image: string
    icon: string
    aboutCategory: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    categoryList: categoryDataRes
    causeDetails: CauseDetail[]
    programs: string
  }

  export interface categoryComponentListType {
    _id: number
    title: string
    causeID: string
    programs: string
    image: string
    icon: string
    aboutCategory: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    causeDetails: CauseDetail 
    categoryList: categoryDataRes
  }
  
  export interface CauseDetail {
    _id: string
    title: string
    icon: string
    image: string
    quote: string
    quoteBy: string
    updatedAt: string
  }

  export interface submitCategoryParams { 
    title: string,
    causeID: string,
    image: string,
    icon: string,
    aboutCategory: string
    imageSize: string | undefined
    cause: string,
    thumbnailfile: any
    category: string,
    categoryicon: string,
    aboutcategory: string
  }
  export interface addCategoryParams { 
    title: string,
    causeID: string,
    image: string,
    icon: string,
    aboutCategory: string
    imageSize: string | undefined
  }

  export interface addCategoryData {
    message: string
    data: addCategoryResponce
  }
  
  export interface addCategoryResponce {
    title: string
    causeID: string
    image: string
    icon: string
    aboutCategory: string
    status: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }

  export interface updateErrorCategory{
    message?: string
  }
  

  export interface updateCategoryParams{
    id: string,
    title: string,
   causeID: string,
   image: string,
   icon: string,
   aboutCategory: string
   imageSize: any
  }
  
  
  
  export interface updateCategoryData {
    message: string
    data: updateCategoryResponce
  }
  
  export interface updateCategoryResponce {
    _id: string
    title: string
    causeID: string
    image: string
    icon: string
    aboutCategory: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  

  export interface submitCategoryResponce {
    _id: string
    title: string
    causeID: string
    image: string
    icon: string
    aboutCategory: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    causeDetails: any
    imageSize: number
  }
  export interface deleteCategoryParams {
    id: string
  }

  export interface deletecategoryData{
    id?: string
  }

  export interface deleteCategoryData {
    message: string
    data: deleteCategoryResponce
  }
  
  export interface deleteCategoryResponce {
    _id: string
    title: string
    causeID: string
    image: string
    icon: string
    aboutCategory: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }

  export interface EnableCategoryParams {
  id: string,
  status: string
}

export interface enableCategoryData {
  message: string
  data: enableCategoryRes
}

export interface enableCategoryRes {
  _id: string
  title: string
  causeID: string
  image: string
  icon: string
  aboutCategory: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface BlobFile {
  name: string;
  size: number;
}

export interface showTypeModal{
  model: object
}

export type addCategoryForm = {
  thumbnailfile: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
    };
  };
  category: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
      // pattern: {
      //   value: RegExp;
      //   message: string;
      // };
      maxLength: {
        value: number;
        message: string;
      };
    };
  };
  cause: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
    };
  };
  categoryicon: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
    };
  };
  aboutcategory: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
      maxLength: {
        value: number;
        message: string;
      };
    };
  };
};

 export type ShowTypeModal = {
  modal: 'add' | 'edit' | 'delete' | string; // Adjust the possible values as needed
};



 export interface categoryIcon {
  value: string;
  label: string;
}

export interface updateFunctionCategory {
  message: string
  data: updateCategoryResponce
}

export interface updateFunctionCategory{
  _id: string
  title: string
  causeID: string
  image: string
  icon: string
  aboutCategory: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface causeID{
  title: string,
  cause: string,
  _id: string
}

export interface causeListItem {
  _id: string;
  title: string;
  // Add other properties as needed
}


export interface defaultColums { 
    filter: boolean,
    key: string,
    label: any,
    sorting: boolean
}
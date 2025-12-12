import { BadgeCheck, LayoutDashboard, Plane, ShoppingBasket } from "lucide-react";

export const register = [
    {
     name:"userName",
     lable:"User Name",
     Placeholder:"Enter Your Name",
     componentType:"input",
     type:"text",
     id:"userName"
    },
    {
     name:"email",
     lable:"Email",
     Placeholder:"Enter Your Email",
     componentType:"input",
     type:"email",
     id:"userName"
    },
    {
     name:"password",
     lable:"Password",
     Placeholder:"Enter Your Password",
     componentType:"input",
     type:"password",
     id:"password"
    }
]
export const login = [

    {
     name:"email",
     lable:"Email",
     Placeholder:"Enter Your Email",
     componentType:"input",
     type:"email",
     id:"userName"
    },
    {
     name:"password",
     lable:"Password",
     Placeholder:"Enter Your Password",
     componentType:"input",
     type:"password",
     id:"password"
    }
]
export const productFormDetails = [
   {
     name:"title", 
     lable:"Title",
     Placeholder:"Enter Product Title",
     componentType:"input",
     type:"text",
     id:"title"
    },
    {
     name:"description",
     lable:"Description",
     Placeholder:"Enter Product Description",
     componentType:"textarea",
     id:"description"
    },
     {
     name:"category",
     lable:"Category",
     Placeholder:"Select Category",
     componentType:"select",
     id:"category",
     options:[
          {id:"men",label:"Men"},
          {id:"women",label:"Women"},
          {id:"kids",label:"kids"},
          {id:"accessories",label:"Accessories"},
          {id:"footware",label:"Footware"}
     ]
    },
      {
     name:"brand",
     lable:"Brand",
     Placeholder:"Enter Brand",
     componentType:"select",
     id:"brand",
     options:[
          {id:"nike",label:"Nike"},
          {id:"puma",label:"Puma"},
          {id:"zara",label:"Zara"},
          {id:"adidas",label:"Adidas"},
          {id:"roadstart",label:"RoadStar"}
     ]
   
    },
         {
     name:"price",
     lable:"price",
     Placeholder:"Enter price",
     componentType:"input",
     id:"price",
     type:"number"
 
    },
         {
     name:"sales_price",
     lable:"Sales Price",
     Placeholder:"Enter Sales Price (Optional)",
     componentType:"input",
     id:"sales_price",
     type:"number"
   
    },
         {
     name:"total_stock",
     lable:"Total Stock",
     Placeholder:"Enter Total Stock",
     componentType:"input",
     id:"total_stock",
     type:"number"
 
    }
]
export const shopHeaderMenuItems = [
    {
        id:'home',
        label:'Home',
        path:'/shop/home'
    },
    {
        id:'products',
        label:'Products',
        path:'/shop/listing'
    },
    {
        id:'men',
        label:'Men',
        path:'/shop/listing'
    },
    {
        id:'women',
        label:'Women',
        path:'/shop/listing'
    },
    {
        id:'kids',
        label:'Kids',
        path:'/shop/listing'
    },
    {
        id:'footware',
        label:'Footware',
        path:'/shop/listing'
    },
    {
        id:'accessories',
        label:'Accessories',
        path:'/shop/listing'
    },
    ,
    {
        id:'search',
        label:'Search',
        path:'/shop/search'
    }
   
]
export const filterOptions = {
    category:[
          {id:"men",label:"Men"},
          {id:"women",label:"Women"},
          {id:"kids",label:"kids"},
          {id:"accessories",label:"Accessories"},
          {id:"footware",label:"Footware"}
    ],
    brand:[
          {id:"nike",label:"Nike"},
          {id:"adidas",label:"Adidas"},
          {id:"puma",label:"Puma"},
          {id:"levi",label:"Levis"},
          {id:"zara",label:"Zara"}
    ]
   
}
export const sortOptions = [
    {id:"price-lowtohigh",lable:"Price : Low to High"},
    {id:"price-hightolow",lable:"Price : High to Low"},
    {id:"title-atoz",lable:"Title : A to Z"},
    {id:"title-ztoa",lable:"Title : Z to A"}

]
export const addressFormControls = [
  {
    lable: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    lable: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    lable: "Pincode",
    name: "pinCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    lable: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    lable: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
export const displayOrderStatus = {
  pending: "Pending",
  inProcess: "In Process",
  inShipping: "In Shipping",
  delivered: "Delivered",
  rejected: "Rejected",
  confirmed:"Confirmed"
};
export const orderStatusColors = {
  pending: "text-yellow-700 bg-yellow-100",
  inProcess: "text-blue-700 bg-blue-100",
  inShipping: "text-purple-700 bg-purple-100",
  delivered: "text-green-700 bg-green-100",
  rejected: "text-red-700 bg-red-100",
  confirmed: "bg-teal-100 text-teal-700 border-teal-300"
};
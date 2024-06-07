import * as z from "zod"
export const LoginSchema=z.object({
    email:z.string().email({
        message:"Email is Required"
    }),
    password:z.string().min(1,{
        message:"Password is Required"
    })

})


export const RegisterSchema=z.object({
    email:z.string().email({
        message:"Email is Required"
    }),
    password:z.string().min(6,{
        message:"Minimum 6 Character  is Required"
    }),
    name:z.string().min(1,{
        message:"Name is Required"
    })

})


export const AddressSchema=z.object({
    name:z.string().min(1,{
        message:"Name is Required"
    }),
    mobileNumber:z.number().min(10,{
        message:"Mobile Number is Required"
    }),
    city:z.string().min(1,{
        message:"City is Required"
    }),
    pinCode:z.number().min(1,{
        message:"pinCode is Required"
    }),
    state:z.string().min(1,{
        message:"State is Required"
    }),
  

})
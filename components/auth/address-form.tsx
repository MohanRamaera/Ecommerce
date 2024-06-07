"use client"
import * as z from "zod"
import { AddressSchema } from "@/schemas"
import { CardWrapper } from "./card-wrapper"

import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "@/components/ui/AdminButton"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"

export const AddressForm=()=>{
    const [error,setError]=useState<string|undefined>("")
    const [success,setSucess]=useState<string|undefined>("")
    const [isPending,startTransition]=useTransition()

    const form=useForm<z.infer<typeof AddressSchema>>({
        resolver:zodResolver(AddressSchema),
        defaultValues:{
            name:"",
            mobileNumber:0,
            city:"",
            pinCode:0,
            state:""
        }
    })


    const onSubmit=(values:z.infer<typeof AddressSchema>)=>{
        setError("")
        setSucess("")
        startTransition(()=>{
    //     login(values).then((data)=>{
    //         setError(data.error)
    //         setSucess(data.success)

    //    })
    }
    )


    }




   return( 
 <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="space-y-4">
            <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="john.doe " type="text"/></FormControl>
                    <FormMessage/>
                </FormItem>

            )} />
                <FormField control={form.control} name="mobileNumber" render={({field})=>(
                <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="123567890" type="number"/></FormControl>
                    <FormMessage/>
                </FormItem>

            )} />
                <FormField control={form.control} name="city" render={({field})=>(
                <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="Delhi" type="text"/></FormControl>
                    <FormMessage/>
                </FormItem>
            )} />

       <FormField control={form.control} name="pinCode" render={({field})=>(
                <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="201103" type="number"/></FormControl>
                    <FormMessage/>
                </FormItem>
            )} />
            <FormField control={form.control} name="state" render={({field})=>(
                <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="Delhi" type="number"/></FormControl>
                    <FormMessage/>
                </FormItem>
            )} />

            

        </div>
        <FormError message={error } />
        <FormSuccess message={success}/>
        <Button  disabled={isPending } type="submit" className="w-full">Ship On This Address</Button>
    </form>

 </Form>
)
}
"use client"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
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
import { useRouter, useSearchParams } from "next/navigation"

export const LoginForm=()=>{
    const searchParamas=useSearchParams()
    const urlError=searchParamas.get("error")==="OAuthAccountNotLinked" ? "Email Already in Use With Different Provider":""
    const [error,setError]=useState<string|undefined>("")
    const [success,setSucess]=useState<string|undefined>("")
    const [isPending,startTransition]=useTransition()

    const router=useRouter()

    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })


    const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
        setError("")
        setSucess("")
        startTransition(()=>{
        login(values).then((data)=>{
            setError(data?.error)
            setSucess(data.success)

       })
    }
   
    )
    router.refresh()


    }




   return( <CardWrapper headerLabel="Welcome back" backButtonLabel="Dont Have an Account?" backButtonHref="/auth/register" showSocial>
 <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="space-y-4">
            <FormField control={form.control} name="email" render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="john.doe@example.com" type="email"/></FormControl>
                    <FormMessage/>
                </FormItem>

            )} />
                <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input {...field} disabled={isPending } placeholder="********" type="password"/></FormControl>
                    <FormMessage/>
                </FormItem>

            )} />

            

        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success}/>
        <Button  disabled={isPending } type="submit" className="w-full">Login</Button>
    </form>

 </Form>
</CardWrapper>
)
}
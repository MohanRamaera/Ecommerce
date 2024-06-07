"use client"
import { ColumnDef } from '@tanstack/react-table';
export type OrderColumn = {
    id: string | null |undefined
    name: string | null |undefined
    mobileNumber: string | null |undefined
    line1: string | null |undefined
    city: string | null |undefined
    pinCode: string | null |undefined
    products:string[]
    price:number | null
    createdAt: string
}


export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Created At ',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'mobileNumber',
        header: 'Mobile Number',
    },
    {
        accessorKey: 'products',
        header: 'Products',
    },
    {
        accessorKey: 'price',
        header: 'Amount',
    },
    {
        accessorKey: 'line1',
        header: 'Address',
    },
    {
        accessorKey: 'city',
        header: 'City',
    },
    {
        accessorKey: 'pinCode',
        header: 'Pin Code',
    },
    {
        accessorKey: 'state',
        header: 'State',
    },
  
]
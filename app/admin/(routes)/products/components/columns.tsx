"use client"
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
export type ProductColumn = {
    id: string
    name: string
    price: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
}


export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'isArchived',
        header: 'Archived',
    },
    {
        accessorKey: 'isFeatured',
        header: 'Featured',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
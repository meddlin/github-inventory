"use client";
import { useState, useEffect } from 'react';
import { 
    useReactTable, 
    createColumnHelper,
    flexRender, 
    getCoreRowModel, 
    getPaginationRowModel
} from "@tanstack/react-table";
import { 
    ViewDetailModal, 
    ViewDetailModalOpenButton, 
    ViewDetailModalDismissButton, 
    ViewDetailModalContents
} from '@/components/view-detail-modal';
import ViewDetailDisplay from '@/components/view-detail-display';
import Link from 'next/link';

const Home = () => {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-xl">GitHub Inventory</h1>

            <Link href="/repo-table">Go to repo table</Link>
        </main>
    );
}

export default Home;
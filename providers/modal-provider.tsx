"use client"

import PreviewModal from '@/components/preview-modal';
import React from 'react';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }

    return <PreviewModal />
}
export default ModalProvider;
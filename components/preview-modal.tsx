"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import ProductModal from "@/components/ui/product-modal";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import React from "react";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <ProductModal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.Image} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </ProductModal>
  );
};

export default PreviewModal;

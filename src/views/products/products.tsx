"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter, useSearchParams } from "next/navigation";

const ProductsContent: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  useEffect(() => {
    const productId = searchParams.get('product-id');
    if (productId) {
      const product = PRODUCTS_DATA.find(p => p.id.toString() === productId);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [searchParams]);

  const handleOpenModal = useCallback((product: Product) => {
    const params = new URLSearchParams(searchParams);
    params.set('product-id', product.id.toString());
    router.push(`/products?${params.toString()}`);
  }, [router, searchParams]);

  const handleCloseModal = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('product-id');
    const newUrl = params.toString() ? `/products?${params.toString()}` : '/products';
    router.push(newUrl);
  }, [router, searchParams]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export const Products: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
};

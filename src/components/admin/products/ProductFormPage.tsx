"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Form, Space, Spin } from "antd";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import TiptapEditor from "@/components/common/TiptapEditor";
import { useProductCategoriesQuery } from "@/services/product-categories/queries";
import { useProductQuery, useAdminProductsQuery } from "@/services/products/queries";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useAddRelatedProductMutation,
  useDeleteRelatedProductMutation,
} from "@/services/products/mutations";
import { BenefitItemWithPreview } from "./components/BenefitItemWithPreview";
import { GeneralInfoCard } from "./components/GeneralInfoCard";
import { DescriptionActionsCard } from "./components/DescriptionActionsCard";
import { SeoMetadataCard } from "./components/SeoMetadataCard";
import { RelatedProductsCard } from "./components/RelatedProductsCard";
import { SidebarControls } from "./components/SidebarControls";

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();

  const productId = params?.id as string;
  const isEditMode = Boolean(productId);

  // States for images
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<{ file: File; url: string }[]>([]);
  const [existingGallery, setExistingGallery] = useState<any[]>([]);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // State for related product search
  const [searchRelatedText, setSearchRelatedText] = useState("");
  const [selectedRelatedId, setSelectedRelatedId] = useState<string | undefined>(undefined);

  // Fetch product detail (if in edit mode)
  const { data: productData, isLoading: isProductLoading } = useProductQuery(
    productId,
    isEditMode
  );

  // Fetch Categories
  const { data: categoriesData } = useProductCategoriesQuery({
    limit: 100,
    status: "published",
  });
  const categoriesList = categoriesData?.data?.items || [];

  // Fetch all products (for related product search selection)
  const { data: allProductsData } = useAdminProductsQuery({
    page: 1,
    limit: 100,
    search: searchRelatedText || undefined,
    status: "published",
  });
  const linkableProducts = (allProductsData?.data?.items || []).filter(
    (p) => p.id !== productId // Prevent linking product to itself
  );

  // Mutations
  const createMutation = useCreateProductMutation((newProd) => {
    router.push("/admin/product");
  });

  const updateMutation = useUpdateProductMutation(() => {
    router.push("/admin/product");
  });

  const addRelatedMutation = useAddRelatedProductMutation(productId);
  const deleteRelatedMutation = useDeleteRelatedProductMutation(productId);

  // Populate form with product data in Edit Mode
  useEffect(() => {
    if (isEditMode && productData?.data) {
      const prod = productData.data;
      form.setFieldsValue({
        slug: prod.slug,
        title: prod.title,
        categoryId: prod.categoryId || undefined,
        categoryLabel: prod.categoryLabel || "",
        description: prod.description || "",
        badges: prod.badges || [],
        features: prod.features || [],
        contents: typeof prod.contents === 'string' ? prod.contents : '',
        benefits: (() => {
          if (!prod.benefits) return [];
          if (Array.isArray(prod.benefits)) return prod.benefits;
          if (typeof prod.benefits === "string") {
            try {
              const parsed = JSON.parse(prod.benefits);
              return Array.isArray(parsed) ? parsed : (parsed.list || []);
            } catch (e) {
              console.error("Failed to parse benefits JSON string:", e);
              return [];
            }
          }
          return prod.benefits.list || [];
        })(),
        primaryActionLabel: prod.primaryActionLabel || "",
        primaryActionHref: prod.primaryActionHref || "",
        sortOrder: prod.sortOrder,
        status: prod.status,
        seoTitle: prod.seoTitle || "",
        seoDescription: prod.seoDescription || "",
        seoKeywords: prod.seoKeywords || "",
        seoRobots: prod.seoRobots || "",
      });

      if (prod.thumbnailUrl) {
        setThumbnailPreview(prod.thumbnailUrl);
      }
      if (prod.productGalleryItems) {
        setExistingGallery(prod.productGalleryItems);
      }
      if (prod.video) {
        setVideoPreview(prod.video);
      }
    } else if (!isEditMode) {
      form.setFieldsValue({
        sortOrder: 0,
        status: "published",
        badges: [],
        features: [],
        contents: "",
        benefits: [],
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        seoRobots: "",
      });
    }
  }, [isEditMode, productData, form]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (thumbnailPreview && !thumbnailPreview.startsWith("http")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      if (videoPreview && !videoPreview.startsWith("http")) {
        URL.revokeObjectURL(videoPreview);
      }
      galleryPreviews.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [thumbnailPreview, galleryPreviews]);

  // Handle Slug generation on title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) {
      const title = e.target.value;
      const slugVal = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-") // Collapse consecutive dashes
        .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes
      form.setFieldsValue({ slug: slugVal });
    }
  };



  // Handle related product linking
  const handleAddRelatedLink = () => {
    if (!selectedRelatedId) return;
    addRelatedMutation.mutate(
      {
        id: productId,
        relatedId: selectedRelatedId,
        sortOrder: 0,
      },
      {
        onSuccess: () => {
          setSelectedRelatedId(undefined);
          setSearchRelatedText("");
        },
      }
    );
  };

  // Handle related product unlinking
  const handleRemoveRelatedLink = (relatedId: string) => {
    deleteRelatedMutation.mutate({
      id: productId,
      relatedId,
    });
  };

  // Main Form Submit Handler
  const onFinish = (values: any) => {
    const payload: any = {
      ...values,
      thumbnail: thumbnailFile,
      galleryImages: galleryFiles,
    };

    if (videoFile) {
      payload.video = videoFile;
    }

    if (values.contents) {
      payload.contents = values.contents;
    }

    if (values.benefits) {
      const benefitImages: File[] = [];
      const cleanedBenefits = values.benefits.map((benefit: any) => {
        const cleanBenefit = { ...benefit };
        if (cleanBenefit.imageFile && cleanBenefit.imageFile.length > 0) {
          const file = cleanBenefit.imageFile[0].originFileObj || cleanBenefit.imageFile[0];
          if (file instanceof File) {
            benefitImages.push(file);
            cleanBenefit.imageFileIndex = benefitImages.length - 1;
          }
        }
        delete cleanBenefit.imageFile;
        return cleanBenefit;
      });

      payload.benefits = JSON.stringify(cleanedBenefits);
      if (benefitImages.length > 0) {
        payload.benefitImages = benefitImages;
      }
    }

    if (isEditMode) {
      // Send remaining existing gallery items as a JSON string
      payload.productGalleryItems = JSON.stringify(existingGallery);
      updateMutation.mutate({
        id: productId,
        payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push("/admin/product")}
            className="flex items-center justify-center hover:bg-slate-100 rounded-lg p-2"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {isEditMode ? "Edit Product" : "Create Product"}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {isEditMode
                ? "Update your product details, gallery images and cross-selling links."
                : "Fill out the fields to publish a brand new digital product."}
            </p>
          </div>
        </div>
        <Space>
          <Button onClick={() => router.push("/admin/product")} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={createMutation.isPending || updateMutation.isPending}
            size="large"
            className="bg-blue-600 hover:bg-blue-700 border-none font-semibold px-6 rounded-lg"
          >
            Save Changes
          </Button>
        </Space>
      </div>

      {isProductLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Spin size="large" description="Loading product details..." />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6 flex flex-col gap-4">
            <GeneralInfoCard
              categoriesList={categoriesList}
              handleTitleChange={handleTitleChange}
              form={form}
            />

            <DescriptionActionsCard />

            {/* Card: Benefits */}
            <Card
              title={<span className="font-semibold text-slate-700">Benefits</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <Form.List name="benefits">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }) => (
                      <BenefitItemWithPreview
                        key={key}
                        name={name}
                        restField={restField}
                        remove={remove}
                      />
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<Plus className="w-4 h-4" />}
                      className="rounded-xl h-11 border-slate-300 text-slate-600 hover:text-blue-600 hover:border-blue-400 font-medium"
                    >
                      Add Benefit
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>

            {/* Card: Content */}
            <Card
              title={<span className="font-semibold text-slate-700">Detailed Content</span>}
              className="shadow-sm border-slate-100 rounded-2xl"
            >
              <Form.Item
                name="contents"
                className="mb-0"
              >
                <TiptapEditor />
              </Form.Item>
            </Card>

            <SeoMetadataCard />

            <RelatedProductsCard
              isEditMode={isEditMode}
              productData={productData}
              selectedRelatedId={selectedRelatedId}
              setSelectedRelatedId={setSelectedRelatedId}
              setSearchRelatedText={setSearchRelatedText}
              linkableProducts={linkableProducts}
              handleAddRelatedLink={handleAddRelatedLink}
              handleRemoveRelatedLink={handleRemoveRelatedLink}
            />
          </div>

          {/* Cột Phải (Side Controls & Media) - Chiếm 1/3 */}
          <div className="space-y-6">
            <SidebarControls
              form={form}
              thumbnailPreview={thumbnailPreview}
              setThumbnailFile={setThumbnailFile}
              setThumbnailPreview={setThumbnailPreview}
              videoPreview={videoPreview}
              setVideoFile={setVideoFile}
              setVideoPreview={setVideoPreview}
              existingGallery={existingGallery}
              setExistingGallery={setExistingGallery}
              galleryPreviews={galleryPreviews}
              setGalleryFiles={setGalleryFiles}
              setGalleryPreviews={setGalleryPreviews}
            />
          </div>
        </Form>
      )}
    </div>
  );
}

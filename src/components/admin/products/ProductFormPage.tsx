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
import { generateSlug } from "@/utils/slug";

type GalleryMediaItem = { mediaId: string; url: string };
type BenefitFormItem = { imageFile?: Array<{ originFileObj?: File } | File>;[key: string]: unknown };
type ProductFormValues = { contents?: string; benefits?: BenefitFormItem[];[key: string]: unknown };

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();

  const productId = params?.id as string;
  const isEditMode = Boolean(productId);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null | undefined>(undefined);
  const [thumbnailMediaUrl, setThumbnailMediaUrl] = useState<string | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<{ file: File; url: string }[]>([]);
  const [existingGallery, setExistingGallery] = useState<GalleryMediaItem[] | undefined>(undefined);
  const [galleryImageMediaItems, setGalleryImageMediaItems] = useState<GalleryMediaItem[]>([]);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null | undefined>(undefined);
  const [videoMediaUrl, setVideoMediaUrl] = useState<string | null>(null);

  const [searchRelatedText, setSearchRelatedText] = useState("");
  const [selectedRelatedId, setSelectedRelatedId] = useState<string | undefined>(undefined);

  const { data: productData, isLoading: isProductLoading } = useProductQuery(productId, isEditMode);
  const { data: categoriesData } = useProductCategoriesQuery({ limit: 100, status: "published" });
  const categoriesList = categoriesData?.data?.items || [];

  const { data: allProductsData } = useAdminProductsQuery({
    page: 1,
    limit: 100,
    search: searchRelatedText || undefined,
    status: "published",
  });
  const linkableProducts = (allProductsData?.data?.items || []).filter((p) => p.id !== productId);

  const createMutation = useCreateProductMutation(() => {
    router.push("/admin/product");
  });
  const updateMutation = useUpdateProductMutation(() => {
    router.push("/admin/product");
  });

  const addRelatedMutation = useAddRelatedProductMutation(productId);
  const deleteRelatedMutation = useDeleteRelatedProductMutation(productId);

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
        contents: typeof prod.contents === "string" ? prod.contents : "",
        benefits: (() => {
          if (!prod.benefits) return [];
          if (Array.isArray(prod.benefits)) return prod.benefits;
          if (typeof prod.benefits === "string") {
            try {
              const parsed = JSON.parse(prod.benefits);
              return Array.isArray(parsed) ? parsed : (parsed.list || []);
            } catch (error) {
              console.error("Failed to parse benefits JSON string:", error);
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

  const resolvedExistingGallery = existingGallery ?? productData?.data?.productGalleryItems ?? [];

  const resolvedThumbnailPreview =
    thumbnailPreview === undefined ? productData?.data?.thumbnailUrl || null : thumbnailPreview;
  const resolvedVideoPreview =
    videoPreview === undefined ? productData?.data?.video || null : videoPreview;

  useEffect(() => {
    return () => {
      if (thumbnailPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      if (videoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreview);
      }
      galleryPreviews.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [thumbnailPreview, videoPreview, galleryPreviews]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) {
      const slugVal = generateSlug(e.target.value);
      form.setFieldsValue({ slug: slugVal });
    }
  };

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

  const handleRemoveRelatedLink = (relatedId: string) => {
    deleteRelatedMutation.mutate({ id: productId, relatedId });
  };

  const onFinish = (values: ProductFormValues) => {
    const payload: Record<string, unknown> = {
      ...values,
      galleryImages: galleryFiles,
    };

    if (thumbnailFile) {
      payload.thumbnail = thumbnailFile;
    } else if (thumbnailMediaUrl) {
      payload.thumbnailUrl = thumbnailMediaUrl;
    }

    if (videoFile) {
      payload.video = videoFile;
    } else if (videoMediaUrl) {
      payload.videoUrl = videoMediaUrl;
    }

    if (values.contents) {
      payload.contents = values.contents;
    }

    if (values.benefits) {
      const benefitImages: File[] = [];
      const cleanedBenefits = values.benefits.map((benefit) => {
        const cleanBenefit: Record<string, unknown> = { ...benefit };
        const imageFileValue = cleanBenefit.imageFile as BenefitFormItem["imageFile"] | undefined;
        if (imageFileValue && imageFileValue.length > 0) {
          const fileSource = imageFileValue[0] as { originFileObj?: File } | File;
          const file = fileSource instanceof File ? fileSource : fileSource.originFileObj || fileSource;
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

    const mergedGalleryMediaIds = Array.from(
      new Set([
        ...resolvedExistingGallery.map((item) => item.mediaId),
        ...galleryImageMediaItems.map((item) => item.mediaId),
      ])
    );

    if (mergedGalleryMediaIds.length > 0) {
      payload.galleryImageMediaIds = mergedGalleryMediaIds;
    }

    if (isEditMode) {
      payload.productGalleryItems = JSON.stringify(resolvedExistingGallery);
      updateMutation.mutate({ id: productId, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
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
        <div className="h-100 flex items-center justify-center">
          <Spin size="large" description="Loading product details..." />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 flex flex-col gap-4">
            <GeneralInfoCard categoriesList={categoriesList} handleTitleChange={handleTitleChange} form={form} />

            <DescriptionActionsCard />

            <Card title={<span className="font-semibold text-slate-700">Benefits</span>} className="shadow-sm border-slate-100 rounded-2xl">
              <Form.List name="benefits">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }) => (
                      <BenefitItemWithPreview key={key} name={name} restField={restField} remove={remove} />
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

            <Card title={<span className="font-semibold text-slate-700">Detailed Content</span>} className="shadow-sm border-slate-100 rounded-2xl">
              <Form.Item name="contents" className="mb-0">
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

          <div className="space-y-6">
            <SidebarControls
              form={form}
              thumbnailPreview={resolvedThumbnailPreview}
              setThumbnailFile={setThumbnailFile}
              setThumbnailPreview={setThumbnailPreview}
              setThumbnailMediaUrl={setThumbnailMediaUrl}
              videoPreview={resolvedVideoPreview}
              setVideoFile={setVideoFile}
              setVideoPreview={setVideoPreview}
              setVideoMediaUrl={setVideoMediaUrl}
              existingGallery={resolvedExistingGallery}
              setExistingGallery={setExistingGallery}
              galleryImageMediaItems={galleryImageMediaItems}
              setGalleryImageMediaItems={setGalleryImageMediaItems}
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

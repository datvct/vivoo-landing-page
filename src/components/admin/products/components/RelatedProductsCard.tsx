"use client";

import React from "react";
import { Card, Tooltip, Select, Button, Table } from "antd";
import { Plus, X } from "lucide-react";

type RelatedProductsCardProps = {
  isEditMode: boolean;
  productData: any;
  selectedRelatedId: string | undefined;
  setSelectedRelatedId: (val: string | undefined) => void;
  setSearchRelatedText: (val: string) => void;
  linkableProducts: any[];
  handleAddRelatedLink: () => void;
  handleRemoveRelatedLink: (relatedId: string) => void;
};

export const RelatedProductsCard = ({
  isEditMode,
  productData,
  selectedRelatedId,
  setSelectedRelatedId,
  setSearchRelatedText,
  linkableProducts,
  handleAddRelatedLink,
  handleRemoveRelatedLink,
}: RelatedProductsCardProps) => {
  if (!isEditMode) return null;

  return (
    <Card
      title={
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-slate-700">Related Products (Cross-selling)</span>
          <Tooltip title="Link a related product for upsell">
            <div className="flex items-center gap-2">
              <Select
                showSearch
                placeholder="Search product to link..."
                className="w-64 h-[32px] [&_.ant-select-selector]:!rounded-lg"
                value={selectedRelatedId}
                onChange={setSelectedRelatedId}
                onSearch={setSearchRelatedText}
                filterOption={false}
                options={linkableProducts.map((p) => ({
                  label: p.title,
                  value: p.id,
                }))}
              />
              <Button
                type="primary"
                icon={<Plus className="w-4 h-4" />}
                onClick={handleAddRelatedLink}
                disabled={!selectedRelatedId}
                className="bg-blue-600 hover:bg-blue-700 border-none h-[32px] rounded-lg"
              >
                Link
              </Button>
            </div>
          </Tooltip>
        </div>
      }
      className="shadow-sm border-slate-100 rounded-2xl"
    >
      <Table
        dataSource={productData?.data?.relatedProducts || []}
        rowKey="id"
        pagination={false}
        size="small"
        columns={[
          {
            title: "Product",
            dataIndex: "title",
            key: "title",
            render: (title: string, record: any) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                  {record.thumbnailUrl ? (
                    <img src={record.thumbnailUrl} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-300 text-[8px]">No image</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-slate-800 text-sm">{title}</span>
                  <div className="text-[11px] text-slate-400 font-mono">{record.slug}</div>
                </div>
              </div>
            ),
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status: string) => {
              const isPub = status === "published";
              return (
                <span
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium border ${
                    isPub
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-slate-50 text-slate-500 border-slate-100"
                  }`}
                >
                  {isPub ? "Published" : "Draft"}
                </span>
              );
            },
          },
          {
            title: "Action",
            key: "action",
            width: 80,
            align: "center",
            render: (_, record: any) => (
              <Button
                type="text"
                danger
                icon={<X className="w-4 h-4" />}
                onClick={() => handleRemoveRelatedLink(record.id)}
                className="hover:bg-red-50 rounded-lg flex items-center justify-center p-2"
              />
            ),
          },
        ]}
      />
    </Card>
  );
};

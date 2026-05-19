"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Spin, Row, Col, Space, Typography, Upload, Popconfirm, Tabs, Divider, message } from "antd";
import {
  Save,
  Plus,
  Trash2,
  UploadCloud,
  Sliders,
  Building,
  Users,
  ShieldAlert,
  Heading,
  Globe,
} from "lucide-react";
import { useSiteSettingQuery } from "@/services/site-settings/queries";
import { useUpsertSiteSettingMutation } from "@/services/site-settings/mutations";
import { useUploadMediaMutation } from "@/services/media/mutations";
import { HomeSettings, HomeBannerSlide, HomeIndustry, HomeStory, HomeComplianceItem } from "@/types/types";

const { Title, Paragraph } = Typography;

export default function HomeSettingsPage() {
  const { data: settingData, isLoading } = useSiteSettingQuery("home");
  const upsertMutation = useUpsertSiteSettingMutation();
  const uploadMutation = useUploadMediaMutation();

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [form, setForm] = useState<HomeSettings>({
    banners: [],
    trustedTitle: "",
    trustedLogos: [],
    productsTitle: "",
    productsDescription: "",
    solutionsTitle: "",
    solutionsDescription: "",
    servicesTitle: "",
    servicesDescription: "",
    industriesTitle: "",
    industriesDescription: "",
    industriesList: [],
    storiesTitle: "",
    storiesDescription: "",
    storiesList: [],
    complianceTitle: "",
    complianceDescription: "",
    complianceList: [],
  });

  // Sync loaded settings to state
  useEffect(() => {
    if (settingData?.data?.value) {
      const val = settingData.data.value as Partial<HomeSettings>;
      setForm({
        banners: val.banners || [],
        trustedTitle: val.trustedTitle || "",
        trustedLogos: val.trustedLogos || [],
        productsTitle: val.productsTitle || "",
        productsDescription: val.productsDescription || "",
        solutionsTitle: val.solutionsTitle || "",
        solutionsDescription: val.solutionsDescription || "",
        servicesTitle: val.servicesTitle || "",
        servicesDescription: val.servicesDescription || "",
        industriesTitle: val.industriesTitle || "",
        industriesDescription: val.industriesDescription || "",
        industriesList: val.industriesList || [],
        storiesTitle: val.storiesTitle || "",
        storiesDescription: val.storiesDescription || "",
        storiesList: val.storiesList || [],
        complianceTitle: val.complianceTitle || "",
        complianceDescription: val.complianceDescription || "",
        complianceList: val.complianceList || [],
      });
    }
  }, [settingData]);

  const handleSave = () => {
    upsertMutation.mutate({
      key: "home",
      value: form,
    });
  };

  // Helper upload functions
  const handleBannerUpload = async (file: File, index: number) => {
    try {
      setUploadingField(`banner-${index}`);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        setForm((prev) => {
          const next = [...prev.banners];
          next[index].image = res.data.secureUrl;
          return { ...prev, banners: next };
        });
        message.success("Banner uploaded successfully!");
      }
    } catch (err) {
      // handled
    } finally {
      setUploadingField(null);
    }
  };

  const handleTrustedLogoUpload = async (file: File, index: number) => {
    try {
      setUploadingField(`trusted-${index}`);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        setForm((prev) => {
          const next = [...prev.trustedLogos];
          next[index] = res.data.secureUrl;
          return { ...prev, trustedLogos: next };
        });
        message.success("Logo uploaded successfully!");
      }
    } catch (err) {
      // handled
    } finally {
      setUploadingField(null);
    }
  };

  const handleIndustryUpload = async (file: File, index: number) => {
    try {
      setUploadingField(`industry-${index}`);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        setForm((prev) => {
          const next = [...prev.industriesList];
          next[index].image = res.data.secureUrl;
          return { ...prev, industriesList: next };
        });
        message.success("Industry image uploaded successfully!");
      }
    } catch (err) {
      // handled
    } finally {
      setUploadingField(null);
    }
  };

  const handleStoryImageUpload = async (file: File, index: number) => {
    try {
      setUploadingField(`story-img-${index}`);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        setForm((prev) => {
          const next = [...prev.storiesList];
          next[index].image = res.data.secureUrl;
          return { ...prev, storiesList: next };
        });
        message.success("Story image uploaded!");
      }
    } catch (err) {
      // handled
    } finally {
      setUploadingField(null);
    }
  };

  const handleStoryLogoUpload = async (file: File, index: number) => {
    try {
      setUploadingField(`story-logo-${index}`);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        setForm((prev) => {
          const next = [...prev.storiesList];
          next[index].logo = res.data.secureUrl;
          return { ...prev, storiesList: next };
        });
        message.success("Story logo uploaded!");
      }
    } catch (err) {
      // handled
    } finally {
      setUploadingField(null);
    }
  };

  // List Management
  const addBanner = () => {
    setForm((prev) => ({
      ...prev,
      banners: [...prev.banners, { id: String(Date.now()), image: "", alt: "" }],
    }));
  };

  const removeBanner = (index: number) => {
    setForm((prev) => {
      const next = [...prev.banners];
      next.splice(index, 1);
      return { ...prev, banners: next };
    });
  };

  const addTrustedLogo = () => {
    setForm((prev) => ({
      ...prev,
      trustedLogos: [...prev.trustedLogos, ""],
    }));
  };

  const removeTrustedLogo = (index: number) => {
    setForm((prev) => {
      const next = [...prev.trustedLogos];
      next.splice(index, 1);
      return { ...prev, trustedLogos: next };
    });
  };

  const addIndustry = () => {
    setForm((prev) => ({
      ...prev,
      industriesList: [
        ...prev.industriesList,
        {
          id: String(Date.now()),
          label: "",
          iconName: "Building2",
          image: "",
          imageAlt: "",
          imagePosition: "center center",
        },
      ],
    }));
  };

  const removeIndustry = (index: number) => {
    setForm((prev) => {
      const next = [...prev.industriesList];
      next.splice(index, 1);
      return { ...prev, industriesList: next };
    });
  };

  const addStory = () => {
    setForm((prev) => ({
      ...prev,
      storiesList: [
        ...prev.storiesList,
        {
          id: String(Date.now()),
          company: "",
          title: "",
          quote: "",
          author: "",
          image: "",
          logo: "",
        },
      ],
    }));
  };

  const removeStory = (index: number) => {
    setForm((prev) => {
      const next = [...prev.storiesList];
      next.splice(index, 1);
      return { ...prev, storiesList: next };
    });
  };

  const addCompliance = () => {
    setForm((prev) => ({
      ...prev,
      complianceList: [
        ...prev.complianceList,
        {
          id: String(Date.now()),
          title: "",
          iconName: "BadgeCheck",
        },
      ],
    }));
  };

  const removeCompliance = (index: number) => {
    setForm((prev) => {
      const next = [...prev.complianceList];
      next.splice(index, 1);
      return { ...prev, complianceList: next };
    });
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-2">
        <Spin size="large" />
        <span className="text-slate-400 text-sm font-medium">Loading CMS configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Save bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in-50 duration-300">
        <div>
          <Title level={2} className="!mb-0 !font-bold tracking-tight text-slate-800">
            Homepage CMS Settings
          </Title>
          <Paragraph className="text-slate-500 text-sm !mb-0 mt-1">
            Easily update text copy, logos, banner sliders, industries, customer quotes, and certifications.
          </Paragraph>
        </div>
        <Button
          type="primary"
          icon={<Save className="w-4 h-4 mr-1 inline-block" />}
          onClick={handleSave}
          loading={upsertMutation.isPending}
          size="large"
          className="shadow-sm font-semibold h-[40px] px-6 rounded-lg bg-blue-600 hover:bg-blue-700 border-none flex items-center"
        >
          Save Changes
        </Button>
      </div>

      <Card bordered={false} className="rounded-2xl border border-slate-100 shadow-sm">
        <Tabs
          defaultActiveKey="banners"
          items={[
            {
              key: "banners",
              label: (
                <span className="flex items-center gap-2 font-semibold">
                  <Sliders className="w-4 h-4" /> Banners & Trusted Logos
                </span>
              ),
              children: (
                <div className="space-y-6 pt-4">
                  {/* Banners */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-800">Hero Banners</h3>
                      <Button
                        type="dashed"
                        icon={<Plus className="w-3.5 h-3.5 mr-1 inline-block" />}
                        onClick={addBanner}
                        size="small"
                      >
                        Add Banner
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {form.banners.map((banner, index) => (
                        <div key={banner.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3 relative group">
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Popconfirm title="Delete slide?" onConfirm={() => removeBanner(index)}>
                              <Button type="text" danger icon={<Trash2 className="w-4 h-4" />} size="small" />
                            </Popconfirm>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Image URL</label>
                            <div className="flex gap-2">
                              <Input
                                value={banner.image}
                                onChange={(e) => {
                                  const next = [...form.banners];
                                  next[index].image = e.target.value;
                                  setForm({ ...form, banners: next });
                                }}
                                placeholder="Enter image URL"
                                className="h-[36px] rounded-lg"
                              />
                              <Upload beforeUpload={(file) => { handleBannerUpload(file, index); return false; }} showUploadList={false}>
                                <Button icon={<UploadCloud className="w-4 h-4 mr-1" />} loading={uploadingField === `banner-${index}`} className="h-[36px] flex items-center">Upload</Button>
                              </Upload>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Description / Alt</label>
                            <Input
                              value={banner.alt}
                              onChange={(e) => {
                                const next = [...form.banners];
                                next[index].alt = e.target.value;
                                setForm({ ...form, banners: next });
                              }}
                              className="h-[36px] rounded-lg"
                              placeholder="Enter description"
                            />
                          </div>
                          {banner.image && (
                            <div className="h-[100px] rounded-lg border border-dashed bg-white flex items-center justify-center p-1.5 overflow-hidden">
                              <img src={banner.image} className="max-h-full max-w-full object-cover rounded" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  {/* Trusted Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-800">Trusted By Section</h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Section Title</label>
                      <Input
                        value={form.trustedTitle}
                        onChange={(e) => setForm({ ...form, trustedTitle: e.target.value })}
                        placeholder="e.g. Trusted by 100,000+ organizations globally"
                        className="h-[38px] rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Organization Logos</label>
                        <Button
                          type="dashed"
                          icon={<Plus className="w-3.5 h-3.5 mr-1 inline-block" />}
                          onClick={addTrustedLogo}
                          size="small"
                        >
                          Add Logo
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {form.trustedLogos.map((logo, index) => (
                          <div key={index} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 relative group flex flex-col gap-2">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Popconfirm title="Delete logo?" onConfirm={() => removeTrustedLogo(index)}>
                                <Button type="text" danger icon={<Trash2 className="w-3.5 h-3.5" />} size="small" />
                              </Popconfirm>
                            </div>
                            <div className="flex gap-1.5 mt-4">
                              <Input
                                value={logo}
                                onChange={(e) => {
                                  const next = [...form.trustedLogos];
                                  next[index] = e.target.value;
                                  setForm({ ...form, trustedLogos: next });
                                }}
                                placeholder="Enter logo URL"
                                className="h-[32px] rounded-lg text-xs"
                              />
                              <Upload beforeUpload={(file) => { handleTrustedLogoUpload(file, index); return false; }} showUploadList={false}>
                                <Button icon={<UploadCloud className="w-3.5 h-3.5" />} loading={uploadingField === `trusted-${index}`} className="h-[32px] flex items-center px-2" />
                              </Upload>
                            </div>
                            {logo && (
                              <div className="h-[60px] rounded border border-dashed bg-white flex items-center justify-center p-1.5 overflow-hidden">
                                <img src={logo} className="max-h-full max-w-full object-contain" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "titles",
              label: (
                <span className="flex items-center gap-2 font-semibold">
                  <Heading className="w-4 h-4" /> Section Headers
                </span>
              ),
              children: (
                <div className="flex flex-col gap-4">
                  {/* Products */}
                  <Card size="small" title="Products Section Banner" className="rounded-xl border-slate-100 bg-slate-50/10">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Title</label>
                        <Input
                          value={form.productsTitle}
                          onChange={(e) => setForm({ ...form, productsTitle: e.target.value })}
                          className="h-[38px] rounded-lg"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
                        <Input.TextArea
                          value={form.productsDescription}
                          onChange={(e) => setForm({ ...form, productsDescription: e.target.value })}
                          rows={2}
                          className="rounded-lg"
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Solutions */}
                  <Card size="small" title="Solutions Section Banner" className="rounded-xl border-slate-100 bg-slate-50/10">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Title</label>
                        <Input
                          value={form.solutionsTitle}
                          onChange={(e) => setForm({ ...form, solutionsTitle: e.target.value })}
                          className="h-[38px] rounded-lg"
                          placeholder="Enter title solution"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
                        <Input.TextArea
                          value={form.solutionsDescription}
                          onChange={(e) => setForm({ ...form, solutionsDescription: e.target.value })}
                          rows={2}
                          className="rounded-lg"
                          placeholder="Enter description solution"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Services */}
                  <Card size="small" title="Services Section Banner" className="rounded-xl border-slate-100 bg-slate-50/10">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Title</label>
                        <Input
                          value={form.servicesTitle}
                          onChange={(e) => setForm({ ...form, servicesTitle: e.target.value })}
                          className="h-[38px] rounded-lg"
                          placeholder="Enter service title"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
                        <Input.TextArea
                          value={form.servicesDescription}
                          onChange={(e) => setForm({ ...form, servicesDescription: e.target.value })}
                          rows={2}
                          className="rounded-lg"
                          placeholder="Enter service description"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              key: "industries",
              label: (
                <span className="flex items-center gap-2 font-semibold">
                  <Building className="w-4 h-4" /> Industries Section
                </span>
              ),
              children: (
                <div className="space-y-6 pt-4 animate-in fade-in-50 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Title</label>
                      <Input
                        value={form.industriesTitle}
                        onChange={(e) => setForm({ ...form, industriesTitle: e.target.value })}
                        className="h-[38px] rounded-lg"
                        placeholder="Enter industry title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Description</label>
                      <Input.TextArea
                        value={form.industriesDescription}
                        onChange={(e) => setForm({ ...form, industriesDescription: e.target.value })}
                        rows={2}
                        className="rounded-lg"
                        placeholder="Enter industry description"
                      />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-800">Industries ({form.industriesList.length})</h3>
                      <Button
                        type="dashed"
                        icon={<Plus className="w-3.5 h-3.5 mr-1 inline-block" />}
                        onClick={addIndustry}
                        size="small"
                      >
                        Add Industry
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {form.industriesList.map((ind, index) => (
                        <div key={ind.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 relative group space-y-3">
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Popconfirm title="Delete industry?" onConfirm={() => removeIndustry(index)}>
                              <Button type="text" danger icon={<Trash2 className="w-4 h-4" />} size="small" />
                            </Popconfirm>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Unique ID</label>
                              <Input
                                value={ind.id}
                                onChange={(e) => {
                                  const next = [...form.industriesList];
                                  next[index].id = e.target.value;
                                  setForm({ ...form, industriesList: next });
                                }}
                                className="h-[36px] rounded-lg"
                                placeholder="Enter industry ID"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Label Name</label>
                              <Input
                                value={ind.label}
                                onChange={(e) => {
                                  const next = [...form.industriesList];
                                  next[index].label = e.target.value;
                                  setForm({ ...form, industriesList: next });
                                }}
                                className="h-[36px] rounded-lg"
                                placeholder="Enter industry label"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Lucide Icon Name</label>
                              <Input
                                value={ind.iconName}
                                onChange={(e) => {
                                  const next = [...form.industriesList];
                                  next[index].iconName = e.target.value;
                                  setForm({ ...form, industriesList: next });
                                }}
                                placeholder="e.g. Building2, Server, GraduationCap"
                                className="h-[36px] rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Image URL</label>
                              <div className="flex gap-2">
                                <Input
                                  value={ind.image}
                                  onChange={(e) => {
                                    const next = [...form.industriesList];
                                    next[index].image = e.target.value;
                                    setForm({ ...form, industriesList: next });
                                  }}
                                  className="h-[36px] rounded-lg"
                                  placeholder="Enter image URL"
                                />
                                <Upload beforeUpload={(file) => { handleIndustryUpload(file, index); return false; }} showUploadList={false}>
                                  <Button icon={<UploadCloud className="w-4 h-4 mr-1" />} loading={uploadingField === `industry-${index}`} className="h-[36px] flex items-center">Upload</Button>
                                </Upload>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Image Position</label>
                              <Input
                                value={ind.imagePosition}
                                onChange={(e) => {
                                  const next = [...form.industriesList];
                                  next[index].imagePosition = e.target.value;
                                  setForm({ ...form, industriesList: next });
                                }}
                                placeholder="Enter image position"
                                className="h-[36px] rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Image Alt</label>
                              <Input
                                value={ind.imageAlt}
                                onChange={(e) => {
                                  const next = [...form.industriesList];
                                  next[index].imageAlt = e.target.value;
                                  setForm({ ...form, industriesList: next });
                                }}
                                className="h-[36px] rounded-lg"
                                placeholder="Enter image alt"
                              />
                            </div>
                            {ind.image && (
                              <div className="h-[80px] rounded border border-dashed bg-white flex items-center justify-center p-1.5 overflow-hidden">
                                <img src={ind.image} className="max-h-full max-w-full object-cover rounded" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "stories",
              label: (
                <span className="flex items-center gap-2 font-semibold">
                  <Users className="w-4 h-4" /> Customer Stories
                </span>
              ),
              children: (
                <div className="space-y-6 pt-4 animate-in fade-in-50 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Title</label>
                      <Input
                        value={form.storiesTitle}
                        onChange={(e) => setForm({ ...form, storiesTitle: e.target.value })}
                        className="h-[38px] rounded-lg"
                        placeholder="Enter customer stories title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Description</label>
                      <Input.TextArea
                        value={form.storiesDescription}
                        onChange={(e) => setForm({ ...form, storiesDescription: e.target.value })}
                        rows={2}
                        className="rounded-lg"
                        placeholder="Enter customer stories description"
                      />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-800">Stories ({form.storiesList.length})</h3>
                      <Button
                        type="dashed"
                        icon={<Plus className="w-3.5 h-3.5 mr-1 inline-block" />}
                        onClick={addStory}
                        size="small"
                      >
                        Add Story
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {form.storiesList.map((story, index) => (
                        <div key={story.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 relative group space-y-4">
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Popconfirm title="Delete story?" onConfirm={() => removeStory(index)}>
                              <Button type="text" danger icon={<Trash2 className="w-4 h-4" />} size="small" />
                            </Popconfirm>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Company Name</label>
                              <Input
                                value={story.company}
                                onChange={(e) => {
                                  const next = [...form.storiesList];
                                  next[index].company = e.target.value;
                                  setForm({ ...form, storiesList: next });
                                }}
                                placeholder="Enter company name"
                                className="h-[36px] rounded-lg"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Case Study Title</label>
                              <Input
                                value={story.title}
                                onChange={(e) => {
                                  const next = [...form.storiesList];
                                  next[index].title = e.target.value;
                                  setForm({ ...form, storiesList: next });
                                }}
                                className="h-[36px] rounded-lg"
                                placeholder="Enter case study title"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Quote Text</label>
                            <Input.TextArea
                              value={story.quote}
                              onChange={(e) => {
                                const next = [...form.storiesList];
                                next[index].quote = e.target.value;
                                setForm({ ...form, storiesList: next });
                              }}
                              rows={2}
                              className="rounded-lg"
                              placeholder="Enter quote text"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Author / Role</label>
                              <Input
                                value={story.author}
                                onChange={(e) => {
                                  const next = [...form.storiesList];
                                  next[index].author = e.target.value;
                                  setForm({ ...form, storiesList: next });
                                }}
                                className="h-[36px] rounded-lg"
                                placeholder="Enter author name"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Company Logo URL</label>
                              <div className="flex gap-2">
                                <Input
                                  value={story.logo}
                                  onChange={(e) => {
                                    const next = [...form.storiesList];
                                    next[index].logo = e.target.value;
                                    setForm({ ...form, storiesList: next });
                                  }}
                                  className="h-[36px] rounded-lg"
                                  placeholder="Enter company logo URL"
                                />
                                <Upload beforeUpload={(file) => { handleStoryLogoUpload(file, index); return false; }} showUploadList={false}>
                                  <Button icon={<UploadCloud className="w-4 h-4 mr-1" />} loading={uploadingField === `story-logo-${index}`} className="h-[36px] flex items-center">Upload</Button>
                                </Upload>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Story Image URL</label>
                              <div className="flex gap-2">
                                <Input
                                  value={story.image}
                                  onChange={(e) => {
                                    const next = [...form.storiesList];
                                    next[index].image = e.target.value;
                                    setForm({ ...form, storiesList: next });
                                  }}
                                  className="h-[36px] rounded-lg"
                                  placeholder="Enter story image URL"
                                />
                                <Upload beforeUpload={(file) => { handleStoryImageUpload(file, index); return false; }} showUploadList={false}>
                                  <Button icon={<UploadCloud className="w-4 h-4 mr-1" />} loading={uploadingField === `story-img-${index}`} className="h-[36px] flex items-center">Upload</Button>
                                </Upload>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              {story.logo && (
                                <div className="h-[60px] w-[100px] border border-dashed rounded bg-white flex items-center justify-center p-1.5 overflow-hidden">
                                  <img src={story.logo} className="max-h-full max-w-full object-contain" />
                                </div>
                              )}
                              {story.image && (
                                <div className="h-[60px] w-[100px] border border-dashed rounded bg-white flex items-center justify-center p-1.5 overflow-hidden">
                                  <img src={story.image} className="max-h-full max-w-full object-cover rounded" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "compliance",
              label: (
                <span className="flex items-center gap-2 font-semibold">
                  <Globe className="w-4 h-4" /> Compliance & Certifications
                </span>
              ),
              children: (
                <div className="space-y-6 pt-4 animate-in fade-in-50 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Title</label>
                      <Input
                        value={form.complianceTitle}
                        onChange={(e) => setForm({ ...form, complianceTitle: e.target.value })}
                        className="h-[38px] rounded-lg"
                        placeholder="Enter compliance title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Description</label>
                      <Input.TextArea
                        value={form.complianceDescription}
                        onChange={(e) => setForm({ ...form, complianceDescription: e.target.value })}
                        rows={2}
                        className="rounded-lg"
                        placeholder="Enter compliance description"
                      />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-800">Compliance Items ({form.complianceList.length})</h3>
                      <Button
                        type="dashed"
                        icon={<Plus className="w-3.5 h-3.5 mr-1 inline-block" />}
                        onClick={addCompliance}
                        size="small"
                      >
                        Add Item
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {form.complianceList.map((item, index) => (
                        <div key={item.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 relative group space-y-3">
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Popconfirm title="Delete item?" onConfirm={() => removeCompliance(index)}>
                              <Button type="text" danger icon={<Trash2 className="w-4 h-4" />} size="small" />
                            </Popconfirm>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Title / Name</label>
                            <Input
                              value={item.title}
                              onChange={(e) => {
                                const next = [...form.complianceList];
                                next[index].title = e.target.value;
                                setForm({ ...form, complianceList: next });
                              }}
                              className="h-[36px] rounded-lg"
                              placeholder="Enter compliance title"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Lucide Icon Name</label>
                            <Input
                              value={item.iconName}
                              onChange={(e) => {
                                const next = [...form.complianceList];
                                next[index].iconName = e.target.value;
                                setForm({ ...form, complianceList: next });
                              }}
                              placeholder="e.g. BadgeCheck, CircleCheckBig, ShieldCheck, Stamp"
                              className="h-[36px] rounded-lg"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

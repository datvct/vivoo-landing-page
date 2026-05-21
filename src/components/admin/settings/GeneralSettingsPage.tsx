"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Spin, Row, Col, Space, Typography, Upload, Popconfirm, Select, message, Tabs } from "antd";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Copyright,
  Save,
  UploadCloud,
  Plus,
  Trash2,
  HelpCircle,
  FolderOpen,
  Image as ImageIcon,
} from "lucide-react";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useSiteSettingQuery } from "@/services/site-settings/queries";
import { useUpsertSiteSettingMutation } from "@/services/site-settings/mutations";
import { useUploadMediaMutation } from "@/services/media/mutations";
import { APP_LOCALES, GeneralSettings } from "@/types/types";

const { Title, Paragraph } = Typography;

const DEFAULT_RESOURCES = [
  {
    id: "resource-1",
    title: "Camera Configuration Tool",
    description:
      "Configure your cameras, apply common settings to multiple cameras or adjust individual cameras to fit your site requirements.",
    url: "#",
  },
  {
    id: "resource-2",
    title: "Camera Accessories",
    description:
      "View technical documents such as installation guides and datasheets for camera accessories.",
    url: "#",
  },
  {
    id: "resource-3",
    title: "Discontinued Products",
    description:
      "View technical documents and firmware for cameras and sensors that have been discontinued.",
    url: "#",
  },
];

export default function GeneralSettingsPage() {
  const [locale, setLocale] = useState("vi");
  const [siteCode, setSiteCode] = useState("vivoo");

  const { data: settingData, isLoading } = useSiteSettingQuery("general", locale, siteCode);
  const upsertMutation = useUpsertSiteSettingMutation();
  const uploadMutation = useUploadMediaMutation();

  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);

  const handleUpload = async (file: File, fieldName: keyof GeneralSettings) => {
    try {
      setUploadingField(fieldName);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        handleChange(fieldName, res.data.secureUrl);
        message.success("Image uploaded successfully!");
      }
    } catch (err) {
      // errors already shown by react-query error handler toast
    } finally {
      setUploadingField(null);
    }
  };

  const handleResourceUpload = async (file: File, index: number) => {
    try {
      setUploadingField(`resource-${index}`);
      const res = await uploadMutation.mutateAsync(file);
      if (res?.data?.secureUrl) {
        setForm((prev) => {
          const next = prev.resources ? [...prev.resources] : [];
          if (next[index]) {
            next[index].url = res.data.secureUrl;
          }
          return { ...prev, resources: next };
        });
        message.success("Resource file uploaded successfully!");
      }
    } catch (err) {
      // handled
    } finally {
      setUploadingField(null);
    }
  };

  const [form, setForm] = useState<GeneralSettings>({
    siteTitle: "",
    siteDescription: "",
    logoUrl: "",
    logoDarkUrl: "",
    faviconUrl: "",
    supportEmail: "",
    supportPhone: "",
    supportAddress: "",
    businessHours: "",
    copyrightText: "",
    footerDescription: "",
    facebookUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
    faqs: [],
    resources: DEFAULT_RESOURCES,
    seoHomeTitle: "",
    seoHomeDescription: "",
    seoHomeKeywords: "",
    seoHomeRobots: "index, follow",
    seoSolutionsTitle: "",
    seoSolutionsDescription: "",
    seoSolutionsKeywords: "",
    seoSolutionsRobots: "index, follow",
    seoServicesTitle: "",
    seoServicesDescription: "",
    seoServicesKeywords: "",
    seoServicesRobots: "index, follow",
    seoContactTitle: "",
    seoContactDescription: "",
    seoContactKeywords: "",
    seoContactRobots: "index, follow",
  });

  // Sync loaded settings to form state
  useEffect(() => {
    if (settingData?.data?.value) {
      const val = settingData.data.value as Partial<GeneralSettings>;

      let resources = (val.resources || []).map((r, i) => ({
        id: r.id || `resource-${i + 1}`,
        title: r.title || DEFAULT_RESOURCES[i]?.title || "",
        description: r.description || DEFAULT_RESOURCES[i]?.description || "",
        url: r.url || DEFAULT_RESOURCES[i]?.url || "",
      }));
      while (resources.length < 3) {
        const i = resources.length;
        resources.push({ ...DEFAULT_RESOURCES[i] });
      }
      resources = resources.slice(0, 3);

      setForm({
        siteTitle: val.siteTitle || "",
        siteDescription: val.siteDescription || "",
        logoUrl: val.logoUrl || "",
        logoDarkUrl: val.logoDarkUrl || "",
        faviconUrl: val.faviconUrl || "",
        supportEmail: val.supportEmail || "",
        supportPhone: val.supportPhone || "",
        supportAddress: val.supportAddress || "",
        businessHours: val.businessHours || "",
        copyrightText: val.copyrightText || "",
        footerDescription: val.footerDescription || "",
        facebookUrl: val.facebookUrl || "",
        linkedinUrl: val.linkedinUrl || "",
        youtubeUrl: val.youtubeUrl || "",
        faqs: val.faqs || [],
        resources: resources,
        seoHomeTitle: val.seoHomeTitle || "",
        seoHomeDescription: val.seoHomeDescription || "",
        seoHomeKeywords: val.seoHomeKeywords || "",
        seoHomeRobots: val.seoHomeRobots || "index, follow",
        seoSolutionsTitle: val.seoSolutionsTitle || "",
        seoSolutionsDescription: val.seoSolutionsDescription || "",
        seoSolutionsKeywords: val.seoSolutionsKeywords || "",
        seoSolutionsRobots: val.seoSolutionsRobots || "index, follow",
        seoServicesTitle: val.seoServicesTitle || "",
        seoServicesDescription: val.seoServicesDescription || "",
        seoServicesKeywords: val.seoServicesKeywords || "",
        seoServicesRobots: val.seoServicesRobots || "index, follow",
        seoContactTitle: val.seoContactTitle || "",
        seoContactDescription: val.seoContactDescription || "",
        seoContactKeywords: val.seoContactKeywords || "",
        seoContactRobots: val.seoContactRobots || "index, follow",
      });
    }
  }, [settingData]);

  const handleChange = (fieldName: keyof GeneralSettings, val: string) => {
    setForm((s) => ({ ...s, [fieldName]: val }));
  };

  const openMediaPicker = (target: string) => {
    setMediaPickerTarget(target);
    setMediaPickerOpen(true);
  };

  const handleSelectMedia = (media: { secureUrl: string }) => {
    if (!mediaPickerTarget) return;

    if (mediaPickerTarget.startsWith("resource-")) {
      const index = Number(mediaPickerTarget.replace("resource-", ""));
      setForm((prev) => {
        const next = prev.resources ? [...prev.resources] : [];
        if (next[index]) {
          next[index].url = media.secureUrl;
        }
        return { ...prev, resources: next };
      });
    } else {
      handleChange(mediaPickerTarget as keyof GeneralSettings, media.secureUrl);
    }

    message.success("Media selected successfully!");
    setMediaPickerOpen(false);
    setMediaPickerTarget(null);
  };

  const isResourceMediaTarget = mediaPickerTarget?.startsWith("resource-");

  const handleSave = () => {
    upsertMutation.mutate({
      key: "general",
      value: form,
      locale,
      siteCode
    });
  };

  // Add/Remove FAQs
  const addFAQ = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [
        ...(prev.faqs || []),
        { id: String(Date.now()), question: "", answer: "" },
      ],
    }));
  };

  const removeFAQ = (index: number) => {
    setForm((prev) => {
      const next = prev.faqs ? [...prev.faqs] : [];
      next.splice(index, 1);
      return { ...prev, faqs: next };
    });
  };

  // Add/Remove Resources
  const addResource = () => {
    setForm((prev) => ({
      ...prev,
      resources: [
        ...(prev.resources || []),
        { id: String(Date.now()), title: "", url: "", type: "Link" },
      ],
    }));
  };

  const removeResource = (index: number) => {
    setForm((prev) => {
      const next = prev.resources ? [...prev.resources] : [];
      next.splice(index, 1);
      return { ...prev, resources: next };
    });
  };

  const renderPageSEOFields = (prefix: "seoHome" | "seoSolutions" | "seoServices" | "seoContact") => {
    const titleKey = `${prefix}Title` as keyof GeneralSettings;
    const descKey = `${prefix}Description` as keyof GeneralSettings;
    const keywordsKey = `${prefix}Keywords` as keyof GeneralSettings;
    const robotsKey = `${prefix}Robots` as keyof GeneralSettings;

    return (
      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            Page Meta Title
          </label>
          <Input
            value={form[titleKey] as string}
            onChange={(e) => handleChange(titleKey, e.target.value)}
            placeholder="e.g. Custom SEO Title for this page"
            className="rounded-lg h-[36px]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            Page Meta Description
          </label>
          <Input.TextArea
            value={form[descKey] as string}
            onChange={(e) => handleChange(descKey, e.target.value)}
            placeholder="Summarize this page's content for search engines..."
            rows={3}
            className="rounded-lg"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            Page Meta Keywords
          </label>
          <Input
            value={form[keywordsKey] as string}
            onChange={(e) => handleChange(keywordsKey, e.target.value)}
            placeholder="e.g. security, camera, solutions (comma separated)"
            className="rounded-lg h-[36px]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            Page Robots Instructions
          </label>
          <Select
            value={form[robotsKey] as string || "index, follow"}
            onChange={(val) => handleChange(robotsKey, val)}
            className="w-full h-[36px] [&_.ant-select-selector]:!h-[36px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-lg"
            options={[
              { label: "index, follow (Default - Index page & follow links)", value: "index, follow" },
              { label: "noindex, follow (Don't index page but follow links)", value: "noindex, follow" },
              { label: "index, nofollow (Index page but don't follow links)", value: "index, nofollow" },
              { label: "noindex, nofollow (Don't index page & don't follow links)", value: "noindex, nofollow" },
            ]}
          />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-2">
        <Spin size="large" />
        <span className="text-slate-400 text-sm font-medium">Loading general settings...</span>
      </div>
    );
  }

  const isSaving = upsertMutation.isPending;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title level={2} className="!mb-0 !font-bold tracking-tight text-slate-800">
            General Settings
          </Title>
          <Paragraph className="text-slate-500 text-sm !mb-0 mt-1">
            Configure site-wide metadata, brand logos, contact coordinates, social connections, and copyright strings.
          </Paragraph>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={siteCode}
            onChange={setSiteCode}
            options={[{ label: "Vivoo Main Site", value: "vivoo" }]}
            className="w-40 h-[40px] [&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-lg"
          />
          <Select
            value={locale}
            onChange={setLocale}
            options={APP_LOCALES}
            className="w-36 h-[40px] [&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-lg"
          />
          <Button
            type="primary"
            icon={<Save className="w-4 h-4 mr-1 inline-block" />}
            onClick={handleSave}
            loading={isSaving}
            size="large"
            className="shadow-sm font-semibold h-[40px] px-6 rounded-lg bg-blue-600 hover:bg-blue-700 border-none flex items-center"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Column: Metadata & Brand */}
        <Col xs={24} lg={12} className="!flex flex-col gap-4">
          {/* Search Engine Optimization (SEO) Settings */}
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Globe className="w-4.5 h-4.5 text-blue-500" />
                <span>Search Engine Optimization (SEO)</span>
              </div>
            }
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <Tabs
              defaultActiveKey="global"
              type="card"
              size="small"
              className="[&_.ant-tabs-nav]:mb-4"
              items={[
                {
                  key: "global",
                  label: "Global Defaults",
                  children: (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                          Site Title (Meta Title Fallback)
                        </label>
                        <Input
                          value={form.siteTitle}
                          onChange={(e) => handleChange("siteTitle", e.target.value)}
                          placeholder="e.g. VIVOO - Advanced Security Solutions"
                          className="rounded-lg h-[36px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                          Site Description (Meta Description Fallback)
                        </label>
                        <Input.TextArea
                          value={form.siteDescription}
                          onChange={(e) => handleChange("siteDescription", e.target.value)}
                          placeholder="Summarize what VIVOO does for visitors and search engines..."
                          rows={4}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  key: "home",
                  label: "Homepage",
                  children: renderPageSEOFields("seoHome"),
                },
                {
                  key: "solutions",
                  label: "Solutions",
                  children: renderPageSEOFields("seoSolutions"),
                },
                {
                  key: "services",
                  label: "Services",
                  children: renderPageSEOFields("seoServices"),
                },
                {
                  key: "contact",
                  label: "Contact",
                  children: renderPageSEOFields("seoContact"),
                },
              ]}
            />
          </Card>

          {/* Brand Assets Logo Card */}
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Globe className="w-4.5 h-4.5 text-blue-500" />
                <span>Brand Identity Logos</span>
              </div>
            }
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Logo URL (For Light Background Headers)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={form.logoUrl}
                    onChange={(e) => handleChange("logoUrl", e.target.value)}
                    placeholder="e.g. /svgs/logo.svg"
                    className="rounded-lg h-[36px]"
                  />
                  <Upload
                    beforeUpload={(file) => {
                      handleUpload(file, "logoUrl");
                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadCloud className="w-4 h-4 mr-1 inline-block" />}
                      loading={uploadingField === "logoUrl"}
                      className="h-[36px] rounded-lg border-slate-200 hover:border-blue-500 hover:text-blue-500 flex items-center"
                    >
                      Upload
                    </Button>
                  </Upload>
                  <Button
                    icon={<ImageIcon className="w-4 h-4" />}
                    onClick={() => openMediaPicker("logoUrl")}
                    className="h-[36px] rounded-lg border-slate-200 hover:border-blue-500 hover:text-blue-500 flex items-center"
                  >
                    Media
                  </Button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Absolute URL of logo image. Example: copy from Media Vault or upload from computer.
                </p>
                {form.logoUrl && (
                  <div className="mt-2.5 p-3 border border-dashed border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center max-w-[200px] h-[80px]">
                    <img src={form.logoUrl} alt="Logo Light Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Logo Dark Background URL (For Footer / Dark themes)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={form.logoDarkUrl}
                    onChange={(e) => handleChange("logoDarkUrl", e.target.value)}
                    placeholder="e.g. /svgs/logo-bg-black.svg"
                    className="rounded-lg h-[36px]"
                  />
                  <Upload
                    beforeUpload={(file) => {
                      handleUpload(file, "logoDarkUrl");
                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadCloud className="w-4 h-4 mr-1 inline-block" />}
                      loading={uploadingField === "logoDarkUrl"}
                      className="h-[36px] rounded-lg border-slate-200 hover:border-blue-500 hover:text-blue-500 flex items-center"
                    >
                      Upload
                    </Button>
                  </Upload>
                  <Button
                    icon={<ImageIcon className="w-4 h-4" />}
                    onClick={() => openMediaPicker("logoDarkUrl")}
                    className="h-[36px] rounded-lg border-slate-200 hover:border-blue-500 hover:text-blue-500 flex items-center"
                  >
                    Media
                  </Button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Absolute URL of logo for dark background. Example: copy from Media Vault or upload from computer.
                </p>
                {form.logoDarkUrl && (
                  <div className="mt-2.5 p-3 border border-dashed border-slate-800 rounded-lg bg-slate-900 flex items-center justify-center max-w-[200px] h-[80px]">
                    <img src={form.logoDarkUrl} alt="Logo Dark Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Favicon URL (.ico or .png)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={form.faviconUrl}
                    onChange={(e) => handleChange("faviconUrl", e.target.value)}
                    placeholder="e.g. /favicon.ico"
                    className="rounded-lg h-[36px]"
                  />
                  <Upload
                    beforeUpload={(file) => {
                      handleUpload(file, "faviconUrl");
                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadCloud className="w-4 h-4 mr-1 inline-block" />}
                      loading={uploadingField === "faviconUrl"}
                      className="h-[36px] rounded-lg border-slate-200 hover:border-blue-500 hover:text-blue-500 flex items-center"
                    >
                      Upload
                    </Button>
                  </Upload>
                  <Button
                    icon={<ImageIcon className="w-4 h-4" />}
                    onClick={() => openMediaPicker("faviconUrl")}
                    className="h-[36px] rounded-lg border-slate-200 hover:border-blue-500 hover:text-blue-500 flex items-center"
                  >
                    Media
                  </Button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Favicon image file URL. Usually 16x16 or 32x32 pixels.
                </p>
                {form.faviconUrl && (
                  <div className="mt-2.5 p-3 border border-dashed border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center max-w-[80px] h-[80px]">
                    <img src={form.faviconUrl} alt="Favicon Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Column: Contact Details & Socials */}
        <Col xs={24} lg={12} className="!flex flex-col gap-4">
          {/* Contacts info Card */}
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Mail className="w-4.5 h-4.5 text-blue-500" />
                <span>Contact Coordinates</span>
              </div>
            }
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Support / Contact Email
                </label>
                <Input
                  prefix={<Mail className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.supportEmail}
                  onChange={(e) => handleChange("supportEmail", e.target.value)}
                  placeholder="contact@gmail.com"
                  className="rounded-lg h-[36px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Support / Contact Phone Number
                </label>
                <Input
                  prefix={<Phone className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.supportPhone}
                  onChange={(e) => handleChange("supportPhone", e.target.value)}
                  placeholder="(+84) 123456789"
                  className="rounded-lg h-[36px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Support Address (Physical location)
                </label>
                <Input
                  prefix={<MapPin className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.supportAddress}
                  onChange={(e) => handleChange("supportAddress", e.target.value)}
                  placeholder="Tầng 3, Tòa Hpcons Building..."
                  className="rounded-lg h-[36px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Business Operating Hours
                </label>
                <Input
                  prefix={<Clock className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.businessHours}
                  onChange={(e) => handleChange("businessHours", e.target.value)}
                  placeholder="Mon - Sat: 08:00 - 5:30"
                  className="rounded-lg h-[36px]"
                />
              </div>
            </div>
          </Card>

          {/* Social connections & Copyright Card */}
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Copyright className="w-4.5 h-4.5 text-blue-500" />
                <span>Footer & Social Networks</span>
              </div>
            }
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Copyright Text (Footer)
                </label>
                <Input
                  prefix={<Copyright className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.copyrightText}
                  onChange={(e) => handleChange("copyrightText", e.target.value)}
                  placeholder="Avigilon Vietnam. All rights reserved."
                  className="rounded-lg h-[36px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Footer Description Text
                </label>
                <Input.TextArea
                  value={form.footerDescription}
                  onChange={(e) => handleChange("footerDescription", e.target.value)}
                  placeholder="End-to-end video security and access control solutions to help your team protect what matters most."
                  rows={3}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Facebook Page Link
                </label>
                <Input
                  prefix={<FaFacebook className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.facebookUrl}
                  onChange={(e) => handleChange("facebookUrl", e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="rounded-lg h-[36px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  LinkedIn Profile Link
                </label>
                <Input
                  prefix={<FaLinkedin className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.linkedinUrl}
                  onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="rounded-lg h-[36px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  YouTube Channel Link
                </label>
                <Input
                  prefix={<FaYoutube className="w-4 h-4 text-slate-400 mr-1" />}
                  value={form.youtubeUrl}
                  onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="rounded-lg h-[36px]"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Dynamic FAQs and Resources Row */}
      <Row gutter={[24, 24]} className="mt-4">
        {/* FAQ Management */}
        <Col xs={24} lg={12} className="!flex flex-col gap-4">
          <Card
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <HelpCircle className="w-4.5 h-4.5 text-blue-500" />
                  <span>Frequently Asked Questions (FAQs)</span>
                </div>
                <Button
                  type="dashed"
                  icon={<Plus className="w-3.5 h-3.5 mr-1" />}
                  onClick={addFAQ}
                  size="small"
                >
                  Add FAQ
                </Button>
              </div>
            }
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {(form.faqs || []).map((faq, index) => (
                <div key={faq.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 relative group space-y-3">
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Popconfirm title="Delete FAQ?" onConfirm={() => removeFAQ(index)}>
                      <Button type="text" danger icon={<Trash2 className="w-4 h-4" />} size="small" />
                    </Popconfirm>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Question</label>
                    <Input
                      value={faq.question}
                      onChange={(e) => {
                        const next = [...(form.faqs || [])];
                        next[index].question = e.target.value;
                        setForm({ ...form, faqs: next });
                      }}
                      placeholder="e.g. What is the warranty period?"
                      className="h-[36px] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Answer</label>
                    <Input.TextArea
                      value={faq.answer}
                      onChange={(e) => {
                        const next = [...(form.faqs || [])];
                        next[index].answer = e.target.value;
                        setForm({ ...form, faqs: next });
                      }}
                      placeholder="e.g. We offer a 3-year warranty on all camera equipment..."
                      rows={2}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
              {(!form.faqs || form.faqs.length === 0) && (
                <div className="text-center py-6 text-slate-400 text-sm">
                  No FAQs configured yet. Click Add FAQ to start.
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* Resources Management */}
        <Col xs={24} lg={12} className="!flex flex-col gap-4">
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <FolderOpen className="w-4.5 h-4.5 text-blue-500" />
                <span>Resource Cards (Exactly 3 cards)</span>
              </div>
            }
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {(form.resources || []).map((resource, index) => (
                <div key={resource.id || index} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3">
                  <span className="text-xs font-bold text-blue-600 block">
                    Card {index + 1}: {DEFAULT_RESOURCES[index]?.title}
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Title</label>
                    <Input
                      value={resource.title}
                      onChange={(e) => {
                        const next = [...(form.resources || [])];
                        next[index].title = e.target.value;
                        setForm({ ...form, resources: next });
                      }}
                      placeholder="Enter card title..."
                      className="h-[36px] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Description</label>
                    <Input.TextArea
                      value={resource.description || ""}
                      onChange={(e) => {
                        const next = [...(form.resources || [])];
                        next[index].description = e.target.value;
                        setForm({ ...form, resources: next });
                      }}
                      placeholder="Enter card description..."
                      rows={2.5}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase">Link URL</label>
                    <div className="flex gap-2">
                      <Input
                        value={resource.url}
                        onChange={(e) => {
                          const next = [...(form.resources || [])];
                          next[index].url = e.target.value;
                          setForm({ ...form, resources: next });
                        }}
                        placeholder="e.g. Enter URL or upload a file"
                        className="h-[36px] rounded-lg"
                      />
                      <Upload beforeUpload={(file) => { handleResourceUpload(file, index); return false; }} showUploadList={false}>
                        <Button icon={<UploadCloud className="w-4 h-4 mr-1" />} loading={uploadingField === `resource-${index}`} className="h-[36px] flex items-center">Upload</Button>
                      </Upload>
                      <Button
                        icon={<ImageIcon className="w-4 h-4" />}
                        onClick={() => openMediaPicker(`resource-${index}`)}
                        className="h-[36px] flex items-center"
                      >
                        Media
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <MediaPickerModal
        open={mediaPickerOpen}
        onCancel={() => {
          setMediaPickerOpen(false);
          setMediaPickerTarget(null);
        }}
        onSelect={handleSelectMedia}
        selectionMode="single"
        defaultTab={isResourceMediaTarget ? "all" : "image"}
        selectableTypes={isResourceMediaTarget ? ["all", "image", "video", "other"] : ["image"]}
        title={
          isResourceMediaTarget
            ? "Choose Resource File from Media"
            : "Choose Image from Media"
        }
      />
    </div>
  );
}

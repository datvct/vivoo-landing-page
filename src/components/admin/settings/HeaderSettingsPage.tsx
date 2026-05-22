"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Spin, Typography, Popconfirm, Select, } from "antd";
import {
  Save,
  Plus,
  Trash2,
  Navigation,
} from "lucide-react";
import { useSiteSettingQuery } from "@/services/site-settings/queries";
import { useUpsertSiteSettingMutation } from "@/services/site-settings/mutations";
import { APP_LOCALES, HeaderSettings, } from "@/types/types";

const { Title, Paragraph } = Typography;

export default function HeaderSettingsPage() {
  const [locale, setLocale] = useState("vi");
  const [siteCode, setSiteCode] = useState("vivoo");

  const { data: settingData, isLoading } = useSiteSettingQuery("header", locale, siteCode);
  const upsertMutation = useUpsertSiteSettingMutation();

  const [form, setForm] = useState<HeaderSettings>({
    menus: [],
  });

  // Sync loaded settings to form state
  useEffect(() => {
    if (settingData?.data?.value) {
      const val = settingData.data.value as Partial<HeaderSettings>;
      setForm({
        menus: val.menus || [],
      });
    }
  }, [settingData]);

  const handleSave = () => {
    upsertMutation.mutate({
      key: "header",
      value: form,
      locale,
      siteCode
    });
  };

  // Add/Remove Main Menu Items
  const addMenuItem = () => {
    setForm((prev) => ({
      ...prev,
      menus: [
        ...prev.menus,
        { label: "", link: "", submenu: [] },
      ],
    }));
  };

  const removeMenuItem = (index: number) => {
    setForm((prev) => {
      const next = [...prev.menus];
      next.splice(index, 1);
      return { ...prev, menus: next };
    });
  };

  // Add/Remove Submenu Items
  const addSubmenuItem = (menuIndex: number) => {
    setForm((prev) => {
      const next = [...prev.menus];
      next[menuIndex] = {
        ...next[menuIndex],
        submenu: [
          ...next[menuIndex].submenu,
          { title: "", link: "" },
        ],
      };
      return { ...prev, menus: next };
    });
  };

  const removeSubmenuItem = (menuIndex: number, subIndex: number) => {
    setForm((prev) => {
      const next = [...prev.menus];
      const nextSub = [...next[menuIndex].submenu];
      nextSub.splice(subIndex, 1);
      next[menuIndex] = {
        ...next[menuIndex],
        submenu: nextSub,
      };
      return { ...prev, menus: next };
    });
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-2">
        <Spin size="large" />
        <span className="text-slate-400 text-sm font-medium">Loading navigation settings...</span>
      </div>
    );
  }

  const isSaving = upsertMutation.isPending;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Save bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title level={2} className="mb-0! font-bold! tracking-tight text-slate-800">
            Header Menu Settings
          </Title>
          <Paragraph className="text-slate-500 text-sm mb-0! mt-1">
            Build and organize your main site navigation links, dropdown lists and routing paths.
          </Paragraph>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={siteCode}
            onChange={setSiteCode}
            options={[{ label: "Vivoo Main Site", value: "vivoo" }]}
            className="w-40 h-10 [&_.ant-select-selector]:h-10! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center! [&_.ant-select-selector]:rounded-lg!"
          />
          <Select
            value={locale}
            onChange={setLocale}
            options={APP_LOCALES}
            className="w-36 h-10 [&_.ant-select-selector]:h-10! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center! [&_.ant-select-selector]:rounded-lg!"
          />
          <Button
            type="primary"
            icon={<Save className="w-4 h-4 mr-1 inline-block" />}
            onClick={handleSave}
            loading={isSaving}
            size="large"
            className="shadow-sm font-semibold h-10 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 border-none flex items-center"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Card
        title={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Navigation className="w-4.5 h-4.5 text-blue-500" />
              <span>Main Menu Structure</span>
            </div>
            <Button
              type="dashed"
              icon={<Plus className="w-3.5 h-3.5 mr-1" />}
              onClick={addMenuItem}
              size="small"
            >
              Add Menu Group
            </Button>
          </div>
        }
        className="rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="space-y-6">
          {form.menus.map((menu, menuIndex) => (
            <div key={menuIndex} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 relative group space-y-4">
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Popconfirm title="Delete this whole menu group?" onConfirm={() => removeMenuItem(menuIndex)}>
                  <Button type="text" danger icon={<Trash2 className="w-4 h-4" />} size="small" />
                </Popconfirm>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Menu Label (e.g. Products)</label>
                  <Input
                    value={menu.label}
                    onChange={(e) => {
                      const next = [...form.menus];
                      next[menuIndex].label = e.target.value;
                      setForm({ ...form, menus: next });
                    }}
                    placeholder="Enter menu label"
                    className="h-9 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Direct Link (Optional)</label>
                  <Input
                    value={menu.link || ""}
                    onChange={(e) => {
                      const next = [...form.menus];
                      next[menuIndex].link = e.target.value || null;
                      setForm({ ...form, menus: next });
                    }}
                    placeholder="e.g. /solutions (leave empty if dropdown only)"
                    className="h-9 rounded-lg"
                  />
                </div>
              </div>

              {/* Submenu Area */}
              <div className="border border-dashed border-slate-200 bg-white rounded-xl p-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Dropdown Submenus</h4>
                  <Button
                    type="dashed"
                    icon={<Plus className="w-3 h-3 mr-1" />}
                    onClick={() => addSubmenuItem(menuIndex)}
                    size="small"
                  >
                    Add Submenu Item
                  </Button>
                </div>

                <div className="space-y-2">
                  {menu.submenu.map((sub, subIndex) => (
                    <div key={subIndex} className="flex gap-3 items-center">
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        <Input
                          value={sub.title}
                          onChange={(e) => {
                            const next = [...form.menus];
                            next[menuIndex].submenu[subIndex].title = e.target.value;
                            setForm({ ...form, menus: next });
                          }}
                          placeholder="Submenu Title (e.g. ViVoo Camera)"
                          className="h-8.5 rounded-lg text-sm"
                        />
                        <Input
                          value={sub.link}
                          onChange={(e) => {
                            const next = [...form.menus];
                            next[menuIndex].submenu[subIndex].link = e.target.value;
                            setForm({ ...form, menus: next });
                          }}
                          placeholder="Submenu Link (e.g. /product-category/camera)"
                          className="h-8.5 rounded-lg text-sm"
                        />
                      </div>
                      <Popconfirm title="Delete item?" onConfirm={() => removeSubmenuItem(menuIndex, subIndex)}>
                        <Button type="text" danger icon={<Trash2 className="w-3.5 h-3.5" />} size="small" />
                      </Popconfirm>
                    </div>
                  ))}

                  {menu.submenu.length === 0 && (
                    <div className="text-center py-4 text-slate-400 text-xs">
                      No submenu items configured. This will act as a simple navigation link.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {form.menus.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No navigation menu items configured. Click Add Menu Group to start.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Row, Col, Spin, Radio, Typography, Badge } from "antd";
import {
  Package,
  Cpu,
  Wrench,
  Mail,
  FileText,
  Image as ImageIcon,
  Settings,
  Navigation,
  ArrowRight,
  TrendingUp,
  Clock,
  Sliders,
} from "lucide-react";
import { useStatsQuery } from "@/services/stats/queries";
import { StatsPeriod } from "@/services/stats/api";

const { Title, Paragraph, Text } = Typography;

export default function AdminIndexPage() {
  const [period, setPeriod] = useState<StatsPeriod>("week");
  const { data: statsData, isLoading } = useStatsQuery(period);

  const counts = statsData?.data?.counts || {
    products: 0,
    services: 0,
    solutions: 0,
    contacts: 0,
  };

  const fromDate = statsData?.data?.from ? new Date(statsData.data.from).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }) : "";

  const toDate = statsData?.data?.to ? new Date(statsData.data.to).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }) : "";

  const kpis = [
    {
      title: "Products Created",
      count: counts.products,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgIcon: "bg-blue-50",
      accent: "from-blue-500 to-indigo-600",
      description: "Physical items & hardware catalog",
      link: "/admin/products",
    },
    {
      title: "Solutions Added",
      count: counts.solutions,
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      bgIcon: "bg-emerald-50",
      accent: "from-emerald-500 to-teal-600",
      description: "Industry use cases & architectures",
      link: "/admin/solutions",
    },
    {
      title: "Services Offered",
      count: counts.services,
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      bgIcon: "bg-amber-50",
      accent: "from-amber-500 to-orange-600",
      description: "Support, consulting & implementation",
      link: "/admin/services",
    },
    {
      title: "Contacts Received",
      count: counts.contacts,
      icon: <Mail className="w-6 h-6 text-rose-600" />,
      bgIcon: "bg-rose-50",
      accent: "from-rose-500 to-pink-600",
      description: "User inquiries & contact forms",
      link: "/admin/contacts",
    },
  ];

  const quickLinks = [
    {
      title: "Pages",
      desc: "Manage and update dynamic text pages on the frontend site.",
      href: "/admin/pages",
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
    },
    {
      title: "Media Vault",
      desc: "Upload images, files and catalog brochures to Cloudinary.",
      href: "/admin/media",
      icon: <ImageIcon className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "General Settings",
      desc: "Metadata, support contacts, operating hours, FAQs & Resources.",
      href: "/admin/settings/general",
      icon: <Settings className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Homepage CMS",
      desc: "Reorder banners, client logos, dynamic headers & stories.",
      href: "/admin/settings/home",
      icon: <Sliders className="w-5 h-5 text-cyan-500" />,
    },
    {
      title: "Navigation Menu",
      desc: "Build header menus, links and dropdown categories.",
      href: "/admin/settings/menu",
      icon: <Navigation className="w-5 h-5 text-blue-500" />,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge status="processing" className="mb-1" />
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider">VIVOO Management Console</Text>
          </div>
          <Title level={2} className="!mb-0 !font-bold tracking-tight text-slate-800">
            System Dashboard
          </Title>
          <Paragraph className="text-slate-500 text-sm !mb-0 mt-1">
            Real-time analytics and fast shortcut paths to control website contents.
          </Paragraph>
        </div>

        {/* Period selection controller */}
        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100 self-stretch sm:self-auto justify-between">
          <div className="flex items-center gap-1.5 px-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold">Period:</span>
          </div>
          <Radio.Group
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            optionType="button"
            buttonStyle="solid"

            className="[&_.ant-radio-button-wrapper]:h-[30px] [&_.ant-radio-button-wrapper]:flex [&_.ant-radio-button-wrapper]:items-center  [&_.ant-radio-button-wrapper]:border-none [&_.ant-radio-button-wrapper-checked]:!bg-blue-600 [&_.ant-radio-button-wrapper-checked]:!text-white [&_.ant-radio-button-wrapper]:text-xs [&_.ant-radio-button-wrapper]:font-semibold"
          >
            <Radio.Button value="week">Week</Radio.Button>
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="year">Year</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Date interval alert bar */}
      {fromDate && toDate && (
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2.5 flex items-center gap-2 text-blue-700 text-xs font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>
            Showing statistics for additions from <span className="font-bold">{fromDate}</span> to <span className="font-bold">{toDate}</span> (Now)
          </span>
        </div>
      )}

      {/* KPI Stats Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-100">
          <Spin size="large" />
          <span className="text-slate-400 text-sm font-medium">Loading statistics...</span>
        </div>
      ) : (
        <Row gutter={[20, 20]}>
          {kpis.map((kpi, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <Link href={kpi.link}>
                <Card
                  hoverable
                  className="rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md"
                  bodyStyle={{ padding: "24px" }}
                >
                  {/* Decorative background gradient glow on hover */}
                  <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${kpi.accent}`} />

                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{kpi.title}</span>
                      <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{kpi.count}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bgIcon} transition-transform group-hover:scale-110 duration-300`}>
                      {kpi.icon}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-slate-400 group-hover:text-blue-600 transition-colors">
                    <span className="text-[11px] font-medium">{kpi.description}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}

      {/* Quick shortcuts sections */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-700">Quick Operations</h3>
          <div className="h-[1px] bg-slate-100 flex-1" />
        </div>

        <Row gutter={[20, 20]}>
          {quickLinks.map((item, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Link href={item.href}>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200 group flex items-start gap-4 h-full cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

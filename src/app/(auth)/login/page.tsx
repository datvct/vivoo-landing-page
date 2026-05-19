"use client";

import Image from "next/image";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Typography, ConfigProvider } from "antd";
import { Mail, Lock } from "lucide-react";
import { useLoginMutation } from "@/services/auth/mutations";

const { Title, Text } = Typography;

export default function LoginPage() {
  const loginMutation = useLoginMutation();

  const onFinish = (values: any) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          borderRadius: 12,
          fontFamily: 'inherit',
          colorBgContainer: '#ffffff',
          colorBorder: '#e2e8f0',
        },
        components: {
          Button: {
            controlHeight: 48,
            primaryShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
          },
          Input: {
            controlHeight: 48,
            activeShadow: '0 0 0 2px rgba(0, 0, 0, 0.05)',
            hoverBorderColor: '#cbd5e1',
            activeBorderColor: '#000000',
          },
          Checkbox: {
            colorPrimary: '#000000',
            colorPrimaryHover: '#333333',
          }
        },
      }}
    >
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100 blur-[120px] opacity-70 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-100 blur-[120px] opacity-70 mix-blend-multiply pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-cyan-50 blur-[100px] opacity-60 mix-blend-multiply pointer-events-none" />
        
        <div className="w-full max-w-md rounded-[28px] bg-white/70 backdrop-blur-2xl p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white/60 relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <Image src="/svgs/logo.svg" alt="VIVOO Logo" width={160} height={80} priority />
            </div>
            
            <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>
              Welcome Back
            </Title>
            <Text style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>
              Login to continue to your account
            </Text>
          </div>

          <Form
            name="login_form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
              style={{ marginBottom: '20px' }}
            >
              <Input 
                prefix={<Mail size={18} className="text-slate-400 mr-2" />} 
                placeholder="Email address" 
                className="text-[15px] bg-white/80"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              style={{ marginBottom: '16px' }}
            >
              <Input.Password
                prefix={<Lock size={18} className="text-slate-400 mr-2" />}
                placeholder="Password"
                className="text-[15px] bg-white/80"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-8">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-slate-600 text-[14px]">Remember me</Checkbox>
              </Form.Item>
              
              <Link
                href="/forgot-password"
                className="text-[14px] font-medium text-black hover:text-slate-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item style={{ marginBottom: '24px' }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loginMutation.isPending}
                className="w-full h-12 bg-black hover:!bg-slate-800 text-white font-semibold text-[16px] border-0 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center text-[15px] text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-black hover:text-slate-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

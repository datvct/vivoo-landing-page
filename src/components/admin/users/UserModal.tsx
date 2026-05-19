import React from "react";
import { Modal, Form, Spin } from "antd";
import { useUserQuery } from "@/services/users/queries";
import AdminFormInput from "../common/AdminFormInput";
import AdminFormPassword from "../common/AdminFormPassword";
import AdminFormSelect from "../common/AdminFormSelect";
import AdminFormSwitch from "../common/AdminFormSwitch";
import { UserFormValues } from "@/types/types";

type UserModalProps = {
  open: boolean;
  userId?: string;
  confirmLoading?: boolean;
  onCancel: () => void;
  onSave: (values: UserFormValues) => void;
};

export default function UserModal({
  open,
  userId,
  confirmLoading = false,
  onCancel,
  onSave,
}: UserModalProps) {
  const [form] = Form.useForm<UserFormValues>();
  const isEditMode = Boolean(userId);

  // Fetch fresh user profile if in edit mode
  const { data: userData, isLoading: isFetching } = useUserQuery(
    userId || "",
    open && isEditMode
  );

  React.useEffect(() => {
    if (open) {
      if (isEditMode) {
        if (userData?.data) {
          form.setFieldsValue({
            email: userData.data.email,
            displayName: userData.data.displayName || "",
            role: userData.data.role,
            isActive: userData.data.isActive,
            password: "",
          });
        }
      } else {
        form.setFieldsValue({
          email: "",
          displayName: "",
          role: "editor",
          isActive: true,
          password: "",
        });
      }
    }
  }, [open, isEditMode, userData, form]);

  return (
    <Modal
      title={isEditMode ? "Edit User" : "Create User"}
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => onSave(values))
          .catch(() => undefined);
      }}
      confirmLoading={confirmLoading || isFetching}
    >
      <Spin spinning={isFetching}>
        <Form form={form} layout="vertical" preserve={false}>
          <AdminFormInput
            name="email"
            label="Email"
            required
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          />

          <AdminFormInput
            name="displayName"
            label="Display name"
            rules={[
              {
                max: 120,
                message: "Display name cannot exceed 120 characters!",
              },
            ]}
          />

          <AdminFormPassword
            name="password"
            label="Password"
            required={!isEditMode}
            rules={[
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
            placeholder={
              isEditMode
                ? "Leave blank to keep current password"
                : "Enter your password"
            }
          />

          <AdminFormSelect
            name="role"
            label="Role"
            required
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ]}
          />

          <AdminFormSwitch name="isActive" label="Active" />
        </Form>
      </Spin>
    </Modal>
  );
}

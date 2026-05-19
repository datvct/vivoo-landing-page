import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { Contact, ContactFilters, ContactListResponseData, CreateContactPayload, ContactStatus } from "@/types/types";

export const contactsApi = {
  getContacts: async (
    filters: ContactFilters
  ): Promise<ApiResponse<ContactListResponseData>> => {
    const response = await api.get("/contacts", { params: filters });
    return response.data;
  },

  getContactById: async (id: string): Promise<ApiResponse<Contact>> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  createContact: async (
    payload: CreateContactPayload
  ): Promise<ApiResponse<Contact>> => {
    const response = await api.post("/contacts", payload);
    return response.data;
  },

  updateContactStatus: async (
    id: string,
    status: ContactStatus
  ): Promise<ApiResponse<Contact>> => {
    const response = await api.patch(`/contacts/${id}/status`, { status });
    return response.data;
  },

  deleteContact: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

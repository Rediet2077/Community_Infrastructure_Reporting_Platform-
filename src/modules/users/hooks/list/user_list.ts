import { executeApiRequest } from "@/modules/shared/services/api_client";
import {
  UserListResponseSchema,
  UserListResponse,
  UserRecord,
} from "../../types/user_types";

export const USER_LIST_QUERY_KEY = ["users", "list"] as const;

export const INITIAL_MOCK_USERS: UserRecord[] = [
  {
    id: "usr-001",
    first_name: "Dawit",
    last_name: "Tadesse",
    email: "dawit.tadesse@cirp.gov.et",
    role: "SYSTEM_ADMIN",
    status: "ACTIVE",
    department: { id: "dept-central", name: "City Municipal Executive", code: "CENT" },
  },
  {
    id: "usr-002",
    first_name: "Almaz",
    last_name: "Bekele",
    email: "almaz.bekele@cirp.gov.et",
    role: "DEPARTMENT_ADMIN",
    status: "ACTIVE",
    department: { id: "dept-elec", name: "Electricity Department", code: "ELEC" },
  },
  {
    id: "usr-003",
    first_name: "Berhanu",
    last_name: "Wolde",
    email: "berhanu.wolde@cirp.gov.et",
    role: "DEPARTMENT_ADMIN",
    status: "ACTIVE",
    department: { id: "dept-roads", name: "Roads & Transport Department", code: "ROAD" },
  },
  {
    id: "usr-004",
    first_name: "Helen",
    last_name: "Mengistu",
    email: "helen.m@cirp.gov.et",
    role: "DEPARTMENT_ADMIN",
    status: "ACTIVE",
    department: { id: "dept-water", name: "Water & Sanitation Department", code: "WATR" },
  },
  {
    id: "usr-005",
    first_name: "Yonas",
    last_name: "Girma",
    email: "yonas.girma@cirp.gov.et",
    role: "DEPARTMENT_ADMIN",
    status: "ACTIVE",
    department: { id: "dept-drain", name: "Drainage & Flood Management", code: "DRN" },
  },
  {
    id: "usr-006",
    first_name: "Aster",
    last_name: "Desta",
    email: "aster.desta@cirp.gov.et",
    role: "DEPARTMENT_ADMIN",
    status: "ACTIVE",
    department: { id: "dept-roads", name: "Roads & Transport Department", code: "ROAD" },
  },
];

export async function fetchUserList(departmentId?: string): Promise<UserListResponse> {
  return executeApiRequest({
    endpoint: "/users/",
    method: "GET",
    query: departmentId ? { department_id: departmentId } : undefined,
    outputSchema: UserListResponseSchema,
    mockFallback: () => {
      if (!departmentId || departmentId === "all") {
        return INITIAL_MOCK_USERS;
      }
      return INITIAL_MOCK_USERS.filter((u) => u.department?.id === departmentId);
    },
  });
}

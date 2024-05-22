import {Role} from "../../auth/roles/roles.enum";
import {GroupStatus} from "../types";

export class FilterGroupDto {
  userId: string
  userRole: Role
  status: GroupStatus
}
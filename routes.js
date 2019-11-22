import React from "react";
import Home from "./containers/home";

const EmployeeList = React.lazy(() => import("./components/employee/employeelist"));
const EmployeeAdd = React.lazy(() => import("./components/employee/employeeadd"));
const EmployeeInfo = React.lazy(() => import("./components/employee/employeeinfo"));
const ProjectList = React.lazy(() => import("./components/project/projectlist"));
const ProjectAdd = React.lazy(() => import("./components/project/projectadd"));
const ProjectInfo = React.lazy(() => import("./components/project/projectinfo"));
const AllocationList = React.lazy(() => import("./components/allocation/allocationlist"));
const AllocationAdd = React.lazy(() => import("./components/allocation/allocationadd"));
const AllocationInfo = React.lazy(() => import("./components/allocation/allocationinfo"));
const RolesList = React.lazy(() => import("./components/roles/roleslist"));
const RolesAdd = React.lazy(() => import("./components/roles/rolesadd"));
const RolesInfo = React.lazy(() => import("./components/roles/rolesinfo"));
const UsersList = React.lazy(() => import("./components/users/userslist"));
const UsersAdd = React.lazy(() => import("./components/users/usersadd"));
const UsersInfo = React.lazy(() => import("./components/users/usersinfo"));
const CustomerInputList = React.lazy(() => import("./components/customerinput/customerinputlist"));
const CustomerInputAdd = React.lazy(() => import("./components/customerinput/customerinputadd"));
const CustomerInputInfo = React.lazy(() => import("./components/customerinput/customerinputinfo"));
const DeliverableList = React.lazy(() => import("./components/deliverable/deliverablelist"));
const DeliverableAdd = React.lazy(() => import("./components/deliverable/deliverableadd"));
const DeliverableInfo = React.lazy(() => import("./components/deliverable/deliverableinfo"));
const AssumptionList = React.lazy(() => import("./components/assumption/assumptionlist"));
const AssumptionAdd = React.lazy(() => import("./components/assumption/assumptionadd"));
const AssumptionInfo = React.lazy(() => import("./components/assumption/assumptioninfo"));
const RiskList = React.lazy(() => import("./components/risk/risklist"));
const RiskAdd = React.lazy(() => import("./components/risk/riskadd"));
const RiskInfo = React.lazy(() => import("./components/risk/riskinfo"));
const IssueList = React.lazy(() => import("./components/issue/issuelist"));
const IssueAdd = React.lazy(() => import("./components/issue/issueadd"));
const IssueInfo = React.lazy(() => import("./components/issue/issueinfo"));
const DiscussionList = React.lazy(() => import("./components/discussion/discussionlist"));
const DiscussionAdd = React.lazy(() => import("./components/discussion/discussionadd"));
const DiscussionInfo = React.lazy(() => import("./components/discussion/discussioninfo"));
const TotalManhourList = React.lazy(() => import("./components/totalmanhour/totalmanhourlist"));
const TotalManhourAdd = React.lazy(() => import("./components/totalmanhour/totalmanhouradd"));
const TotalManhourInfo = React.lazy(() => import("./components/totalmanhour/totalmanhourinfo"));
const ManhourList = React.lazy(() => import("./components/manhour/manhourlist"));
const ManhourAdd = React.lazy(() => import("./components/manhour/manhouradd"));
const ManhourInfo = React.lazy(() => import("./components/manhour/manhourinfo"));
const EstimationMilestoneList = React.lazy(() => import("./components/estimationmilestone/estimationmilestonelist"));
const EstimationMilestoneAdd = React.lazy(() => import("./components/estimationmilestone/estimationmilestoneadd"));
const EstimationMilestoneInfo = React.lazy(() => import("./components/estimationmilestone/estimationmilestoneinfo"));
const ResourceList = React.lazy(() => import("./components/resource/resourcelist"));
const ResourceAdd = React.lazy(() => import("./components/resource/resourceadd"));
const ResourceInfo = React.lazy(() => import("./components/resource/resourceinfo"));
const ResourceAllocationList = React.lazy(() => import("./components/resourceallocation/resourceallocationlist"));
const ResourceAllocationAdd = React.lazy(() => import("./components/resourceallocation/resourceallocationadd"));
const ResourceAllocationInfo = React.lazy(() => import("./components/resourceallocation/resourceallocationinfo"));
const OperationList = React.lazy(() => import("./components/operation/operationlist"));
const OperationAdd = React.lazy(() => import("./components/operation/operationadd"));
const OperationInfo = React.lazy(() => import("./components/operation/operationinfo"));
const ProjectPlanList = React.lazy(() => import("./components/projectplan/projectplanlist"));
const ProjectPlanAdd = React.lazy(() => import("./components/projectplan/projectplanadd"));
const ProjectPlanInfo = React.lazy(() => import("./components/projectplan/projectplaninfo"));
const ScheduleList = React.lazy(() => import("./components/schedule/schedulelist"));
const ScheduleAdd = React.lazy(() => import("./components/schedule/scheduleadd"));
const ScheduleInfo = React.lazy(() => import("./components/schedule/scheduleinfo"));

const HistoryList = React.lazy(() => import("./components/history/historylist"));
const HistoryInfo = React.lazy(() => import("./components/history/historyinfo"));
const PageNotFound = React.lazy(() => import("./components/common/pagenotfound"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/dashboard", exact: true, name: "Dashboard", component: EmployeeList },
  { path: "/employee/add", name: "Add Employee", component: EmployeeAdd },
  { path: "/employee/list", exact: true, name: "View Employee List", component: EmployeeList },
  { path: "/employee/info/:id", name: "View Employee Details", component: EmployeeInfo },
  { path: "/project/add", name: "Add Project", component: ProjectAdd },
  { path: "/project/list", exact: true, name: "View Project List", component: ProjectList },
  { path: "/project/info/:id", name: "View Project Details", component: ProjectInfo },
  { path: "/allocation/add", name: "Add Allocation", component: AllocationAdd },
  { path: "/allocation/list", exact: true, name: "View Allocation List", component: AllocationList },
  { path: "/allocation/info/:id", name: "View Allocation Details", component: AllocationInfo },
  { path: "/roles/add", name: "Add Roles", component: RolesAdd },
  { path: "/roles/list", exact: true, name: "View Roles List", component: RolesList },
  { path: "/roles/info/:id", name: "View Roles Details", component: RolesInfo },
  { path: "/users/add", name: "Add Users", component: UsersAdd },
  { path: "/users/list", exact: true, name: "View Users List", component: UsersList },
  { path: "/users/info/:id", name: "View Users Details", component: UsersInfo },
  { path: "/customerinput/add/:id", name: "Add Customer Input", component: CustomerInputAdd },
  { path: "/customerinput/list", exact: true, name: "View Customer Input List", component: CustomerInputList },
  { path: "/customerinput/info/:id", name: "View Customer Input Details", component: CustomerInputInfo },
  { path: "/deliverable/add/:id", name: "Add Deliverable", component: DeliverableAdd },
  { path: "/deliverable/list", exact: true, name: "View Deliverable List", component: DeliverableList },
  { path: "/deliverable/info/:id", name: "View Deliverable Details", component: DeliverableInfo },
  { path: "/assumption/add/:id", name: "Add Assumption", component: AssumptionAdd },
  { path: "/assumption/list", exact: true, name: "View Assumption List", component: AssumptionList },
  { path: "/assumption/info/:id", name: "View Assumption Details", component: AssumptionInfo },
  { path: "/risk/add/:id", name: "Add Risk", component: RiskAdd },
  { path: "/risk/list", exact: true, name: "View Risk List", component: RiskList },
  { path: "/risk/info/:id", name: "View Risk Details", component: RiskInfo },
  { path: "/issue/add/:id", name: "Add Issue", component: IssueAdd },
  { path: "/issue/list", exact: true, name: "View Issue List", component: IssueList },
  { path: "/issue/info/:id", name: "View Issue Details", component: IssueInfo },
  { path: "/discussion/add/:id", name: "Add Discussion", component: DiscussionAdd },
  { path: "/discussion/list", exact: true, name: "View Discussion List", component: DiscussionList },
  { path: "/discussion/info/:id", name: "View Discussion Details", component: DiscussionInfo },
  { path: "/totalmanhour/add/:id", name: "Add Total Manhour", component: TotalManhourAdd },
  { path: "/totalmanhour/list", exact: true, name: "View Total Manhour List", component: TotalManhourList },
  { path: "/totalmanhour/info/:id", name: "View Total Manhour Details", component: TotalManhourInfo },
  { path: "/manhour/add/:id", name: "Add Manhour", component: ManhourAdd },
  { path: "/manhour/list", exact: true, name: "View Manhour List", component: ManhourList },
  { path: "/manhour/info/:id", name: "View Manhour Details", component: ManhourInfo },
  { path: "/estimationmilestone/add/:id", name: "Add Estimation Milestone", component: EstimationMilestoneAdd },
  { path: "/estimationmilestone/list", exact: true, name: "View Estimation Milestone List", component: EstimationMilestoneList },
  { path: "/estimationmilestone/info/:id", name: "View Estimation Milestone Details", component: EstimationMilestoneInfo },
  { path: "/resource/add/:id", name: "Add Resource", component: ResourceAdd },
  { path: "/resource/list", exact: true, name: "View Resource List", component: ResourceList },
  { path: "/resource/info/:id", name: "View Resource Details", component: ResourceInfo },
  { path: "/resourceallocation/add/:id", name: "Add Resource Allocation", component: ResourceAllocationAdd },
  { path: "/resourceallocation/list", exact: true, name: "View Resource Allocation List", component: ResourceAllocationList },
  { path: "/resourceallocation/info/:id", name: "View Resource Allocation Details", component: ResourceAllocationInfo },
  { path: "/operation/add/:id", name: "Add Operation", component: OperationAdd },
  { path: "/operation/list", exact: true, name: "View Operation List", component: OperationList },
  { path: "/operation/info/:id", name: "View Operation Details", component: OperationInfo },
  { path: "/projectplan/add/:id", name: "Add Project Plan", component: ProjectPlanAdd },
  { path: "/projectplan/list", exact: true, name: "View Project Plan List", component: ProjectPlanList },
  { path: "/projectplan/info/:id", name: "View Project Plan Details", component: ProjectPlanInfo },
  { path: "/schedule/add/:id", name: "Add Schedule", component: ScheduleAdd },
  { path: "/schedule/list", exact: true, name: "View Schedule List", component: ScheduleList },
  { path: "/schedule/info/:id", name: "View Schedule Details", component: ScheduleInfo },

  { path: "/history/list", exact: true, name: "View History List", component: HistoryList },
  { path: "/history/list/info/:id", name: "View History Details", component: HistoryInfo },
  { path: "/pagenotfound", name: "Page Not Found", component: PageNotFound },

];
export default routes;

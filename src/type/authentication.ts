export type AuthenticatedUser = {
  id: string;
  entitledStudentId: string[];
  // userRole: 'Admin' | 'Teacher' | 'Student' | 'Parent' | 'Alumni';
  role: 'Admin' | 'Teacher' | 'Student' | 'Parent' | 'Alumni';
  withApprovalRight: boolean;
};

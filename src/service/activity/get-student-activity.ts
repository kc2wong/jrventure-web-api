import { findAchievementRepo } from '@repo/achievement-repo';
import { getStudentByIdRepo } from '@repo/student-repo';
import {
  AchievementSubmissionRole,
  OrderByDirection,
} from '@processapi/types.gen';
import { findActivityRepo } from '@repo/activity-repo';
import { findAchievementApprovalRepo } from '@repo/achievement-approval-repo';
import { AuthenticatedUser } from '@type/authentication';
import { GetActivityByStudentId200ResponseDto } from '@api/activity/activity-schema';
import { entity2Dto } from '@service/activity/mapper/activity-mapper';

export const getActivityByStudentIdService = async (
  jwt: string,
  authenticatedUser: AuthenticatedUser,
  studentId: string
): Promise<GetActivityByStudentId200ResponseDto> => {
  const student = await getStudentByIdRepo(jwt, studentId);
  if (student === undefined) {
    console.log(`Student with ID ${studentId} not found`);
    return [];
  }

  const gradeNumber = parseInt(student.classId.replace(/[A-Za-z]/g, ''), 10);
  const role = authenticatedUser.role;

  if (role !== 'Teacher' && role !== 'Student' && role !== 'Parent') {
    console.log(`Should have no activity for submission by role ${role}`);
    return [];
  }

  const { data } = await findActivityRepo(jwt, {
    participantGrade: [gradeNumber],
    role:
      role === 'Teacher'
        ? ['Both', 'Teacher']
        : role === 'Parent' || role === 'Student'
        ? ['Both', 'Student']
        : [],
    offset: 0,
    limit: 50,
    orderByField: 'StartDate',
    orderByDirection: 'Ascending',
  });

  const minCreatedAt = data.reduce(
    (min, item) => Math.min(min, new Date(item.createdAt).getTime()),
    Infinity
  );

  const queryParam = {
    studentId,
    createDateFrom: new Date(minCreatedAt),
    role: (role === 'Teacher'
      ? 'Teacher'
      : 'Student') as AchievementSubmissionRole,
    offset: 0,
    limit: data.length,
    orderByDirection: 'Ascending' as OrderByDirection,
  };

  const achievementPromise = findAchievementRepo(jwt, queryParam);
  const approvalPromise = findAchievementApprovalRepo(jwt, queryParam);

  const [studentAchievementRes, studentAchievementApprovalRes] =
    await Promise.all([achievementPromise, approvalPromise]);

  const achievementStatusMap = new Map(
    studentAchievementRes.data.map((ac) => [ac.activityId, ac.status])
  );

  const achievementApprovalStatusMap = new Map(
    studentAchievementApprovalRes.data.map((ac) => [ac.activityId, ac.status])
  );

  return data.map((act) => ({
    activity: entity2Dto(act),
    achievementStatus:
      achievementStatusMap.get(act.id) ??
      achievementApprovalStatusMap.get(act.id),
  }));
};

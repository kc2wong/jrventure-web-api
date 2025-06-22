import { entity2Dto } from '@service/achievement/mapper/achievement-mapper';
import { findActivityRepo } from '@repo/activity-repo';
import {
  FindPendingAchievement200ResponseDto,
  FindPendingAchievementQueryDto,
} from '@api/achievement/achievement-schema';
import {
  AchievementApproval,
  AchievementApprovalStatus,
  AchievementSubmissionRole,
  Activity,
  OrderByDirection,
  Student,
} from '@processapi/types.gen';
import { findAchievementApprovalRepo } from '@repo/achievement-approval-repo';
import { findStudentRepo } from '@repo/student-repo';

const findActivities = async (
  jwt: string,
  achievement: AchievementApproval[]
): Promise<Map<string, Activity>> => {
  const uniqueActivityIds = [
    ...new Set(achievement.map((act) => act.activityId)),
  ];

  const activities = await findActivityRepo(jwt, {
    id: uniqueActivityIds,
    offset: 0,
    limit: uniqueActivityIds.length,
    orderByField: 'Name',
    orderByDirection: 'Ascending',
  });
  const activityMap = new Map(activities.data.map((act) => [act.id, act]));
  return activityMap;
};

const findStudents = async (
  jwt: string,
  achievement: AchievementApproval[]
): Promise<Map<string, Student>> => {
  const uniqueStudentIds = [
    ...new Set(achievement.map((act) => act.studentId)),
  ];

  const students = await findStudentRepo(jwt, uniqueStudentIds);
  const studentMap = new Map(students.map((student) => [student.id, student]));
  return studentMap;
};

export const findPendingAchievementService = async (
  jwt: string,
  query: FindPendingAchievementQueryDto
): Promise<FindPendingAchievement200ResponseDto> => {
  const inOffset = query.offset;
  const inLimit = query.limit;
  const submissionDateOffset = query.submissionDateFrom;
  const role = query.role;

  const submissionDateOffsetMap = {
    lastSevenDays: -7,
    lastFourteenDays: -14,
    lastThirtyDays: -30,
  };
  submissionDateOffsetMap[submissionDateOffset!];
  const now = new Date();
  const submissionDateFrom = query.submissionDateFrom
    ? now.setTime(
        now.getTime() +
          3600 * 24 * submissionDateOffsetMap[query.submissionDateFrom]
      )
    : undefined;

  const queryParam = {
    offset: inOffset,
    limit: inLimit,
    role: role === 'Both' ? undefined : (role as AchievementSubmissionRole),
    status: 'Pending' as AchievementApprovalStatus,
    submissionDateFrom,
    orderByDirection: 'Ascending' as OrderByDirection,
  };

  const { offset, limit, total, data } = await findAchievementApprovalRepo(
    jwt,
    queryParam,
  );

  const activityMap = await findActivities(jwt, data);
  const studentMap = await findStudents(jwt, data);

  return {
    offset: offset ?? inOffset,
    limit: limit ?? inLimit,
    total,
    data: data.map((ach) =>
      entity2Dto(
        ach,
        activityMap.get(ach.activityId)!,
        studentMap.get(ach.studentId)!
      )
    ),
  };
};

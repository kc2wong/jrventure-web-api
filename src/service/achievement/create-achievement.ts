import {
  CreateAchievement201ResponseDto,
  CreateAchievementRequestDto,
} from '@api/achievement/achievement-schema';
import { createAchievementRepo } from '@repo/achievement-repo';
import {
  creationDto2Entity,
  entity2Dto,
} from '@service/achievement/mapper/achievement-mapper';
import { creationDto2Entity as attachmentCreationDto2Entity } from '@service/achievement/mapper/achievement-approval-attachment-mapper';
import { getStudentByIdRepo } from '@repo/student-repo';
import { Activity, Student } from '@processapi/types.gen';
import { getActivityByIdRepo } from '@repo/activity-repo';

export const createAchievementService = async (
  jwt: string,
  request: CreateAchievementRequestDto
): Promise<CreateAchievement201ResponseDto> => {
  const { attachment, ...rest } = request;
  const payload = creationDto2Entity(rest);
  const newAchievement = await createAchievementRepo(
    jwt,
    payload,
    attachment.map((atch) => attachmentCreationDto2Entity(atch))
  );

  const student = (await getStudentByIdRepo(jwt, payload.studentId))!;
  const activity = (await getActivityByIdRepo(jwt, payload.activityId))!;

  const achievementDto = entity2Dto(newAchievement, activity, student);
  // Ensure the attachment property is included in the response
  return {
    ...achievementDto,
  };
};

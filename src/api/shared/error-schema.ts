import { components } from '@openapi/schema';

type ErrorDto = components['schemas']['Error'];

class NotFoundErrorDto implements ErrorDto {
  code: string;
  message: string;
  parameter?: string[];
  httpStatus: number = 404;

  constructor(message: string, parameter?: string[]) {
    this.code = 'NOT_FOUND';
    this.message = message;
    if (parameter) this.parameter = parameter;
  }
}

export class StudentNotFoundErrorDto extends NotFoundErrorDto {
  parameter?: string[];

  constructor(studentId: string) {
    super(`Student with Id ${studentId} is not found`, ['Student', studentId]);
  }
}

export class UserNotFoundErrorDto extends NotFoundErrorDto {
  parameter?: string[];

  constructor(userId: string) {
    super(`User with Id ${userId} is not found`, ['User', userId]);
  }
}

export class AchievementNotFoundErrorDto extends NotFoundErrorDto {
  parameter?: string[];

  constructor(achievementId: string) {
    super(`Achievement with Id ${achievementId} is not found`, [
      'Achievement',
      achievementId,
    ]);
  }
}

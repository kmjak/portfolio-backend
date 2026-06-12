export class ProjectTitleVo {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): ProjectTitleVo {
    if (!value || value.trim().length === 0) {
      throw new Error("Project title cannot be empty");
    }

    if (value.length > 255) {
      throw new Error("Project title cannot exceed 255 characters");
    }

    return new ProjectTitleVo(value);
  }
}

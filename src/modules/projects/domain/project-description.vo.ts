export class ProjectDescriptionVo {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): ProjectDescriptionVo {
    if (!value || value.trim().length === 0) {
      throw new Error("Project description cannot be empty");
    }

    return new ProjectDescriptionVo(value);
  }
}

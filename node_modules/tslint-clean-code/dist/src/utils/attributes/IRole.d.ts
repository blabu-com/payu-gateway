export interface IRole {
    requiredProps: string[];
    additionalSupportedProps: string[];
    isAbstract: boolean;
}
export interface IRoleSchema {
    roles: IRole[];
    globalSupportedProps: string[];
}

import * as Lint from 'tslint';
export interface ExtendedMetadata extends Lint.IRuleMetadata {
    issueClass: IssueClass;
    issueType: IssueType;
    severity: Severity;
    level: Level;
    group: Group;
    recommendation?: string;
    commonWeaknessEnumeration?: string;
}
export declare type IssueClass = 'SDL' | 'Non-SDL' | 'Ignored';
export declare type IssueType = 'Error' | 'Warning';
export declare type Severity = 'Critical' | 'Important' | 'Moderate' | 'Low';
export declare type Level = 'Mandatory' | 'Opportunity for Excellence';
export declare type Group = 'Ignored' | 'Security' | 'Correctness' | 'Accessibility' | 'Clarity' | 'Whitespace' | 'Configurable' | 'Deprecated';

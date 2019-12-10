import * as ts from 'typescript';
import * as Lint from 'tslint';
export declare class ErrorTolerantWalker extends Lint.RuleWalker {
    static DEBUG: boolean;
    protected visitNode(node: ts.Node): void;
    private getClassName();
}

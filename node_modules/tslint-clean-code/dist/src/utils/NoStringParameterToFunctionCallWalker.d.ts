import * as ts from 'typescript';
import * as Lint from 'tslint';
import { ScopedSymbolTrackingWalker } from './ScopedSymbolTrackingWalker';
export declare class NoStringParameterToFunctionCallWalker extends ScopedSymbolTrackingWalker {
    private failureString;
    private targetFunctionName;
    constructor(sourceFile: ts.SourceFile, targetFunctionName: string, options: Lint.IOptions, program?: ts.Program);
    protected visitCallExpression(node: ts.CallExpression): void;
    private validateExpression(node);
}

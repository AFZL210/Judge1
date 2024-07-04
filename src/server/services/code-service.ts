import { CodeI } from "../common/typedefs/types";
import { LANGUAGES_REQUIRE_BUILD } from "../constants";

class CodeService {
    code: CodeI;

    constructor(code: CodeI) {
        this.code = code;
    }

    buildRequired(): boolean {
        return LANGUAGES_REQUIRE_BUILD.includes(this.code.language);
    }

    getExecutionCommand(): string {
        return '';
    }
}

export default CodeService;
import validationRules from "./validationRules.js";

class CodeEvaluator {
  evaluateCode(code, projectType, taskId) {
    const results = [];
    const rules = validationRules[projectType]?.[taskId] || [];

    for (const rule of rules) {
      const result = this.validateRule(code, rule);
      results.push({
        testName: rule.description,
        passed: result,
        message: result ? `✓ ${rule.description}` : `✗ ${rule.error}`,
        expected: rule.pattern,
      });
    }

    // Additional syntax validation
    const syntaxCheck = this.checkBasicSyntax(code);
    if (!syntaxCheck.valid) {
      results.push({
        testName: "Code Syntax",
        passed: false,
        message: `✗ ${syntaxCheck.error}`,
      });
    }

    return results;
  }

  validateRule(code, rule) {
    switch (rule.type) {
      case "CONTAINS":
        return code.includes(rule.pattern);

      case "REGEX":
        return rule.pattern.test(code);

      default:
        return false;
    }
  }

  checkBasicSyntax(code) {
    // Check balanced braces and parentheses
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;

    if (openBraces !== closeBraces) {
      return { valid: false, error: "Unbalanced braces { }" };
    }

    if (openParens !== closeParens) {
      return { valid: false, error: "Unbalanced parentheses ( )" };
    }

    return { valid: true };
  }
}

export default new CodeEvaluator();

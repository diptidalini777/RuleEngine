function parseCondition(condition) {
    const trimmedCondition = condition.trim();
    const operatorMatch = trimmedCondition.match(/(>|<|=)/);
    
    if (!operatorMatch) {
        throw new Error('Invalid condition format');
    }

    const operator = operatorMatch[0];
    const [left, right] = trimmedCondition.split(operator).map(part => part.trim());

    return {
        type: 'operand',
        value: {
            left,
            operator,
            right: isNaN(right) ? right.replace(/'/g, '') : Number(right),
        },
    };
}

function createAST(ruleString) {
    const parts = ruleString.split(/ AND | OR /).map(part => parseCondition(part));
    return buildAST(parts);
}

function buildAST(nodes) {
    if (nodes.length === 1) return nodes[0];

    return {
        type: 'operator',
        left: nodes[0],
        right: buildAST(nodes.slice(1)),
    };
}

function combineRules(ruleStrings) {
    const asts = ruleStrings.map(createAST);
    return buildAST(asts);
}

function evaluateRule(ast, data) {
    if (ast.type === 'operand') {
        const { left, operator, right } = ast.value;
        const leftValue = data[left];

        switch (operator) {
            case '>':
                return leftValue > right;
            case '<':
                return leftValue < right;
            case '=':
                return leftValue === right;
            default:
                throw new Error('Invalid operator');
        }
    }

    if (ast.type === 'operator') {
        const leftResult = evaluateRule(ast.left, data);
        const rightResult = evaluateRule(ast.right, data);
        return leftResult && rightResult; // Modify for OR logic if needed
    }

    throw new Error('Invalid AST node type');
}

module.exports = { createAST, evaluateRule, combineRules };

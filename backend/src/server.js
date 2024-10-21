const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { createAST, evaluateRule, combineRules } = require('./astUtils');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post('/create_rule', async (req, res) => {
    const { rule_string } = req.body;
    try {
        const newRule = await prisma.rule.create({
            data: {
                ruleString: rule_string,
                ast: JSON.stringify(createAST(rule_string)), // Create AST
            },
        });

        res.status(200).json({ success: true, rule: newRule });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/combine_rules', async (req, res) => {
    const { rules } = req.body;
    try {
        const combinedAST = combineRules(rules);
        res.status(200).json({ success: true, ast: combinedAST });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/evaluate_rule', async (req, res) => {
    const { ast, data } = req.body;
    try {
        const result = evaluateRule(ast, data);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

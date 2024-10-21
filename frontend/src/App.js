import React, { useState } from 'react';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

const App = () => {
    const [rules, setRules] = useState([]);
    const [combinedAST, setCombinedAST] = useState(null);

    const handleRuleCreated = (newRule) => {
        setRules([...rules, newRule.ruleString]);
    };

    const handleRulesCombined = (ast) => {
        setCombinedAST(ast);
    };

    return (
        <div>
            <h1>Rule Engine</h1>
            <CreateRule onRuleCreated={handleRuleCreated} />
            <CombineRules onRulesCombined={handleRulesCombined} />
            {combinedAST && <EvaluateRule ast={combinedAST} />}
        </div>
    );
};

export default App;

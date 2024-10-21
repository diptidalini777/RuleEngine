import React, { useState } from 'react';

const CombineRules = ({ onRulesCombined }) => {
    const [rules, setRules] = useState(['']);

    const handleCombineRules = async () => {
        const response = await fetch('http://localhost:5000/combine_rules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rules }),
        });
        const data = await response.json();
        if (data.success) {
            onRulesCombined(data.ast);
            setRules(['']);
        } else {
            alert(data.message);
        }
    };

    const handleRuleChange = (index, value) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const addRuleInput = () => {
        setRules([...rules, '']);
    };

    return (
        <div>
            <h2>Combine Rules</h2>
            {rules.map((rule, index) => (
                <div key={index}>
                    <textarea
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        placeholder="Enter a rule"
                    />
                </div>
            ))}
            <button onClick={addRuleInput}>Add Rule</button>
            <button onClick={handleCombineRules}>Combine Rules</button>
        </div>
    );
};

export default CombineRules;

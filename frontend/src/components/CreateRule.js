import React, { useState } from 'react';

const CreateRule = ({ onRuleCreated }) => {
    const [ruleString, setRuleString] = useState('');

    const handleCreateRule = async () => {
        const response = await fetch('http://localhost:5000/create_rule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rule_string: ruleString }),
        });

        const data = await response.json();
        if (data.success) {
            onRuleCreated(data.rule);
            setRuleString('');
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <h2>Create Rule</h2>
            <textarea
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder="Enter a rule (e.g., age > 30 AND department = 'Sales')"
            />
            <button onClick={handleCreateRule}>Create Rule</button>
        </div>
    );
};

export default CreateRule;

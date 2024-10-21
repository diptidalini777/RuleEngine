import React, { useState } from 'react';

const EvaluateRule = ({ ast }) => {
    const [data, setData] = useState({});
    const [evaluationResult, setEvaluationResult] = useState(null);

    const handleEvaluateRule = async () => {
        const response = await fetch('http://localhost:5000/evaluate_rule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ast, data }),
        });

        const result = await response.json();
        if (result.success) {
            setEvaluationResult(result.result);
        } else {
            alert(result.message);
        }
    };

    return (
        <div>
            <h2>Evaluate Combined Rule</h2>
            <textarea
                onChange={(e) => setData(JSON.parse(e.target.value))}
                placeholder="Enter data for evaluation (e.g., { 'age': 35, 'department': 'Sales' })"
            />
            <button onClick={handleEvaluateRule}>Evaluate Rule</button>
            {evaluationResult !== null && (
                <div>
                    <h3>Evaluation Result: {evaluationResult ? 'True' : 'False'}</h3>
                </div>
            )}
        </div>
    );
};

export default EvaluateRule;

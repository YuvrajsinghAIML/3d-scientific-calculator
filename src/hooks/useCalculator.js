import { useState } from 'react';
import * as math from 'mathjs';

export function useCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [ans, setAns] = useState('0');

  const handlePress = (val) => {
    // Basic clears
    if (val === 'AC') {
      setExpression('');
      setResult('0');
      return;
    }
    
    if (val === 'DEL' || val === 'C') {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }
    
    if (val === '=') {
      try {
        if (!expression) return;
        
        // Replace 'Ans' with the actual answer value before evaluating
        const evalString = expression.replace(/Ans/g, `(${ans})`);
        
        // Evaluate the expression using mathjs
        const evaluated = math.evaluate(evalString);
        
        // Format to avoid long decimals
        const formatted = math.format(evaluated, { precision: 10 });
        setResult(String(formatted));
        setAns(String(formatted)); // Save to Answer memory
      } catch (err) {
        setResult('Error');
      }
      return;
    }

    // Map scientific functions to mathjs syntax
    const functionMap = {
      'sin': 'sin(',
      'cos': 'cos(',
      'tan': 'tan(',
      'log': 'log10(',
      'ln': 'log(',
      'sqrt': 'sqrt(',
      'x^2': '^2',
      'x^-1': '^-1',
      'x10^x': '*10^',
      'Ans': 'Ans',
      '^': '^',
      '(-)': '-',
      'a/b': '/',
      'int': 'floor('
    };

    if (functionMap[val]) {
      setExpression((prev) => prev + functionMap[val]);
      return;
    }

    // Placeholders for advanced Casio functions
    const noOps = ['SHIFT', 'ALPHA', 'MODE', 'ON', 'CALC', 'log[]', 'o,,,', 'hyp', 'RCL', 'ENG', 'S<=>D', 'M+', 'v', '<', '>'];
    if (noOps.includes(val)) {
      // Do nothing or show a small hint (we'll just ignore for now to keep the screen clean)
      return;
    }

    setExpression((prev) => prev + val);
  };

  return { expression, result, handlePress };
}

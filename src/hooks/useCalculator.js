import { useState, useEffect, useRef, useCallback } from 'react';
import * as math from 'mathjs';

export function useCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [ans, setAns] = useState('0');
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [shiftMode, setShiftMode] = useState(false);
  const [alphaMode, setAlphaMode] = useState(false);
  
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // 4 minutes = 240,000 milliseconds
    timerRef.current = setTimeout(() => {
      setIsPoweredOn(false);
      setShiftMode(false);
      setAlphaMode(false);
    }, 240000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePress = (val) => {
    // If it's off, only the ON button works
    if (!isPoweredOn) {
      if (val === 'ON') {
        setIsPoweredOn(true);
        resetTimer();
      }
      return;
    }

    // Reset the sleep timer on any interaction
    resetTimer();

    if (val === 'SHIFT') {
      setShiftMode((prev) => !prev);
      setAlphaMode(false);
      return;
    }

    if (val === 'ALPHA') {
      setAlphaMode((prev) => !prev);
      setShiftMode(false);
      return;
    }

    // Reset shift/alpha modes after a regular key press (optional, usually modifiers apply once)
    // Here we'll reset them whenever a non-modifier key is pressed
    const isModifier = val === 'SHIFT' || val === 'ALPHA';
    if (!isModifier) {
      setShiftMode(false);
      setAlphaMode(false);
    }

    // Basic clears
    if (val === 'AC') {
      setExpression('');
      setResult('');
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
    const noOps = ['MODE', 'CALC', 'log[]', 'o,,,', 'hyp', 'RCL', 'ENG', 'S<=>D', 'M+', 'v', '<', '>'];
    if (noOps.includes(val)) {
      // Do nothing or show a small hint (we'll just ignore for now to keep the screen clean)
      return;
    }

    setExpression((prev) => prev + val);
  };

  return { expression, result, isPoweredOn, shiftMode, alphaMode, handlePress };
}

import { RoundedBox } from '@react-three/drei';
import { Display } from './Display';
import { Button } from './Button';
import { useCalculator } from '../hooks/useCalculator';

export function Calculator() {
  const { expression, result, isPoweredOn, shiftMode, alphaMode, handlePress } = useCalculator();

  const c_top = '#444';      // dark gray for small top buttons
  const c_sci = '#111';      // black for scientific
  const c_num = '#ccc';      // light gray for numbers
  const c_op = '#666';       // gray for operations (+-*/)
  const c_del = '#4a9c68';   // green for DEL/AC
  const c_dpad = '#999';     // silver for dpad

  // Generate 6-column layout X coords
  const cols6 = [-1.8, -1.08, -0.36, 0.36, 1.08, 1.8];
  // Generate 5-column layout X coords
  const cols5 = [-1.8, -0.9, 0, 0.9, 1.8];

  const btnLayout = [
    // Top Row & Upper Scientific
    { label: 'SHIFT', x: -1.8, y: 1.9, w: 0.6, h: 0.25, r: 0.12, c: c_top },
    { label: 'ALPHA', x: -1.0, y: 1.9, w: 0.6, h: 0.25, r: 0.12, c: c_top },
    { label: 'MODE', x: 1.0, y: 1.9, w: 0.6, h: 0.25, r: 0.12, c: c_top },
    { label: 'ON', x: 1.8, y: 1.9, w: 0.6, h: 0.25, r: 0.12, c: c_top },

    // D-Pad
    { label: '^', x: 0, y: 2.1, w: 0.6, h: 0.4, r: 0.1, c: c_dpad, tc: '#000' },
    { label: 'v', x: 0, y: 1.3, w: 0.6, h: 0.4, r: 0.1, c: c_dpad, tc: '#000' },
    { label: '<', x: -0.4, y: 1.7, w: 0.4, h: 0.6, r: 0.1, c: c_dpad, tc: '#000' },
    { label: '>', x: 0.4, y: 1.7, w: 0.4, h: 0.6, r: 0.1, c: c_dpad, tc: '#000' },

    // Middle Top Scientific
    { label: 'CALC', x: -1.8, y: 1.3, w: 0.6, h: 0.3, r: 0.1, c: c_top },
    { label: 'int', x: -1.0, y: 1.3, w: 0.6, h: 0.3, r: 0.1, c: c_top },
    { label: 'x^-1', x: 1.0, y: 1.3, w: 0.6, h: 0.3, r: 0.1, c: c_top },
    { label: 'log[]', x: 1.8, y: 1.3, w: 0.6, h: 0.3, r: 0.1, c: c_top },

    // Scientific Block (4 rows)
    { label: 'a/b', x: cols6[0], y: 0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'sqrt', x: cols6[1], y: 0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'x^2', x: cols6[2], y: 0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: '^', x: cols6[3], y: 0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'log', x: cols6[4], y: 0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'ln', x: cols6[5], y: 0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },

    { label: '(-)', x: cols6[0], y: 0.0, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'o,,,', x: cols6[1], y: 0.0, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'hyp', x: cols6[2], y: 0.0, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'sin', x: cols6[3], y: 0.0, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'cos', x: cols6[4], y: 0.0, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'tan', x: cols6[5], y: 0.0, w: 0.55, h: 0.4, r: 0.08, c: c_sci },

    { label: 'RCL', x: cols6[0], y: -0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'ENG', x: cols6[1], y: -0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: '(', x: cols6[2], y: -0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: ')', x: cols6[3], y: -0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'S<=>D', x: cols6[4], y: -0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },
    { label: 'M+', x: cols6[5], y: -0.6, w: 0.55, h: 0.4, r: 0.08, c: c_sci },

    // Numpad Block
    { label: '7', x: cols5[0], y: -1.6, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '8', x: cols5[1], y: -1.6, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '9', x: cols5[2], y: -1.6, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111', tl: 'CLR', tlc: '#ffcc00' },
    { label: 'DEL', x: cols5[3], y: -1.6, w: 0.7, h: 0.5, r: 0.1, c: c_del },
    { label: 'AC', x: cols5[4], y: -1.6, w: 0.7, h: 0.5, r: 0.1, c: c_del },

    { label: '4', x: cols5[0], y: -2.3, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '5', x: cols5[1], y: -2.3, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '6', x: cols5[2], y: -2.3, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '*', x: cols5[3], y: -2.3, w: 0.7, h: 0.5, r: 0.1, c: c_op },
    { label: '/', x: cols5[4], y: -2.3, w: 0.7, h: 0.5, r: 0.1, c: c_op },

    { label: '1', x: cols5[0], y: -3.0, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '2', x: cols5[1], y: -3.0, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '3', x: cols5[2], y: -3.0, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '+', x: cols5[3], y: -3.0, w: 0.7, h: 0.5, r: 0.1, c: c_op },
    { label: '-', x: cols5[4], y: -3.0, w: 0.7, h: 0.5, r: 0.1, c: c_op },

    { label: '0', x: cols5[0], y: -3.7, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '.', x: cols5[1], y: -3.7, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: 'x10^x', x: cols5[2], y: -3.7, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: 'Ans', x: cols5[3], y: -3.7, w: 0.7, h: 0.5, r: 0.1, c: c_num, tc: '#111' },
    { label: '=', x: cols5[4], y: -3.7, w: 0.7, h: 0.5, r: 0.1, c: c_op },
  ];

  return (
    <group>
      {/* Main Body */}
      <RoundedBox args={[4.8, 9.8, 0.4]} radius={0.2} smoothness={4} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#282a2e" roughness={0.4} metalness={0.4} />
      </RoundedBox>


      {/* Display Screen */}
      <Display isPoweredOn={isPoweredOn} shiftMode={shiftMode} alphaMode={alphaMode} expression={expression} result={result} position={[0, 3.15, 0.201]} />

      {/* Buttons */}
      <group position={[0, -0.2, 0.201]}>
        {btnLayout.map((btn, idx) => (
          <Button
            key={idx}
            position={[btn.x, btn.y, 0]}
            label={btn.label}
            width={btn.w}
            height={btn.h}
            radius={btn.r}
            color={btn.c}
            textColor={btn.tc}
            topLabel={btn.tl}
            topLabelColor={btn.tlc}
            onClick={handlePress}
          />
        ))}
      </group>
    </group>
  );
}

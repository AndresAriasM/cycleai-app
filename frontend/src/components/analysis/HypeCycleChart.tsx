// frontend/src/components/analysis/HypeCycleChart.tsx
import React from 'react';

interface HypeCycleChartProps {
  chartData: any;
  currentPhase: string;
  isMobile: boolean;
}

const HypeCycleChart: React.FC<HypeCycleChartProps> = ({ 
  chartData, 
  currentPhase, 
  isMobile 
}) => {
  // Generar puntos de la curva de Gartner
  const generateHypeCurve = () => {
    const points = [];
    for (let x = 0; x <= 100; x += 2) {
      const y = 60 * Math.exp(-Math.pow((x - 20) / 15, 2)) -
                20 * Math.exp(-Math.pow((x - 60) / 40, 2)) +
                40 * Math.exp(-Math.pow((x - 90) / 20, 2));
      points.push(`${x},${100 - Math.max(0, y + 20)}`);
    }
    return points.join(' ');
  };

  const getPhasePosition = (phase: string) => {
    const positions = {
      'Pre-Innovation Trigger': { x: 5, y: 85 },
      'Innovation Trigger': { x: 20, y: 50 },
      'Peak of Inflated Expectations': { x: 30, y: 15 },
      'Trough of Disillusionment': { x: 60, y: 80 },
      'Slope of Enlightenment': { x: 75, y: 50 },
      'Plateau of Productivity': { x: 90, y: 35 }
    };
    return positions[phase as keyof typeof positions] || { x: 50, y: 50 };
  };

  const position = getPhasePosition(currentPhase);
  const phaseColor = '#8b5cf6';

  return (
    <div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Posición en el Hype Cycle de Gartner
      </h3>
      
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <svg 
          viewBox="0 0 100 100" 
          style={{
            width: '100%',
            height: isMobile ? '300px' : '400px',
            background: 'white',
            borderRadius: '8px'
          }}
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Main curve */}
          <polyline
            points={generateHypeCurve()}
            fill="none"
            stroke="#4c1d95"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Phase markers */}
          {[
            { phase: 'Innovation Trigger', x: 20, y: 50, label: 'Innovation\nTrigger' },
            { phase: 'Peak of Inflated Expectations', x: 30, y: 15, label: 'Peak of\nExpectations' },
            { phase: 'Trough of Disillusionment', x: 60, y: 80, label: 'Trough of\nDisillusionment' },
            { phase: 'Slope of Enlightenment', x: 75, y: 50, label: 'Slope of\nEnlightenment' },
            { phase: 'Plateau of Productivity', x: 90, y: 35, label: 'Plateau of\nProductivity' }
          ].map((marker, index) => (
            <g key={index}>
              <circle
                cx={marker.x}
                cy={marker.y}
                r="2"
                fill={marker.phase === currentPhase ? phaseColor : '#64748b'}
                stroke="white"
                strokeWidth="1"
              />
              <text
                x={marker.x}
                y={marker.y - 8}
                textAnchor="middle"
                fontSize="3"
                fill="#374151"
                fontWeight={marker.phase === currentPhase ? 'bold' : 'normal'}
              >
                {marker.label.split('\n').map((line, i) => (
                  <tspan key={i} x={marker.x} dy={i === 0 ? 0 : 3}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
          
          {/* Current position */}
          <circle
            cx={position.x}
            cy={position.y}
            r="4"
            fill={phaseColor}
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={position.x}
            y={position.y + 12}
            textAnchor="middle"
            fontSize="4"
            fill={phaseColor}
            fontWeight="bold"
          >
            Tecnología
          </text>
          
          {/* Axes labels */}
          <text x="50" y="98" textAnchor="middle" fontSize="3" fill="#64748b">
            Madurez de la Tecnología
          </text>
          <text x="2" y="50" textAnchor="middle" fontSize="3" fill="#64748b" transform="rotate(-90 2 50)">
            Expectativas
          </text>
        </svg>
        
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#64748b'
        }}>
          La tecnología analizada se encuentra actualmente en: <strong style={{color: phaseColor}}>{currentPhase}</strong>
        </div>
      </div>
    </div>
  );
};

export default HypeCycleChart;
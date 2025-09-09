// frontend/src/components/analysis/HypeCycleChart.tsx
import React from 'react';
import { Info} from 'lucide-react';
import { hypeCycleStyles } from '../../styles/analysisStyles';

interface HypeCycleChartProps {
  chartData: any;
  currentPhase: string;
  isMobile: boolean;
}

const HypeCycleChart: React.FC<HypeCycleChartProps> = ({ 
  //chartData, 
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

  const getPhaseDescription = (phase: string): string => {
    const descriptions = {
      'Innovation Trigger': 'Una nueva tecnología emerge con potencial disruptivo. Alta atención mediática pero pocas aplicaciones prácticas.',
      'Peak of Inflated Expectations': 'Máximo hype mediático. Expectativas irreales sobre el potencial de la tecnología.',
      'Trough of Disillusionment': 'La realidad no cumple las expectativas. Interés mediático declina, muchos proyectos fallan.',
      'Slope of Enlightenment': 'Comprensión real de las capacidades y limitaciones. Aplicaciones prácticas emergen.',
      'Plateau of Productivity': 'Beneficios ampliamente demostrados. Tecnología madura y adoptada mainstream.'
    };
    return descriptions[phase as keyof typeof descriptions] || 'Fase en desarrollo de la tecnología.';
  };

  const phases = [
    { name: 'Innovation Trigger', short: 'Trigger' },
    { name: 'Peak of Inflated Expectations', short: 'Peak' },
    { name: 'Trough of Disillusionment', short: 'Trough' },
    { name: 'Slope of Enlightenment', short: 'Slope' },
    { name: 'Plateau of Productivity', short: 'Plateau' }
  ];

  const position = getPhasePosition(currentPhase);
  const phaseColor = '#8b5cf6';

  return (
    <div style={hypeCycleStyles.container}>
      <h3 style={hypeCycleStyles.title}>
        Posición en el Hype Cycle de Gartner
      </h3>
      
      <div style={hypeCycleStyles.chartCard(isMobile)}>
        <svg 
          viewBox="0 0 100 100" 
          style={hypeCycleStyles.svgContainer(isMobile)}
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="30%" stopColor="#7c3aed" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Main curve with gradient */}
          <polyline
            points={generateHypeCurve()}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
          />
          
          {/* Phase markers */}
          {[
            { phase: 'Innovation Trigger', x: 20, y: 50, label: isMobile ? 'Trigger' : 'Innovation\nTrigger' },
            { phase: 'Peak of Inflated Expectations', x: 30, y: 15, label: isMobile ? 'Peak' : 'Peak of\nExpectations' },
            { phase: 'Trough of Disillusionment', x: 60, y: 80, label: isMobile ? 'Trough' : 'Trough of\nDisillusionment' },
            { phase: 'Slope of Enlightenment', x: 75, y: 50, label: isMobile ? 'Slope' : 'Slope of\nEnlightenment' },
            { phase: 'Plateau of Productivity', x: 90, y: 35, label: isMobile ? 'Plateau' : 'Plateau of\nProductivity' }
          ].map((marker, index) => (
            <g key={index}>
              <circle
                cx={marker.x}
                cy={marker.y}
                r={marker.phase === currentPhase ? "3" : "2"}
                fill={marker.phase === currentPhase ? phaseColor : '#64748b'}
                stroke="white"
                strokeWidth="2"
                filter={marker.phase === currentPhase ? "drop-shadow(0 2px 4px rgba(139, 92, 246, 0.5))" : "none"}
              />
              <text
                x={marker.x}
                y={marker.y - (isMobile ? 6 : 8)}
                textAnchor="middle"
                fontSize={isMobile ? "2.5" : "3"}
                fill="#374151"
                fontWeight={marker.phase === currentPhase ? 'bold' : 'normal'}
              >
                {marker.label.split('\n').map((line, i) => (
                  <tspan key={i} x={marker.x} dy={i === 0 ? 0 : (isMobile ? 2.5 : 3)}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
          
          {/* Current position with enhanced visual */}
          <g>
            <circle
              cx={position.x}
              cy={position.y}
              r="6"
              fill={phaseColor}
              stroke="white"
              strokeWidth="3"
              filter="drop-shadow(0 3px 6px rgba(139, 92, 246, 0.4))"
            />
            <circle
              cx={position.x}
              cy={position.y}
              r="10"
              fill="none"
              stroke={phaseColor}
              strokeWidth="2"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            <text
              x={position.x}
              y={position.y + 16}
              textAnchor="middle"
              fontSize="4"
              fill={phaseColor}
              fontWeight="bold"
            >
              Tecnología
            </text>
          </g>
          
          {/* Axes labels */}
          <text x="50" y="98" textAnchor="middle" fontSize="3" fill="#64748b" fontWeight="500">
            Madurez de la Tecnología →
          </text>
          <text x="2" y="50" textAnchor="middle" fontSize="3" fill="#64748b" fontWeight="500" transform="rotate(-90 2 50)">
            ↑ Expectativas
          </text>
        </svg>
        
        {/* Descripción de la fase actual */}
        <div style={hypeCycleStyles.currentPhaseDescription}>
          <div style={hypeCycleStyles.currentPhaseTitle}>
            Fase Actual: {currentPhase}
          </div>
          <div>{getPhaseDescription(currentPhase)}</div>
        </div>

        {/* Información adicional para móvil */}
        {isMobile && (
          <div style={hypeCycleStyles.phaseInfoCard(isMobile)}>
            <div style={hypeCycleStyles.phaseInfoTitle}>
              <Info size={16} />
              Fases del Hype Cycle
            </div>
            <div style={hypeCycleStyles.phasesList}>
              {phases.map((phase) => (
                <div 
                  key={phase.name} 
                  style={hypeCycleStyles.phaseItem(phase.name === currentPhase)}
                >
                  <div style={hypeCycleStyles.phaseCircle(phase.name === currentPhase)} />
                  <span style={hypeCycleStyles.phaseName(phase.name === currentPhase)}>
                    {phase.short}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HypeCycleChart;
import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Check, Minus, Phone, Plus } from 'lucide-react';
import { FEATURES, PHONE, PRICES } from './data';
import { Reveal, scrollToId } from './ui';

type Canvas = keyof typeof PRICES.canvas;
const CANVAS: { id: Canvas; label: string }[] = [
  { id: 'matte', label: 'Матова' },
  { id: 'satin', label: 'Сатин' },
  { id: 'glossy', label: 'Глянець' },
];

function Stepper({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="stepper">
      <span>{label}</span>
      <div>
        <button onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Менше: ${label}`}><Minus /></button>
        <b>{value}</b>
        <button onClick={() => onChange(value + 1)} aria-label={`Більше: ${label}`}><Plus /></button>
      </div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, v => Math.round(v).toLocaleString('uk-UA'));
  useEffect(() => { const c = animate(mv, value, { duration: .8, ease: [0.22, 0.8, 0.2, 1] }); return c.stop; }, [value]);
  return <motion.span style={{ fontSize: 'inherit', color: 'inherit', margin: 0, fontStyle: 'normal' }}>{text}</motion.span>;
}

export default function Calculator({ onEstimate }: { onEstimate: (text: string) => void }) {
  const [canvas, setCanvas] = useState<Canvas>('matte');
  const [area, setArea] = useState(18);
  const [corners, setCorners] = useState(4);
  const [lights, setLights] = useState(6);
  const [lines, setLines] = useState(0);

  const total = area * PRICES.canvas[canvas] + corners * PRICES.corner + lights * PRICES.light + lines * PRICES.lineMeter;
  const pct = ((area - 5) / (120 - 5)) * 100;

  const send = () => {
    const label = { matte: 'матове', satin: 'сатинове', glossy: 'глянцеве' }[canvas];
    onEstimate(`Розрахунок: ${area} м², ${label} полотно, кутів ${corners}, світильників ${lights}${lines ? `, світлових ліній ${lines} м` : ''} — орієнтовно ${total.toLocaleString('uk-UA')} грн.`);
    scrollToId('contacts');
  };

  return (
    <section className="section" id="calculator">
      <div className="calc">
        <Reveal className="calc-aside">
          <span className="eyebrow">Вартість</span>
          <h2 className="h-section" style={{ marginTop: 26 }}>Орієнтовна ціна<br /><em className="gold-text">за хвилину</em></h2>
          <p className="lead">Налаштуйте параметри кімнати — і отримайте попередній розрахунок. Остаточну вартість майстер зафіксує на безкоштовному замірі.</p>
          <ul>
            <li><Check /> Ціна фіксується після заміру</li>
            <li><Check /> Без доплат «за складність» у кінці</li>
            <li><Check /> Замір і консультація — безкоштовно</li>
          </ul>
        </Reveal>

        <Reveal delay={.1} className="calc-panel">
          <div className="field">
            <div className="field-label">Тип полотна</div>
            <div className="seg">
              {CANVAS.map(c => <button key={c.id} className={canvas === c.id ? 'on' : ''} onClick={() => setCanvas(c.id)}>{c.label}</button>)}
            </div>
          </div>

          <div className="field">
            <div className="field-label">Площа кімнати <b>{area} м²</b></div>
            <input
              className="range" type="range" min={5} max={120} value={area}
              style={{ ['--p' as string]: `${pct}%` }}
              onChange={e => setArea(+e.target.value)}
              aria-label="Площа кімнати, м²"
            />
            <div className="range-scale"><span>5 м²</span><span>120 м²</span></div>
          </div>

          <div className="field">
            <div className="field-label">Деталі</div>
            <div className="steppers">
              <Stepper label="Кути" value={corners} onChange={setCorners} min={3} />
              <Stepper label="Світильники" value={lights} onChange={setLights} />
              <Stepper label="Лінії світла, м" value={lines} onChange={setLines} />
            </div>
          </div>

          <div className="calc-total">
            <div>
              <small>Орієнтовна вартість</small>
              <strong>від <AnimatedNumber value={total} /><span>грн</span></strong>
            </div>
            {FEATURES.leadForm
              ? <button className="btn btn-gold" onClick={send}>Зафіксувати на замірі <ArrowRight /></button>
              : <a className="btn btn-gold" href={`tel:${PHONE}`}><Phone /> Уточнити ціну</a>}
          </div>
          <p className="calc-note">* Розрахунок попередній. Точна ціна залежить від стін, профілю та обраного світла і визначається на замірі.</p>
        </Reveal>
      </div>
    </section>
  );
}

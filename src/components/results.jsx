import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const COLS = ['GSM8K', 'MMLU-Pro', 'BBH'];

export default function Results({ tables }) {
  const [idx, setIdx] = useState(0);
  if (!tables || tables.length === 0) return null;

  const n = tables.length;
  const table = tables[idx];
  const go = (d) => setIdx((idx + d + n) % n);

  return (
    <div className="uk-margin-medium-top">
      <div className="uk-flex uk-flex-middle uk-flex-center uk-margin-small-bottom">
        <button
          className="uk-icon-button"
          onClick={() => go(-1)}
          aria-label="Previous model"
        >
          <FaChevronLeft />
        </button>
        <span
          className="uk-text-bold uk-margin-small-left uk-margin-small-right"
          style={{ minWidth: '14em', textAlign: 'center' }}
        >
          {table.model}
        </span>
        <button
          className="uk-icon-button"
          onClick={() => go(1)}
          aria-label="Next model"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="uk-overflow-auto uk-width-1-1">
        <table className="uk-table uk-table-small uk-text-small uk-table-divider uk-text-center">
          <thead>
            <tr>
              <th rowSpan={2} className="uk-text-left">
                Method
              </th>
              <th colSpan={3} className="uk-text-center">
                Accuracy (%)
              </th>
              <th colSpan={3} className="uk-text-center">
                Avg. Tokens
              </th>
            </tr>
            <tr>
              {COLS.map((c) => (
                <th key={'acc-' + c} className="uk-text-center">
                  {c}
                </th>
              ))}
              {COLS.map((c) => (
                <th key={'tok-' + c} className="uk-text-center">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => {
              const hl = r.method === 'IMAD';
              const cell = (v) => (hl ? <strong>{v}</strong> : v);
              return (
                <tr
                  key={r.method}
                  style={hl ? { background: 'rgba(0, 0, 0, 0.04)' } : undefined}
                >
                  <td className="uk-text-left">{cell(r.method)}</td>
                  {r.acc.map((v, i) => (
                    <td key={'acc-' + i}>{cell(v.toFixed(2))}</td>
                  ))}
                  {r.tok.map((v, i) => (
                    <td key={'tok-' + i}>{cell(v)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="uk-flex uk-flex-center uk-margin-small-top">
        {tables.map((_, i) => (
          <span
            key={'dot-' + i}
            onClick={() => setIdx(i)}
            style={{
              cursor: 'pointer',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              margin: '0 4px',
              background: i === idx ? '#333' : '#ccc',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  );
}

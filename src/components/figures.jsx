import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function Figures({ figures }) {
  const [idx, setIdx] = useState(0);
  if (!figures || figures.length === 0) return null;

  const n = figures.length;
  const go = (d) => setIdx((idx + d + n) % n);

  return (
    <div className="uk-margin-medium-top uk-margin-medium-bottom">
      <div className="uk-flex uk-flex-middle uk-flex-center">
        {n > 1 && (
          <button
            className="uk-icon-button uk-margin-small-right uk-flex-none"
            onClick={() => go(-1)}
            aria-label="Previous figure"
          >
            <FaChevronLeft />
          </button>
        )}
        <img
          src={figures[idx]}
          className="uk-responsive-width"
          style={{ maxWidth: '100%' }}
          alt=""
        />
        {n > 1 && (
          <button
            className="uk-icon-button uk-margin-small-left uk-flex-none"
            onClick={() => go(1)}
            aria-label="Next figure"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {n > 1 && (
        <div className="uk-flex uk-flex-center uk-margin-small-top">
          {figures.map((_, i) => (
            <span
              key={'fig-dot-' + i}
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
      )}
    </div>
  );
}

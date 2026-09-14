// Handgetekende, lijn-stijl iconen — passend bij de pastelgroene identiteit.
// Elk icoon is 'currentColor', dus je kunt de kleur sturen via de tekstkleur van het component eromheen.

export function IconLeaf(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 36C8 24 14 10 34 8c2 20-8 30-22 28Z" strokeLinejoin="round" />
      <path d="M13 35C18 24 24 16 33 9" strokeLinecap="round" />
    </svg>
  );
}

export function IconFace(props) {
  // Gezichtsbehandeling — een gestileerd gezichtsprofiel met een sprankel
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M17 10c9 0 14 6 14 14 0 4-1 7-3 10l1 6-6-2c-2 1-4 1-6 1-8 0-14-7-14-15S9 10 17 10Z"
        strokeLinejoin="round"
      />
      <path d="M32 15c3 1 5 4 5 8" strokeLinecap="round" />
      <circle cx="16" cy="21" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDroplet(props) {
  // Huidverzorging / reiniging
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M24 6c7 9 12 16 12 23a12 12 0 1 1-24 0c0-7 5-14 12-23Z"
        strokeLinejoin="round"
      />
      <path d="M17 30c0 4 3 7 7 7" strokeLinecap="round" />
    </svg>
  );
}

export function IconFoot(props) {
  // Medische pedicure
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M20 8c3 0 4 3 4 6s-1 5-1 8c0 5 6 6 6 13 0 5-4 7-9 7-6 0-11-4-11-11 0-6 3-8 3-14 0-5 2-9 8-9Z"
        strokeLinejoin="round"
      />
      <path d="M14 16c1 2 3 3 5 3M14 21c1.5 1.5 3.5 2 5.5 2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpark(props) {
  // Laserontharing
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M24 6v10M24 32v10M6 24h10M32 24h10" strokeLinecap="round" />
      <path d="M12 12l7 7M29 29l7 7M36 12l-7 7M19 29l-7 7" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeart(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M24 40C10 31 5 23 5 16c0-6 4-10 9-10 4 0 8 2 10 7 2-5 6-7 10-7 5 0 9 4 9 10 0 7-5 15-19 24Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPin(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M24 44S10 29 10 19a14 14 0 1 1 28 0c0 10-14 25-14 25Z"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="19" r="5" />
    </svg>
  );
}

export function IconPhone(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M14 8c2 0 5 5 5 7s-3 3-3 5c0 4 8 12 12 12 2 0 3-3 5-3s7 3 7 5c0 3-3 6-6 6-9 0-24-15-24-24 0-3 3-6 4-8Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="6" y="11" width="36" height="26" rx="4" strokeLinejoin="round" />
      <path d="M8 14l16 13 16-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M24 14v11l8 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar(props) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" stroke="none" {...props}>
      <path d="M24 5l5.5 12.4L42 19l-9.5 8.7L35 41 24 34l-11 7 2.5-13.3L6 19l12.5-1.6L24 5Z" />
    </svg>
  );
}

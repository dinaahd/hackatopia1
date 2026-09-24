import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubes.css';

const BLUE = 'rgba(0, 229, 255, 0.9)';   // Electric Cyan / Blue
const PINK = 'rgba(255, 46, 166, 0.9)';  // Hot Magenta / Pink

const Cubes = ({
  gridCols = 24,
  gridRows = 14,
  cellGap = 4,
  borderStyle = '1px dashed rgba(0, 229, 255, 0.42)',
  faceColor = 'rgba(8, 3, 26, 0.85)',
  shadow = false,
  rippleOnClick = true,
  rippleSpeed = 1.5
}) => {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const faceColorRef = useRef(faceColor);
  faceColorRef.current = faceColor;

  // Kill running tweens and reset inline colors on theme switch
  useEffect(() => {
    if (!sceneRef.current) return;
    const faces = sceneRef.current.querySelectorAll('.cube-face');
    if (faces.length) {
      gsap.killTweensOf(faces);
      gsap.set(faces, { clearProps: 'backgroundColor' });
    }
  }, [faceColor]);

  const colGap = typeof cellGap === 'number' ? `${cellGap}px` : '4px';
  const rowGap = typeof cellGap === 'number' ? `${cellGap}px` : '4px';

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const actualCols = isMobile ? Math.min(gridCols, 10) : gridCols;
  const actualRows = isMobile ? Math.min(gridRows, 14) : gridRows;

  // Trigger ripple from specific fractional or integer coordinates
  const triggerRippleAt = useCallback((hitCol, hitRow, customColor) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const spreadDelay = 0.08 / rippleSpeed;
    const animDuration = 0.28 / rippleSpeed;
    const holdTime = 0.45 / rippleSpeed;
    const currentFaceColor = faceColorRef.current;
    const allCubes = scene.querySelectorAll('.cube');
    const maxRadius = isMobile ? 10 : 18;

    allCubes.forEach(cube => {
      const r = parseFloat(cube.dataset.row);
      const c = parseFloat(cube.dataset.col);
      const dist = Math.hypot(c - hitCol, r - hitRow);
      if (dist > maxRadius) return;
      const delay = dist * spreadDelay;
      const randomColor = customColor || (Math.random() > 0.5 ? BLUE : PINK);
      const faces = Array.from(cube.querySelectorAll('.cube-face'));

      gsap.to(faces, {
        backgroundColor: randomColor,
        duration: animDuration,
        delay,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(faces, {
        backgroundColor: currentFaceColor,
        duration: animDuration,
        delay: delay + animDuration + holdTime,
        ease: 'power2.out'
      });
    });
  }, [rippleSpeed, isMobile]);

  // Click Ripple: Originates directly from the clicked cube or click location
  const handleClick = useCallback(
    e => {
      if (!rippleOnClick || !sceneRef.current) return;

      const scene = sceneRef.current;
      const rect = scene.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const clickedCube = e.target.closest?.('.cube');
      let hitCol, hitRow;

      if (clickedCube && clickedCube.dataset.col !== undefined) {
        hitCol = parseFloat(clickedCube.dataset.col);
        hitRow = parseFloat(clickedCube.dataset.row);
      } else {
        hitCol = ((clientX - rect.left) / rect.width) * (actualCols - 1);
        hitRow = ((clientY - rect.top) / rect.height) * (actualRows - 1);
      }

      triggerRippleAt(hitCol, hitRow);
    },
    [rippleOnClick, actualCols, actualRows, triggerRippleAt]
  );

  // Hover effect: subtly illuminate cubes under the mouse cursor
  const lastHoveredRef = useRef(null);
  const handleMouseMove = useCallback(
    e => {
      if (isMobile || !sceneRef.current) return;
      const scene = sceneRef.current;
      const rect = scene.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) return;

      const hitCol = Math.round(((clientX - rect.left) / rect.width) * (actualCols - 1));
      const hitRow = Math.round(((clientY - rect.top) / rect.height) * (actualRows - 1));
      const key = `${hitRow}-${hitCol}`;

      if (lastHoveredRef.current === key) return;
      lastHoveredRef.current = key;

      const currentFaceColor = faceColorRef.current;
      const targetCube = scene.querySelector(`.cube[data-row="${hitRow}"][data-col="${hitCol}"]`);
      if (targetCube) {
        const faces = Array.from(targetCube.querySelectorAll('.cube-face'));
        const hoverColor = (hitRow + hitCol) % 2 === 0 ? BLUE : PINK;
        gsap.to(faces, {
          backgroundColor: hoverColor,
          duration: 0.15,
          ease: 'power1.out',
          overwrite: 'auto'
        });
        gsap.to(faces, {
          backgroundColor: currentFaceColor,
          duration: 0.8,
          delay: 0.25,
          ease: 'power2.out'
        });
      }
    },
    [actualCols, actualRows, isMobile]
  );

  useEffect(() => {
    const handleHeroClick = e => {
      if (e.target.closest('a, button, input, textarea, select')) return;

      const scene = sceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();

      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        handleClick(e);
      }
    };

    let lastTouchMove = 0;
    const handleHeroTouchMove = e => {
      const now = Date.now();
      if (now - lastTouchMove < 120) return;
      lastTouchMove = now;
      handleHeroClick(e);
    };

    window.addEventListener('click', handleHeroClick);
    window.addEventListener('touchstart', handleHeroClick, { passive: true });
    window.addEventListener('touchmove', handleHeroTouchMove, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Initial ambient wave after mount so page looks alive immediately
    const initialTimer = setTimeout(() => {
      triggerRippleAt(Math.floor(actualCols / 2), Math.floor(actualRows / 2));
    }, isMobile ? 600 : 1200);

    // Continuous subtle ambient ripples
    const interval = setInterval(() => {
      const randomCol = Math.floor(Math.random() * actualCols);
      const randomRow = Math.floor(Math.random() * actualRows);
      triggerRippleAt(randomCol, randomRow);
    }, isMobile ? 5500 : 7000);

    return () => {
      window.removeEventListener('click', handleHeroClick);
      window.removeEventListener('touchstart', handleHeroClick);
      window.removeEventListener('touchmove', handleHeroTouchMove);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [handleClick, handleMouseMove, triggerRippleAt, actualCols, actualRows, isMobile]);

  const rows = Array.from({ length: actualRows });
  const cols = Array.from({ length: actualCols });

  const sceneStyle = {
    gridTemplateColumns: `repeat(${actualCols}, 1fr)`,
    gridTemplateRows: `repeat(${actualRows}, 1fr)`,
    columnGap: colGap,
    rowGap: rowGap
  };

  const wrapperStyle = {
    '--cube-face-border': borderStyle,
    '--cube-face-bg': faceColor,
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none'
  };

  return (
    <div ref={containerRef} className="default-animation" style={wrapperStyle}>
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
        {rows.map((_, r) =>
          cols.map((__, c) => (
            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
              <div className="cube-face" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cubes;

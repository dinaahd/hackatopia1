import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubes.css';

const BLUE = 'rgba(0, 229, 255, 0.85)';  // Electric Cyan / Blue
const PINK = 'rgba(255, 46, 166, 0.85)';  // Hot Magenta / Pink

const Cubes = ({
  gridSize = 12,
  cubeSize,
  maxAngle = 0,
  radius = 3,
  cellGap,
  borderStyle = '1.5px dashed rgba(0, 229, 255, 0.28)',
  faceColor = '#08031a',
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

  const colGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.col !== undefined ? `${cellGap.col}px` : '8px';
  const rowGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.row !== undefined ? `${cellGap.row}px` : '8px';

  // Click Ripple: Originates directly from the exact mouse click location
  const handleClick = useCallback(
    e => {
      if (!rippleOnClick || !sceneRef.current) return;

      const scene = sceneRef.current;
      const rect = scene.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      // Find exact clicked cube or exact fractional grid coordinates
      const clickedCube = e.target.closest?.('.cube');
      let hitCol, hitRow;

      if (clickedCube && clickedCube.dataset.col !== undefined) {
        hitCol = parseFloat(clickedCube.dataset.col);
        hitRow = parseFloat(clickedCube.dataset.row);
      } else {
        hitCol = ((clientX - rect.left) / rect.width) * (gridSize - 1);
        hitRow = ((clientY - rect.top) / rect.height) * (gridSize - 1);
      }

      const spreadDelay = 0.08 / rippleSpeed;
      const animDuration = 0.28 / rippleSpeed;
      const holdTime = 0.45 / rippleSpeed;
      const currentFaceColor = faceColorRef.current;

      const allCubes = scene.querySelectorAll('.cube');

      allCubes.forEach(cube => {
        const r = parseFloat(cube.dataset.row);
        const c = parseFloat(cube.dataset.col);
        const dist = Math.hypot(c - hitCol, r - hitRow);
        const delay = dist * spreadDelay;

        // Irregular random distribution: exactly two colors (Blue and Pink)
        const randomColor = Math.random() > 0.5 ? BLUE : PINK;
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
    },
    [rippleOnClick, gridSize, rippleSpeed]
  );

  useEffect(() => {
    const handleHeroClick = e => {
      // Ignore clicks on interactive elements like buttons/links
      if (e.target.closest('a, button, input, textarea, select')) return;

      const scene = sceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();

      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;

      // Only trigger if click occurs within the Hero section viewport
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        handleClick(e);
      }
    };

    window.addEventListener('click', handleHeroClick);
    window.addEventListener('touchstart', handleHeroClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleHeroClick);
      window.removeEventListener('touchstart', handleHeroClick);
    };
  }, [handleClick]);

  const cells = Array.from({ length: gridSize });
  const sceneStyle = {
    gridTemplateColumns: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
    columnGap: colGap,
    rowGap: rowGap
  };
  const wrapperStyle = {
    '--cube-face-border': borderStyle,
    '--cube-face-bg': faceColor,
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',
    ...(cubeSize
      ? {
          width: `${gridSize * cubeSize}px`,
          height: `${gridSize * cubeSize}px`
        }
      : {})
  };

  return (
    <div ref={containerRef} className="default-animation" style={wrapperStyle}>
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
        {cells.map((_, r) =>
          cells.map((__, c) => (
            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--back" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cubes;

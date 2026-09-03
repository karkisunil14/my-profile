import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import useScrollProgressRef from '../hooks/useScrollProgressRef';

// Same palette as the site's CSS theme (src/index.css --color-primary/secondary/accent).
const THEME = {
  primary: '#8b5cf6',
  secondary: '#22d3ee',
  accent: '#f472b6',
};

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useJourneyCurve() {
  return useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.6, 0.8, -18),
      new THREE.Vector3(-1.8, 1.2, -36),
      new THREE.Vector3(2, -1, -54),
      new THREE.Vector3(-1.5, -1.4, -72),
      new THREE.Vector3(1.2, 1.6, -90),
      new THREE.Vector3(0, 0, -110),
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
  }, []);
}

// Where each body sits along the journey (t: 0 = start, 1 = end of page).
// The sun greets you first; a themed planet appears alongside each content
// section; Earth is the destination, arriving right as Contact does.
const WAYPOINTS = [
  { t: 0.14, type: 'sun' },
  { t: 0.32, type: 'planet', color: THEME.primary, radius: 1.1, ring: false },
  { t: 0.5, type: 'planet', color: THEME.secondary, radius: 1.3, ring: false },
  { t: 0.68, type: 'planet', color: THEME.accent, radius: 1.7, ring: true },
  { t: 0.9, type: 'earth' },
];

function sideOffsetPosition(curve, t, distance) {
  const clamped = Math.min(t, 0.999);
  const point = curve.getPointAt(clamped);
  const tangent = curve.getTangentAt(clamped).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  let side = new THREE.Vector3().crossVectors(tangent, up);
  if (side.lengthSq() < 0.0001) side = new THREE.Vector3(1, 0, 0);
  side.normalize();
  const vertical = new THREE.Vector3().crossVectors(side, tangent).normalize();
  const angle = t * 37;
  const dir = side
    .clone()
    .multiplyScalar(Math.cos(angle))
    .add(vertical.clone().multiplyScalar(Math.sin(angle)));
  return point.clone().add(dir.multiplyScalar(distance));
}

// Earth is the journey's destination, so it sits almost dead ahead near the
// very end of the path (a small offset, not the randomized flyby placement
// the other planets use) so it grows in view as you approach the end.
function earthPosition(curve) {
  const t = 0.996;
  const point = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  let side = new THREE.Vector3().crossVectors(tangent, up).normalize();
  if (side.lengthSq() < 0.0001) side = new THREE.Vector3(1, 0, 0);
  return point.clone().add(up.multiplyScalar(1.2)).add(side.multiplyScalar(0.7));
}

function Sun({ position }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!reduceMotion && ref.current) ref.current.rotation.y += delta * 0.04;
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color={THEME.accent} />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[3, 24, 24]} />
        <meshBasicMaterial
          color={THEME.accent}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[3, 24, 24]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color="#fff2e0" intensity={4} distance={220} decay={1.6} />
    </group>
  );
}

function Planet({ position, color, radius, ring }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!reduceMotion && ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
      {ring && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[radius * 1.6, radius * 2.4, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function useContinents(count, radius) {
  return useMemo(
    () =>
      Array.from({ length: count }, () => {
        const dir = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize();
        return dir.multiplyScalar(radius * 1.01);
      }),
    [count, radius],
  );
}

function Earth({ position }) {
  const group = useRef(null);
  const radius = 2.2;
  const continents = useContinents(9, radius);

  useFrame((_, delta) => {
    if (!reduceMotion && group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={position}>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial color="#0e7490" roughness={0.7} metalness={0.05} />
        </mesh>
        {continents.map((pos, i) => (
          <mesh key={i} position={pos}>
            <icosahedronGeometry args={[radius * (0.22 + ((i * 37) % 12) / 100), 0]} />
            <meshStandardMaterial color="#22c55e" roughness={0.9} />
          </mesh>
        ))}
      </group>
      <mesh scale={1.08}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={THEME.secondary}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function CelestialBodies({ curve }) {
  const bodies = useMemo(
    () =>
      WAYPOINTS.map((w) => ({
        ...w,
        position:
          w.type === 'earth'
            ? earthPosition(curve)
            : sideOffsetPosition(curve, w.t, w.type === 'sun' ? 10 : 7),
      })),
    [curve],
  );

  return (
    <>
      {bodies.map((b, i) => {
        if (b.type === 'sun') return <Sun key={i} position={b.position} />;
        if (b.type === 'earth') return <Earth key={i} position={b.position} />;
        return (
          <Planet
            key={i}
            position={b.position}
            color={b.color}
            radius={b.radius}
            ring={b.ring}
          />
        );
      })}
    </>
  );
}

function Stars({ count = 2200 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 110;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 110;
      arr[i * 3 + 2] = Math.random() * -150 + 15;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e5e7eb"
        size={0.11}
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
}

function Nebula() {
  return (
    <>
      <mesh position={[-26, 10, -50]}>
        <sphereGeometry args={[22, 16, 16]} />
        <meshBasicMaterial
          color={THEME.primary}
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[22, -8, -88]}>
        <sphereGeometry args={[26, 16, 16]} />
        <meshBasicMaterial
          color={THEME.accent}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function Rig({ curve, progressRef }) {
  const { camera } = useThree();
  const point = useRef(new THREE.Vector3());
  const tangent = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useFrame(() => {
    // A fixed step ahead along the curve (rather than getPointAt(t + delta))
    // degenerates to camera.position at t -> 1, freezing the camera's
    // orientation right as it should be arriving at Earth. The tangent
    // direction stays well-defined all the way to the curve's end.
    const t = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    curve.getPointAt(Math.min(t, 0.999), point.current);
    curve.getTangentAt(Math.min(t, 0.999), tangent.current);
    look.current.copy(point.current).add(tangent.current);
    if (reduceMotion) {
      camera.position.copy(point.current);
    } else {
      camera.position.lerp(point.current, 0.06);
    }
    camera.lookAt(look.current);
  });

  return null;
}

function Scene({ progressRef }) {
  const curve = useJourneyCurve();
  return (
    <>
      <fog attach="fog" args={['#05060a', 30, 145]} />
      <ambientLight intensity={0.35} />
      <Stars />
      <Nebula />
      <CelestialBodies curve={curve} />
      <Rig curve={curve} progressRef={progressRef} />
    </>
  );
}

export default function Journey() {
  const progressRef = useScrollProgressRef();

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4], fov: 62, near: 0.1, far: 300 }}
        dpr={[1, 1.8]}
      >
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}

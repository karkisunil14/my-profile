import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Activity,
  Boxes,
  Cloud,
  Database,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  Music2,
  Network,
  ShieldCheck,
  UsersRound,
  Workflow,
} from 'lucide-react';
import { useMemo, useRef } from 'react';

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function AmbientNetwork() {
  const group = useRef(null);
  const nodes = useMemo(() => [
    [-2.7, 1.7, -1], [-1.4, 2.2, -1.4], [.1, 1.65, -1.2], [1.8, 2.05, -1.5], [2.9, .8, -1],
    [-2.9, -.5, -1.2], [-1.5, -1.8, -1.5], [.2, -1.5, -1.1], [1.8, -1.85, -1.35], [3, -.65, -1.2],
  ], []);

  useFrame(({ pointer }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += 0.0009;
    group.current.rotation.x = pointer.y * 0.025;
  });

  return (
    <group ref={group}>
      <mesh rotation={[1.08, 0.15, 0]} position={[0, 0, -1.5]}>
        <torusGeometry args={[2.65, .012, 8, 96]} />
        <meshBasicMaterial color="#39d7ff" transparent opacity={.22} />
      </mesh>
      <mesh rotation={[1.2, -.45, .2]} position={[0, 0, -1.7]}>
        <torusGeometry args={[1.95, .01, 8, 96]} />
        <meshBasicMaterial color="#8d63ff" transparent opacity={.2} />
      </mesh>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[i % 3 === 0 ? .055 : .035, 14, 14]} />
          <meshBasicMaterial color={i % 2 ? '#8d63ff' : '#39d7ff'} transparent opacity={.65} />
        </mesh>
      ))}
    </group>
  );
}

const rows = [
  [
    { label: 'VPC', icon: Network },
    { label: 'EKS', icon: Boxes },
    { label: 'RDS', icon: Database },
  ],
  [
    { label: 'Terraform', icon: Workflow },
    { label: 'GitHub Actions', icon: GitBranch },
    { label: 'Argo CD', icon: ShieldCheck },
  ],
  [
    { label: 'CloudWatch', icon: Activity },
    { label: 'Secrets', icon: KeyRound },
    { label: 'IAM', icon: UsersRound },
  ],
];

const products = [
  { label: 'Infra dashboard', icon: LayoutDashboard, tone: 'coral', preview: 'chart' },
  { label: 'PickleMatch54', icon: ListChecks, tone: 'violet', preview: 'tasks' },
  { label: 'AI Music Studio', icon: Music2, tone: 'cyan', preview: 'music' },
];

function ProductPreview({ type }) {
  if (type === 'chart') return <div className="mini-chart"><i /><i /><i /><i /><i /></div>;
  if (type === 'tasks') return <div className="mini-tasks"><i /><i /><i /></div>;
  return <div className="mini-wave"><i /><i /><i /><i /><i /><i /></div>;
}

export default function InfrastructureScene() {
  return (
    <div className="infrastructure-system">
      <div className="infrastructure-canvas" aria-hidden="true">
        <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 7], fov: 44 }} gl={{ alpha: true, antialias: true }}>
          <AmbientNetwork />
        </Canvas>
      </div>

      <div className="system-flow" aria-label="Infrastructure delivery system">
        <div className="system-sources" aria-label="Core capabilities">
          {[
            ['AWS', Cloud, 'cyan'],
            ['Terraform', Workflow, 'violet'],
            ['DevOps', Network, 'coral'],
            ['CI/CD', GitBranch, 'cyan'],
          ].map(([label, Icon, tone], index) => (
            <motion.div key={label} className={`source-pill source-pill--${tone}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .45 + index * .08 }}>
              <Icon size={16} /> <span>{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="service-stack">
          <motion.div className="cloud-cap" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}><Cloud size={30} /><span>AWS cloud</span></motion.div>
          {rows.map((row, rowIndex) => (
            <motion.div key={rowIndex} className={`service-row service-row--${rowIndex + 1}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 + rowIndex * .12, duration: .55 }}>
              {row.map(({ label, icon: Icon }) => (
                <div className="service-tile" key={label}><Icon size={21} /><span>{label}</span></div>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="product-stack">
          {products.map(({ label, icon: Icon, tone, preview }, index) => (
            <motion.div key={label} className={`product-panel product-panel--${tone}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .62 + index * .12 }} whileHover={{ x: -5, scale: 1.02 }}>
              <div className="product-panel__head"><span className="product-panel__icon"><Icon size={15} /></span><strong>{label}</strong></div>
              <ProductPreview type={preview} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

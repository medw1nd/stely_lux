import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export type Mode = 'contour' | 'lines' | 'tracks' | 'off';

/**
 * A small real-time room seen from below: a glossy stretch ceiling whose built-in light
 * switches between scenarios. Pure three.js, no models — everything is generated.
 */
export default function Scene({ mode, onReady, onFail }: { mode: Mode; onReady?: () => void; onFail?: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;

  useEffect(() => {
    const el = host.current!;
    const W = () => el.clientWidth, H = () => el.clientHeight;
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch {
      el.classList.add('no-webgl');
      onFail?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75));
    renderer.setSize(W(), H());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .9;
    el.appendChild(renderer.domElement);

    RectAreaLightUniformsLib.init();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0c0c0b');
    scene.fog = new THREE.Fog('#0c0c0b', 12, 26);

    const camera = new THREE.PerspectiveCamera(mobile ? 78 : 62, W() / H(), 0.1, 60);
    const camBase = new THREE.Vector3(0, 1.05, mobile ? 4.4 : 3.9);
    camera.position.copy(camBase);
    const target = new THREE.Vector3(0, 2.25, -3.2);

    // ---- room ----
    const RW = 9, RD = 9, RH = 3;
    const wallMat = new THREE.MeshStandardMaterial({ color: '#3a3732', roughness: .9 });
    const floorMat = new THREE.MeshStandardMaterial({ color: '#1a1917', roughness: .38, metalness: .05 });
    const ceilMat = new THREE.MeshPhysicalMaterial({ color: '#e4e0d8', roughness: .28, clearcoat: .55, clearcoatRoughness: .12, emissive: '#fff4e2', emissiveIntensity: 0 });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(RW, RD), floorMat);
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RW, RD), ceilMat);
    ceil.rotation.x = Math.PI / 2; ceil.position.y = RH; scene.add(ceil);
    const wallGeo = new THREE.PlaneGeometry(RW, RH);
    ([[0, -RD / 2, 0], [-RW / 2, 0, Math.PI / 2], [RW / 2, 0, -Math.PI / 2]] as const).forEach(([x, z, r]) => {
      const w = new THREE.Mesh(wallGeo, wallMat); w.position.set(x, RH / 2, z); w.rotation.y = r; scene.add(w);
    });

    const hemi = new THREE.HemisphereLight('#f4ead8', '#0b0b0a', .06); scene.add(hemi);

    // ---- furniture for scale ----
    const fab = new THREE.MeshStandardMaterial({ color: '#34312c', roughness: .95 });
    const wood = new THREE.MeshStandardMaterial({ color: '#2a211a', roughness: .6 });
    const sofa = new THREE.Group();
    const box = (w: number, h: number, d: number, x: number, y: number, z: number, m: THREE.Material) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); sofa.add(b); };
    box(2.8, .42, 1, 0, .21, 0, fab); box(2.8, .55, .22, 0, .62, -.39, fab); box(.22, .62, 1, -1.29, .31, 0, fab); box(.22, .62, 1, 1.29, .31, 0, fab);
    sofa.position.set(-.6, 0, -3.3); scene.add(sofa);
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.4), new THREE.MeshStandardMaterial({ color: '#2e2b27', roughness: 1 }));
    rug.rotation.x = -Math.PI / 2; rug.position.set(-.4, .005, -1.9); scene.add(rug);
    const table = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, .36, 40), wood); table.position.set(-.4, .18, -1.8); scene.add(table);

    // ---- light groups ----
    const warm = new THREE.Color('#fff1d6');
    type Group = { meshes: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>[]; lights: (THREE.PointLight | THREE.SpotLight | THREE.RectAreaLight)[]; base: number[]; level: number };
    const groups: Record<Exclude<Mode, 'off'>, Group> = { contour: mk(), lines: mk(), tracks: mk() };
    function mk(): Group { return { meshes: [], lights: [], base: [], level: 0 }; }

    const strip = (g: Group, x: number, z: number, w: number, d: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, .02, d), new THREE.MeshBasicMaterial({ color: warm.clone(), toneMapped: false }));
      m.position.set(x, RH - .012, z); scene.add(m); g.meshes.push(m);
    };
    /** Soft area light that throws a strip-shaped pool of light toward `look`. */
    const area = (g: Group, x: number, z: number, w: number, d: number, intensity: number, look: [number, number, number]) => {
      const l = new THREE.RectAreaLight(warm, 0, Math.max(w, .12), Math.max(d, .12));
      l.position.set(x, RH - .03, z); l.lookAt(...look); scene.add(l); g.lights.push(l); g.base.push(intensity);
    };

    // contour: LED perimeter, lights the ceiling edges and walls
    const inset = .35, cw = RW - inset * 2, cd = RD - inset * 2;
    strip(groups.contour, 0, -cd / 2, cw, .045); strip(groups.contour, 0, cd / 2, cw, .045);
    strip(groups.contour, -cw / 2, 0, .045, cd); strip(groups.contour, cw / 2, 0, .045, cd);
    area(groups.contour, 0, -cd / 2, cw, .15, 10, [0, 0, -RD / 2 + .2]);
    area(groups.contour, -cw / 2, 0, .15, cd, 10, [-RW / 2 + .2, 0, 0]);
    area(groups.contour, cw / 2, 0, .15, cd, 10, [RW / 2 - .2, 0, 0]);
    area(groups.contour, 0, cd / 2, cw, .15, 5, [0, 0, RD / 2 - .2]);

    // lines: geometric light lines across the ceiling
    strip(groups.lines, -1.1, -.4, .05, 6.2);
    strip(groups.lines, 1.1, -.4, .05, 6.2);
    strip(groups.lines, 0, -3.5, 2.25, .05);
    strip(groups.lines, 2.4, 1.2, 2.6, .05);
    area(groups.lines, -1.1, -.4, .12, 6.2, 6, [-1.1, 0, -.4]);
    area(groups.lines, 1.1, -.4, .12, 6.2, 6, [1.1, 0, -.4]);
    area(groups.lines, 0, -3.5, 2.25, .12, 6, [0, 0, -3.5]);
    area(groups.lines, 2.4, 1.2, 2.6, .12, 6, [2.4, 0, 1.2]);

    // tracks: black magnetic rails with spots
    const railMat = new THREE.MeshStandardMaterial({ color: '#0d0d0d', roughness: .6, metalness: .2, transparent: true, opacity: 0 });
    const trackHW = new THREE.Group(); scene.add(trackHW);
    for (const x of [-1.6, 1.6]) {
      const r = new THREE.Mesh(new THREE.BoxGeometry(.07, .05, 6.4), railMat); r.position.set(x, RH - .025, -.6); trackHW.add(r);
      for (const z of [-3.2, -1.6, 0, 1.6]) {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, .22, 20), railMat);
        body.position.set(x, RH - .16, z); trackHW.add(body);
        const lens = new THREE.Mesh(new THREE.CircleGeometry(.045, 20), new THREE.MeshBasicMaterial({ color: warm.clone(), toneMapped: false }));
        lens.rotation.x = Math.PI / 2; lens.position.set(x, RH - .272, z); scene.add(lens); groups.tracks.meshes.push(lens);
        const s = new THREE.SpotLight(warm, 0, 7, .42, .55, 1.4); s.position.set(x, RH - .3, z); s.target.position.set(x * .6, 0, z + .4); scene.add(s, s.target);
        groups.tracks.lights.push(s); groups.tracks.base.push(9);
      }
    }

    // ---- dust floating in the light ----
    const N = mobile ? 160 : 320;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - .5) * RW * .9; pos[i * 3 + 1] = Math.random() * RH; pos[i * 3 + 2] = (Math.random() - .5) * RD * .9; }
    const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ color: '#fff2da', size: .012, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const dust = new THREE.Points(dustGeo, dustMat); scene.add(dust);

    // ---- post ----
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W(), H()), .55, .4, .9);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ---- interaction ----
    const mouse = new THREE.Vector2(0, 0), m2 = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => { mouse.set(e.clientX / window.innerWidth - .5, e.clientY / window.innerHeight - .5); };
    window.addEventListener('pointermove', onMove, { passive: true });
    const onResize = () => {
      camera.aspect = W() / H(); camera.updateProjectionMatrix();
      renderer.setSize(W(), H()); composer.setSize(W(), H());
    };
    window.addEventListener('resize', onResize);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0, readySent = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
      const m = modeRef.current;

      (Object.keys(groups) as (keyof typeof groups)[]).forEach(k => {
        const g = groups[k];
        g.level += ((m === k ? 1 : 0) - g.level) * Math.min(1, dt * 3.2);
        const flick = g.level > .02 && g.level < .98 ? .85 + Math.random() * .15 : 1; // tiny "power-on" flicker
        const lv = g.level * flick;
        g.meshes.forEach(ms => ms.material.color.copy(warm).multiplyScalar(.03 + lv * 1.7));
        g.lights.forEach((l, i) => { l.intensity = g.base[i] * lv; });
      });
      ceilMat.emissiveIntensity = .004 + groups.contour.level * .045 + groups.lines.level * .02;
      const any = Math.max(groups.contour.level, groups.lines.level, groups.tracks.level);
      dustMat.opacity = any * .32;
      hemi.intensity = .03 + any * .55;
      dust.rotation.y = t * .012; dust.position.y = Math.sin(t * .2) * .05;
      
      railMat.opacity = Math.min(1, groups.tracks.level * 1.4);
      trackHW.visible = groups.tracks.level > .01;

      m2.lerp(mouse, Math.min(1, dt * 2.5));
      const s = window.scrollY / window.innerHeight;
      const still = reducedMotion ? 0 : 1;
      camera.position.set(camBase.x + still * (m2.x * .9 + Math.sin(t * .15) * .15), camBase.y + still * (-m2.y * .35 + s * .5), camBase.z - still * s * 1.4);
      camera.lookAt(target.x + still * m2.x * 1.4, target.y - still * m2.y * .4, target.z);
      composer.render();
      if (!readySent) { readySent = true; onReady?.(); }
    };
    loop();

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', onResize);
      composer.dispose(); renderer.dispose();
      scene.traverse(o => { const mm = o as THREE.Mesh; mm.geometry?.dispose(); const mat = mm.material as THREE.Material | undefined; mat?.dispose?.(); });
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className="l-scene" aria-hidden="true" />;
}

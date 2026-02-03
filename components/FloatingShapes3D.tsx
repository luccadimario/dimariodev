"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
    position: [number, number, number];
    color: string;
    speed: number;
    rotationAxis: "x" | "y" | "z";
    floatAmplitude: number;
    floatSpeed: number;
    initialRotation?: [number, number, number];
    mouseInfluence: number;
    mousePos: { x: number; y: number };
    scale?: number;
}

function FloatingBox({
    position,
    color,
    speed,
    rotationAxis,
    floatAmplitude,
    floatSpeed,
    initialRotation = [0, 0, 0],
    mouseInfluence,
    mousePos,
    scale = 1,
}: ShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = position[1];
    const time = useRef(Math.random() * 100);

    useFrame((_, delta) => {
        if (!meshRef.current) return;
        time.current += delta;

        meshRef.current.rotation[rotationAxis] += delta * speed;
        meshRef.current.position.y =
            initialY + Math.sin(time.current * floatSpeed) * floatAmplitude;

        const mouseX = (mousePos.x / window.innerWidth - 0.5) * mouseInfluence;
        const mouseY = (mousePos.y / window.innerHeight - 0.5) * mouseInfluence;
        meshRef.current.rotation.x += mouseY * delta * 0.5;
        meshRef.current.rotation.y += mouseX * delta * 0.5;
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={initialRotation}
            scale={scale}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.25}
            />
        </mesh>
    );
}

function FloatingOctahedron({
    position,
    color,
    speed,
    rotationAxis,
    floatAmplitude,
    floatSpeed,
    mouseInfluence,
    mousePos,
    scale = 1,
}: ShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = position[1];
    const time = useRef(Math.random() * 100);

    useFrame((_, delta) => {
        if (!meshRef.current) return;
        time.current += delta;

        meshRef.current.rotation[rotationAxis] += delta * speed;
        meshRef.current.position.y =
            initialY + Math.sin(time.current * floatSpeed) * floatAmplitude;

        const mouseX = (mousePos.x / window.innerWidth - 0.5) * mouseInfluence;
        const mouseY = (mousePos.y / window.innerHeight - 0.5) * mouseInfluence;
        meshRef.current.rotation.x += mouseY * delta * 0.3;
        meshRef.current.rotation.z += mouseX * delta * 0.3;
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <octahedronGeometry args={[0.6]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.2}
            />
        </mesh>
    );
}

interface SceneProps {
    mousePos: { x: number; y: number };
}

function Scene({ mousePos }: SceneProps) {
    const shapes = useMemo(
        () => [
            // Top right - large box
            {
                type: "box",
                position: [5, 2.5, -3] as [number, number, number],
                color: "#3f3f46",
                speed: 0.12,
                rotationAxis: "y" as const,
                floatAmplitude: 0.4,
                floatSpeed: 0.4,
                initialRotation: [0.8, 0, 0.8] as [number, number, number],
                mouseInfluence: 0.5,
                scale: 1.2,
            },
            // Top left - octahedron
            {
                type: "octahedron",
                position: [-5, 2, -2] as [number, number, number],
                color: "#3b82f6",
                speed: 0.18,
                rotationAxis: "z" as const,
                floatAmplitude: 0.35,
                floatSpeed: 0.5,
                mouseInfluence: 0.4,
                scale: 0.9,
            },
            // Middle right - box
            {
                type: "box",
                position: [6, 0, -2] as [number, number, number],
                color: "#8b5cf6",
                speed: 0.15,
                rotationAxis: "x" as const,
                floatAmplitude: 0.3,
                floatSpeed: 0.55,
                initialRotation: [0.5, 0.3, 0] as [number, number, number],
                mouseInfluence: 0.35,
                scale: 0.8,
            },
            // Middle left - small box
            {
                type: "box",
                position: [-6, -0.5, -1.5] as [number, number, number],
                color: "#52525b",
                speed: 0.2,
                rotationAxis: "z" as const,
                floatAmplitude: 0.25,
                floatSpeed: 0.6,
                initialRotation: [0.3, 0.6, 0.2] as [number, number, number],
                mouseInfluence: 0.3,
                scale: 0.7,
            },
            // Bottom right - octahedron
            {
                type: "octahedron",
                position: [4, -2.5, -2.5] as [number, number, number],
                color: "#3b82f6",
                speed: 0.22,
                rotationAxis: "y" as const,
                floatAmplitude: 0.3,
                floatSpeed: 0.65,
                mouseInfluence: 0.45,
                scale: 1,
            },
            // Bottom left - box
            {
                type: "box",
                position: [-4, -2, -3] as [number, number, number],
                color: "#8b5cf6",
                speed: 0.1,
                rotationAxis: "y" as const,
                floatAmplitude: 0.35,
                floatSpeed: 0.45,
                initialRotation: [0.4, 0.2, 0.5] as [number, number, number],
                mouseInfluence: 0.4,
                scale: 1.1,
            },
            // Far background - large subtle box
            {
                type: "box",
                position: [0, 1, -5] as [number, number, number],
                color: "#27272a",
                speed: 0.08,
                rotationAxis: "z" as const,
                floatAmplitude: 0.5,
                floatSpeed: 0.35,
                initialRotation: [0.7, 0.7, 0] as [number, number, number],
                mouseInfluence: 0.2,
                scale: 1.5,
            },
        ],
        [],
    );

    return (
        <>
            {shapes.map((shape, index) => {
                const props = {
                    position: shape.position,
                    color: shape.color,
                    speed: shape.speed,
                    floatAmplitude: shape.floatAmplitude,
                    floatSpeed: shape.floatSpeed,
                    mouseInfluence: shape.mouseInfluence,
                    mousePos,
                    scale: shape.scale,
                };

                if (shape.type === "box") {
                    return (
                        <FloatingBox
                            key={index}
                            {...props}
                            rotationAxis={shape.rotationAxis}
                            initialRotation={shape.initialRotation}
                        />
                    );
                }
                return (
                    <FloatingOctahedron
                        key={index}
                        {...props}
                        rotationAxis={shape.rotationAxis}
                    />
                );
            })}
        </>
    );
}

interface FloatingShapes3DProps {
    mousePos: { x: number; y: number };
}

export default function FloatingShapes3D({ mousePos }: FloatingShapes3DProps) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <Scene mousePos={mousePos} />
            </Canvas>
        </div>
    );
}

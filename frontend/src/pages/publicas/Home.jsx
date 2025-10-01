import React from "react";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20">
                <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold">SPARTAN GYM</div>
                    <div className="flex items-center gap-8">
                        <a href="#contacto" className="hover:text-red-500 transition-colors">Contacto</a>
                        <a href="#ubicacion" className="hover:text-red-500 transition-colors">Ubicación</a>
                        <a href="#planes" className="hover:text-red-500 transition-colors">Planes</a>
                    </div>
                    <button className="border border-white text-white hover:bg-white hover:text-black bg-transparent px-4 py-2 rounded">
                        Login
                    </button>
                </nav>
            </header>

            {/* panel */}
            <section className="pt-32 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    EL MEJOR GIMNASIO<br />DE DORREGO
                </h1>
                <button className="mt-12 bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg font-semibold rounded">
                    Inscríbete ahora
                </button>
            </section>

            <svg className="w-full h-16" viewBox="0 0 1200 100" preserveAspectRatio="none">
                <path d="M0,100 L200,20 L400,80 L600,20 L800,80 L1000,20 L1200,100 L1200,0 L0,0 Z" fill="#FF0000" />
            </svg>
            {/* seleccion de planes */}
            <section id="planes" className="py-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="bg-red-500 p-8 text-center rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">PLAN MENSUAL</h3>
                        <p className="text-4xl font-bold">$20.000</p>
                    </div>
                    <div className="bg-red-500 p-8 text-center rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">PLAN TRIMESTRAL</h3>
                        <p className="text-4xl font-bold">$50.000</p>
                    </div>
                    <div className="bg-red-500 p-8 text-center rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">PLAN ANUAL</h3>
                        <p className="text-4xl font-bold">$180.000</p>
                    </div>
                </div>
            </section>

            {/*separador */}
            <svg className="w-full h-8" viewBox="0 0 1200 40" preserveAspectRatio="none">
                <path d="M0,20 Q300,40 600,20 T1200,20 L1200,0 L0,0 Z" fill="#FF0000" />
            </svg>

            {/* galeria */}
            <section className="py-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <img src="./imagenes/gym-weights-equipment-dumbbells.jpg" alt="Gym weights" className="w-full h-80 object-cover rounded-lg" />
                        <h3 className="text-2xl font-bold text-center">Máquinas de Alta Calidad</h3>
                        <p className="text-lg text-center leading-relaxed">
                            Nuevas máquinas de última generación y alta calidad.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <img src="./imagenes/modern-gym-interior-with-mirrors-and-lighting.jpg" alt="Gym interior" className="w-full h-80 object-cover rounded-lg" />
                        <h3 className="text-2xl font-bold text-center">Luces Nuevas</h3>
                        <p className="text-lg text-center leading-relaxed">Renovación mensual de iluminación.</p>
                    </div>
                </div>
            </section>

            <div className="h-20"></div>
        </div>
    );
}
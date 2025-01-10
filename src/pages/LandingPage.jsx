import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { Bars3Icon, CheckCircleIcon } from "@heroicons/react/24/outline";
import heroImage from "../assets/hero-image.jpg";
import { useState } from "react";
import { CancelRounded } from "@mui/icons-material";

export default function LandingPage() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="bg-gray-100">
                <nav className="h-24">
                    <div className="container mx-auto flex h-full items-center justify-between px-4">
                        <Link href="#" className="flex items-center">
                            <img
                                src="./logo.png"
                                className="h-16 w-16 md:mr-4"
                                alt="Cerdas Financial"
                            />
                            <span className="hidden font-bold text-blue-900 md:inline">
                                Cerdas Financial
                            </span>
                        </Link>

                        <div className="hidden space-x-4 md:flex"></div>

                        <div className="md:hidden">
                            <PrimaryButton onClick={() => setOpen(true)}>
                                <Bars3Icon className="h-6 w-6" />
                            </PrimaryButton>
                        </div>

                        <div className="hidden space-x-4 md:block">
                            <PrimaryButton
                                as="link"
                                to="/login"
                                className="bg-transparent text-blue-600 hover:bg-transparent hover:text-blue-600"
                            >
                                Login
                            </PrimaryButton>
                            <PrimaryButton as="link" to="/register">
                                Register
                            </PrimaryButton>
                        </div>
                    </div>
                </nav>

                <header
                    className="px-4 py-20 md:py-40"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        backgroundBlendMode: "overlay",
                    }}
                >
                    <div className="mx-auto max-w-[600px]">
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-semibold text-white text-shadow">
                                Cerdas Financial, a More Secure Future!
                            </h1>
                            <p className="mb-8 text-lg text-gray-100 text-shadow">
                                A basic plan for individuals.
                            </p>
                            <PrimaryButton
                                as="link"
                                to="/login"
                                className="text-white"
                            >
                                Try For Free
                            </PrimaryButton>
                        </div>
                        <div className="flex-grow-0"></div>
                    </div>
                </header>

                <main>
                    <section className="container mx-auto py-20">
                        <h2 className="text-center text-2xl font-bold text-blue-600 shadow-blue-100 text-shadow-sm">
                            Why Important?
                        </h2>

                        <div className="mt-10 flex flex-wrap items-stretch justify-evenly">
                            <div className="max-w-96 rounded-md bg-white p-4 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Personal Financial Management Issues
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Many people have difficulty budgeting,
                                    saving, or managing debt wisely.
                                </p>
                            </div>
                            <div className="max-w-96 rounded-md bg-white p-4 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Lurking Financial Risks
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Increased access to online loans, online
                                    gambling and fraudulent investments endanger
                                    financial stability.
                                </p>
                            </div>
                            <div className="max-w-96 rounded-md bg-white p-4 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Lack of Easy-to-Understand Financial
                                    Education
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Information is often too complicated or
                                    irrelevant for the general public.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto py-20">
                        <h2 className="mb-4 text-center text-2xl font-bold text-blue-600 shadow-blue-100 text-shadow-sm">
                            Pricing
                        </h2>
                        <p className="text-center text-2xl font-bold">
                            A plan for every need
                        </p>
                        <p className="text-center text-gray-600">
                            Pariatur laborum dolor ea commodo sit aute aliquip
                            qui et cillum excepteur.
                        </p>

                        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-8">
                            <div className="max-w-60 rounded-2xl bg-blue-600 bg-gradient-to-b from-blue-900 to-blue-600 px-4 py-8 shadow-lg">
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            Individual
                                        </h3>
                                        <p className="mb-4 mt-2 text-gray-100">
                                            A basic plan for individuals.
                                        </p>

                                        <div className="mb-2 flex gap-x-2 text-white">
                                            <CheckCircleIcon className="inline-block h-6 w-6" />
                                            <p className="flex-1 text-sm">
                                                Access all courses within the
                                                learning program
                                            </p>
                                        </div>

                                        <div className="flex gap-x-2 text-white">
                                            <CheckCircleIcon className="inline-block h-6 w-6" />
                                            <p className="flex-1 text-sm">
                                                Earn a certificate upon
                                                completion
                                            </p>
                                        </div>
                                    </div>

                                    <PrimaryButton className="mt-8 rounded-lg border-2 border-blue-600 bg-white text-blue-600">
                                        Get Started
                                    </PrimaryButton>
                                </div>
                            </div>
                            <div className="max-w-60 rounded-md bg-white p-4 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Lurking Financial Risks
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Increased access to online loans, online
                                    gambling and fraudulent investments endanger
                                    financial stability.
                                </p>
                            </div>
                            <div className="max-w-60 rounded-md bg-white p-4 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Lack of Easy-to-Understand Financial
                                    Education
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Information is often too complicated or
                                    irrelevant for the general public.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-blue-600"></footer>
            </div>

            <div
                className={`fixed left-0 h-screen min-h-full w-full transition-all md:-top-full ${open ? "top-0 bg-gray-600 bg-opacity-40" : "-top-full"}`}
            >
                <div className="absolte left-0 top-0 w-full">
                    <div className="flex flex-col bg-white p-4 shadow-lg">
                        <PrimaryButton
                            className="self-end"
                            onClick={() => setOpen(false)}
                        >
                            <CancelRounded />
                        </PrimaryButton>
                        <div className="flex flex-col justify-end gap-4">
                            <PrimaryButton
                                as="link"
                                to="/login"
                                className="bg-transparent text-blue-600 hover:bg-transparent hover:text-blue-600"
                            >
                                Login
                            </PrimaryButton>
                            <PrimaryButton as="link" to="/register">
                                Register
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

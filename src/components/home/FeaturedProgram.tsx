import Image from "next/image";
import React, { ReactNode } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { CgScreen } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa";
import { IoFlash, IoLayers } from "react-icons/io5";
import { LuVideo } from "react-icons/lu";
import RedSpot from "../shared/RedSpot";
import FeaturedProgramImg from '../../../public/featuredProgramImg.png'

const FeaturedProgram = () => {
    const items = [
        {
            icon: <LuVideo className="icon" />,
            title: "Live Mentoring",
            description: "Weekly sessions with industry experts",
        },
        {
            icon: <FaRegClock className="icon" />,
            title: "100+ Hours",
            description: "Comprehensive curriculum and hands-on projects",
        },
        {
            icon: <CgScreen className="icon" />,
            title: "Final Showcase",
            description: "Present your work to industry professionals",
        },
        {
            icon: <BsBoxSeam className="icon transform -scale-x-100" />,
            title: "Tools Included",
            description: "Access to all software and AI tools needed",
        }
    ]

    return (
        <section
            id="programs"
            className="min-w-full mt-20 py-10 bg-[#050633]/50 shadow-[0_0px_4px_0px_rgba(0,0,0,0.4)]"
        >
            <div className="container mx-auto flex max-lg:flex-col justify-between items-center gap-5 px-2">
                <div className="flex flex-col justify-start items-start gap-8 flex-2">
                    {/* Header */}
                    <div className="flex flex-col justify-start items-start gap-4">
                        <div className="flex justify-start items-center gap-2">
                            <div className="w-10 h-0.5 bg-secondary-500" />
                            <div className="text-secondary-500 text-lg font-normal font-['Sen'] leading-relaxed">
                                Featured Program
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-4">
                            <h2 className="text-white text-4xl font-bold font-['Sen']">
                                Reconstructive Narratives Through Virtual Environments
                            </h2>
                            <p className="text-neutral-400 text-xl font-medium font-['Sen'] leading-loose">
                                Focus on storytelling through digital environments, AI modeling,
                                and virtual reconstructions. Our studio program provides hands-on
                                experience with cutting-edge tools and techniques for creating
                                immersive architectural narratives.
                            </p>
                        </div>
                    </div>
                    {/* Features Grid */}
                    <div className="flex max-md:flex-col justify-stretch items-center max-md:w-full gap-4">
                        <div className="flex flex-col gap-4 items-center justify-center max-md:w-full min-h-full">
                            {items.slice(0, 2).map((item, index) => (
                                <FeaturedItem
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center max-md:w-full min-h-full">
                            {items.slice(2).map((item, index) => (
                                <FeaturedItem
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </div>
                    </div>
                    {/* CTA */}
                    <button className="h-14 max-lg:w-full px-6 py-4 bg-secondary-500 hover:bg-secondary-800 text-white rounded-full flex justify-center items-center">
                        Apply Now - limited seat
                    </button>
                </div>
                <div className="relative w-full mx-auto flex-1">
                    <Image
                        src="/FeaturedProgramImg.png"
                        alt="Hero"
                        className="rounded-3xl object-cover mx-auto max-lg:w-full max-md:w-[270px]"
                        width={467}
                        height={584}
                    />
                    <div className="absolute flex items-center justify-center gap-2 p-2 top-7 -left-7 max-md:-left-1 h-9 bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 outline-1 ou  rounded-5 ">
                        <IoFlash className='icon' />
                        <p className='text-sm text-white font-bold'>Reconstruction in Progress</p>
                    </div>
                    <div className="absolute flex items-center justify-center gap-2 p-2 bottom-1/4 -right-7 max-md:-right-1 h-9 bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 outline-1 ou  rounded-5 ">
                        <IoLayers className='icon' />
                        <p className='text-sm text-white font-bold'>Historical Layers: 5</p>
                    </div>
                    <div className="absolute flex items-center justify-center gap-2 p-2 bottom-5 -left-7 max-md:-left-1 h-9 bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 outline-1 ou  rounded-5 ">
                        <LuVideo className='icon' />
                        <div className="flex flex-col gap-1">
                            <p className='text-xs text-white font-bold'>Next Cohort</p>
                            <p className='text-xs text-white font-bold'>September 15, 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturedItem = ({ icon, title, description }: { icon: ReactNode, title: string, description: string }) => {
    return (
        <div className="relative p-2 bg-white/10 rounded-4 w-full h-full backdrop-blur-2xl flex items-center gap-3 overflow-hidden">
            <div className="absolute top-0 right-0 flex justify-center items-center -z-10">
                <div className="h-14 w-14 bg-radial from-[#FB5607] to-[#FB560701] rounded-full blur-2xl opacity-70" />
            </div>

            <div className="w-12 h-12 bg-secondary-20 shrink-0 rounded-full flex items-center justify-center">
                {icon}
            </div>

            <div className="flex flex-col">
                <div className="text-white text-base font-bold font-['Sen'] leading-normal">
                    {title}
                </div>
                <div className="text-neutral-300 text-sm font-medium font-['Sen'] leading-tight lg:whitespace-nowrap">
                    {description}
                </div>
            </div>
        </div>
    )
};

export default FeaturedProgram;

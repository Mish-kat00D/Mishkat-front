import React from 'react'
import Image from 'next/image'
import DiscordIco from '../../../public/Discord.svg'
import { CiImageOn } from 'react-icons/ci';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Discord = () => {
  // channels
  const channels = [
    {
      section: "TEXT CHANNELS",
      topics: [
        {name:"welcome", isOpen: true, hasNotification: false},
        {name:"announcements", isOpen: false, hasNotification: false},
        {name:"general", isOpen: false, hasNotification: false},
      ],
    },
    {
      section: "Learning",
      topics: [
        {name:"ai-help", isOpen: false, hasNotification: false},
        {name:"project-collabs", isOpen: false, hasNotification: false},
        {name:"resources", isOpen: false, hasNotification: false},
      ],
    },
    {
      section: "Mentorship",
      topics: [
        {name:"mentors-lounge", isOpen: false, hasNotification: true},
        {name:"portfolio-review", isOpen: false, hasNotification: false},
        {name:"career-advice", isOpen: false, hasNotification: false},
      ],
    },
  ];

  // messages
  const messages = [
    {
      name: "Dr. Nadia Ibrahim",
      role: "Mentor",
      date: "Today at 2:45 PM",
      message:
        "I'll be hosting a live session on parametric design with AI today at 4 PM. Join the voice channel if you're interested!\nWe'll be covering the latest techniques for generating complex facades using the new tools we discussed last week.",
      file: null,
    },
    {
      name: "Khalid Al-Mansour",
      role: "Student",
      date: "Today at 2:50 PM",
      message:
        "I'll definitely be there! I've been experimenting with the workflow you shared last time and have some results to show.",
      file: "facade-experiment-v3.jpg",
    },
    {
      name: "Prof. Tariq Zayed",
      role: "Mentor",
      date: "Today at 3:05 PM",
      message:
        "Great work, Khalid! I like how you've integrated the environmental analysis into the generative process.\n@Leila Farooq I saw your question about the environmental analysis integration. Let's discuss it during today's session.",
      file: null,
    },
    {
      name: "Leila Farooq",
      role: "Student",
      date: "Today at 3:10 PM",
      message:
        "Thank you, Professor! I'll prepare my questions for the session. Really looking forward to it.",
      file: null,
    },
    {
      name: "Dr. Amir Khalil",
      role: "Mentor",
      date: "Today at 3:05 PM",
      message:
        "Awesome job, Amir! I appreciate how you've woven the environmental assessment into the creative workflow.\n@Sara Khan I noticed your inquiry regarding the integration of the environmental assessment. Let's chat about it in today's meeting.",
      file: null,
    },
    {
      name: "Liam Foster",
      role: "Student",
      date: "Today at 3:10 PM",
      message:
        "Thanks a lot, Professor! I'll get my questions ready for the meeting. Can't wait for it!",
      file: null,
    },
    {
      name: "Ethan Carter",
      role: "Student",
      date: "Today at 3:10 PM",
      message:
        "Thanks a lot, Professor! I'll get my questions ready for the meeting. Can't wait for it!",
      file: null,
    },
  ];

  return (
    <div className="self-stretch lg:pr-6 bg-primary-1000 rounded-2xl shadow-[0px_4px_25px_1px_rgba(0,0,0,0.35)] flex flex-col lg:flex-row justify-start items-center gap-6 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex w-80 h-[892px] px-4 py-6 bg-primary-900 flex-col justify-start items-start gap-10 overflow-hidden">
        {/* Logo */}
        <div className="self-stretch h-9 flex justify-between items-center gap-2">
          <Image src={DiscordIco} alt="discord" className="w-10 h-7" />
          <div className="text-center text-white text-2xl font-extrabold leading-9 text-nowrap">
            Mishkat Community
          </div>
        </div>

        {/* Channels */}
        {channels.map((channel, index) => (
          <Channel key={index} title={channel.section} topics={channel.topics} />
        ))}
      </div>

      {/* Chat Area */}
      <div className="w-full lg:w-[628px] flex-1 flex flex-col justify-between items-start self-stretch gap-4 py-6">
        {/* Header */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="h-10 p-2 rounded-lg flex justify-start items-center gap-2.5">
            <div className="text-violet-200 text-sm font-bold leading-tight"># </div>
            <div className="text-violet-200 text-base font-semibold leading-normal">mentors-lounge</div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="text-violet-200 text-base font-semibold leading-normal">42 Online</div>
            <Ping />
          </div>
        </div>

        {/* Messages */}
        <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-8">
          {
            messages.map((message, index) => <Message key={index} name={message.name} role={message.role as 'Mentor' | 'Student'} date={message.date} message={message.message} file={message.file} />)
          }
        </div>

        {/* Input */}
        <div className="self-stretch px-4 py-3 bg-primary-800 rounded-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.40)] outline-1 outline-indigo-300/10 inline-flex justify-between items-center gap-2">
          <input
            type="text"
            placeholder="Message #mentors-lounge"
            className="flex-1 bg-transparent text-primary-100 text-xs outline-none placeholder-primary-200"
          />
          <div className="flex justify-center items-center gap-2">
            <IoIosAddCircleOutline className="w-6 h-6 text-primary-100 cursor-pointer" />
            <BsEmojiSmile className="w-6 h-6 text-primary-100 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

const Channel = ({title, topics}: {title: string, topics: {name: string, isOpen: boolean, hasNotification: boolean}[]}) => {
  return <div className="self-stretch flex flex-col justify-start items-start gap-3">
    <div className="self-stretch text-primary-200 text-base font-bold leading-normal">
      {title}
    </div>
    <div className="self-stretch flex flex-col justify-start items-start gap-4">
      {topics.map((topic, index) => 
        <div key={index} className={`self-stretch p-2 ${topic.isOpen && 'bg-primary-800'} hover:bg-primary-800 rounded-lg inline-flex justify-start items-center gap-2.5`}>
          <div className="text-violet-200 text-sm font-bold leading-tight ml-1"># </div>
          <div className="text-violet-200 text-sm font-semibold leading-tight">{topic.name}</div>
          {topic.hasNotification && (
            <Ping />
          )}
        </div>
      )}
    </div>
  </div>
}

const Ping = () => {
  return (
    <span className="relative flex ml-auto">
      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-secondary-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
    </span>
  )
}

const Message = ({name, role, date, message, file}: {name: string, role: 'Mentor' | 'Student', date: string, message: string, file: string | null}) => {
  return (
    <div className="self-stretch inline-flex justify-start items-start gap-2.5">
      <Image alt={name} className="w-8 h-8 p-2 rounded-full" unoptimized width={40} height={40} src={"https://placehold.co/32x32"} ></Image>
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
        <div className="flex justify-start items-center flex-wrap gap-2">
          <div className={`${role === 'Mentor' ? 'text-secondary-500' : 'text-white'} text-sm font-bold leading-tight`}>{name}</div>
          <div className={`h-4 px-2 py-1 ${role === 'Mentor' ? 'bg-secondary-10' : 'bg-primary-700/50'} rounded-full flex justify-center items-center gap-2`}>
            <div className={`${role === 'Mentor' ? 'text-secondary-500' : 'text-primary-100'} text-xs`}>{role}</div>
          </div>
          <div className="text-violet-200 text-xs">{date}</div>
        </div>
        <div className="text-neutral-100 text-xs max-w-11/12">{message}</div>
        {file && (
          <div className="w-full flex items-center justify-start gap-2 rounded-4 px-2 py-1 bg-primary-800">
            <CiImageOn className='w-4 h-4 text-primary-100' />
            <p className="text-white text-[10px]">{file}</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Discord
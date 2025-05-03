'use client'

import { ThemeContext } from '@/providers/ThemeProvider'
import { motion, useAnimation, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useRef } from 'react'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { GlowingEffect } from './ui/glowing-effect'
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaBrain,
  FaUsers,
  FaLightbulb,
  FaTasks,
  FaClock,
  FaComments,
} from 'react-icons/fa'
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiBootstrap,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiStripe,
  SiJson,
  SiMongoose,
} from 'react-icons/si'
import ClientOnly from './ClientOnly'

const World = dynamic(() => import('./ui/globe').then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='animate-pulse flex flex-col items-center'>
        <div className='w-40 h-40 rounded-full bg-blue-500/20'></div>
        <div className='mt-4 text-sm text-slate-500'>
          Loading visualization...
        </div>
      </div>
    </div>
  ),
})
interface SkillCardProps {
  icon: React.ReactNode
  name: string
  level: number
  color: string
  index?: number // Make index optional to avoid errors
}

const SkillCard = ({ icon, name, level, color, index }: SkillCardProps) => {
  const { theme } = useContext(ThemeContext)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: (index ?? 0) * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow:
          theme === 'dark'
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 },
      }}
      className={`rounded-xl p-5 flex flex-col items-center justify-center gap-3 border relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-700'
          : 'bg-white/90 hover:bg-slate-50 border-slate-200'
      } backdrop-blur-sm transition-all duration-300`}
    >
      {/* Glowing effect container */}
      <div className='absolute inset-0 -z-10'>
        <GlowingEffect
          blur={20}
          disabled={false}
          glow={true}
          borderWidth={2}
          spread={40}
          movementDuration={2}
          variant={theme === 'dark' ? 'default' : 'white'}
        />
      </div>

      <motion.div
        className='text-5xl'
        style={{ color }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.15,
          rotate: 5,
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
      >
        {icon}
      </motion.div>

      <h3 className='font-semibold mt-1'>{name}</h3>

      <div className='w-full bg-gray-300/30 rounded-full h-1.5 dark:bg-gray-700/40 overflow-hidden'>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: (index ?? 0) * 0.1 + 0.3,
            ease: 'easeOut',
          }}
          className='h-1.5 rounded-full relative'
          style={{ backgroundColor: color }}
        >
          {/* Animated glow effect for progress bar */}
          <motion.div
            className='absolute top-0 right-0 h-full w-5 rounded-full'
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              filter: 'blur(2px)',
            }}
            animate={{
              x: ['-100%', '400%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: (index ?? 0) * 0.2 + 1,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const SoftSkillCard = ({
  icon,
  name,
  color,
  index,
}: {
  icon: React.ReactNode
  name: string
  color: string
  index?: number
}) => {
  const { theme } = useContext(ThemeContext)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: (index ?? 0) * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow:
          theme === 'dark'
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 },
      }}
      className={`rounded-xl p-4 flex items-center gap-4 border relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-700'
          : 'bg-white/90 hover:bg-slate-50 border-slate-200'
      } backdrop-blur-sm transition-all duration-300`}
    >
      <motion.div
        className='text-3xl'
        style={{ color }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.15,
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      >
        {icon}
      </motion.div>
      <h3 className='font-medium'>{name}</h3>
    </motion.div>
  )
}

const softSkills = [
  { icon: <FaBrain />, name: 'Problem Solving', color: '#3B82F6' },
  { icon: <FaUsers />, name: 'Team Collaboration', color: '#10B981' },
  { icon: <FaLightbulb />, name: 'Creativity', color: '#F59E0B' },
  { icon: <FaTasks />, name: 'Project Management', color: '#8B5CF6' },
  { icon: <FaClock />, name: 'Time Management', color: '#EC4899' },
  { icon: <FaComments />, name: 'Communication', color: '#14B8A6' },
]

interface SkillCategoryProps {
  title: string
  children: React.ReactNode
  index: number
}

const SkillCategory = ({ title, children, index }: SkillCategoryProps) => {
  const { theme } = useContext(ThemeContext)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{
        duration: 0.5,
        delay: index * 0.3,
        type: 'spring',
        stiffness: 100,
      }}
      className='w-full mb-12'
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 120,
        }}
        className={`text-xl font-bold mb-6 flex items-center ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '2rem' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`inline-block h-0.5 mr-3 ${
            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
          }`}
        ></motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {title}
        </motion.span>
      </motion.h3>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {React.Children.map(children, (child, i) => {
          if (React.isValidElement<SkillCardProps>(child)) {
            return React.cloneElement(child, { index: i })
          }
          return child
        })}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const { theme } = useContext(ThemeContext)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [isInView, controls])

  const globeConfig = {
    pointSize: 4.5,
    globeColor: theme === 'dark' ? '#062056' : '#2a4d8f',
    showAtmosphere: true,
    atmosphereColor: theme === 'dark' ? '#FFFFFF' : '#e8f0ff',
    atmosphereAltitude: theme === 'dark' ? 0.12 : 0.13,
    emissive: theme === 'dark' ? '#062056' : '#2a4d8f',
    emissiveIntensity: theme === 'dark' ? 0.15 : 0.08,
    shininess: theme === 'dark' ? 0.9 : 0.7,
    polygonColor:
      theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)',
    ambientLight: theme === 'dark' ? '#38bdf8' : '#cce0ff',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: theme === 'dark' ? '#ffffff' : '#f5f5f5',
    arcTime: 1000,
    arcLength: 0.9,
    rings: theme === 'dark' ? 1 : 2,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
    preserveDrawingBuffer: true,
    antialias: true,
  }

  const colors =
    theme === 'dark'
      ? ['#06b6d4', '#3b82f6', '#6366f1']
      : ['#0369a1', '#2563eb', '#4f46e5']

  // Helper function to safely get a random color
  const getRandomColor = (): string => {
    // Safely get a random color from the colors array
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: getRandomColor(),
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: getRandomColor(),
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: getRandomColor(),
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: getRandomColor(),
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: getRandomColor(),
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: getRandomColor(),
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: getRandomColor(),
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: getRandomColor(),
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: getRandomColor(),
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: getRandomColor(),
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: getRandomColor(),
    },
  ]

  const words =
    'I build modern web solutions using industry-standard technologies, focusing on performance optimization, clean architecture, and exceptional user experiences.'

  return (
    <div
      className={
        theme === 'dark'
          ? 'flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white py-24'
          : 'flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black py-24'
      }
      id='skills'
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.7 }}
        className='max-w-7xl mx-auto w-11/12 relative z-10'
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
          className='text-center mb-16'
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
            className='text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 mb-4'
          >
            Technical Expertise
          </motion.h2>
          <div
            className={`text-center text-base md:text-lg font-normal ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            } max-w-3xl mx-auto`}
          >
            <TextGenerateEffect words={words} />
          </div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
          <div className='col-span-1 lg:col-span-3 order-2 lg:order-1'>
            <SkillCategory title='Frontend Development' index={0}>
              <SkillCard
                icon={<FaReact />}
                name='React JS'
                level={92}
                color='#61DAFB'
              />
              <SkillCard
                icon={<SiNextdotjs />}
                name='Next JS'
                level={85}
                color='#000000'
              />
              <SkillCard
                icon={<SiJavascript />}
                name='JavaScript ES6'
                level={88}
                color='#F7DF1E'
              />
              <SkillCard
                icon={<SiTypescript />}
                name='TypeScript'
                level={75}
                color='#3178C6'
              />
              <SkillCard
                icon={<SiRedux />}
                name='Redux'
                level={78}
                color='#764ABC'
              />
            </SkillCategory>

            <SkillCategory title='Backend Development' index={1}>
              <SkillCard
                icon={<FaNodeJs />}
                name='Node JS'
                level={80}
                color='#339933'
              />
              <SkillCard
                icon={<SiExpress />}
                name='Express JS'
                level={75}
                color='#000000'
              />
              <SkillCard
                icon={<SiMongodb />}
                name='MongoDB'
                level={82}
                color='#47A248'
              />
              <SkillCard
                icon={<SiMongoose />}
                name='Mongoose'
                level={80}
                color='#880000'
              />
              <SkillCard
                icon={<SiJson />}
                name='REST API'
                level={85}
                color='#000000'
              />
            </SkillCategory>

            <SkillCategory title='UI Frameworks & Styling' index={2}>
              <SkillCard
                icon={<SiTailwindcss />}
                name='TailwindCSS'
                level={90}
                color='#06B6D4'
              />
              <SkillCard
                icon={<SiBootstrap />}
                name='Bootstrap'
                level={85}
                color='#7952B3'
              />
              <SkillCard
                icon={<FaHtml5 />}
                name='HTML 5'
                level={95}
                color='#E34F26'
              />
              <SkillCard
                icon={<FaCss3Alt />}
                name='CSS 3'
                level={90}
                color='#1572B6'
              />
              <SkillCard
                icon={<SiStripe />}
                name='Stripe'
                level={70}
                color='#008CDD'
              />
            </SkillCategory>

            <SkillCategory title='DevOps & Deployment' index={3}>
              <SkillCard
                icon={<FaGithub />}
                name='Github'
                level={88}
                color='#181717'
              />
              <SkillCard
                icon={<FaGitAlt />}
                name='Git'
                level={85}
                color='#F05032'
              />
              <SkillCard
                icon={<SiVercel />}
                name='Vercel'
                level={80}
                color='#000000'
              />
              <SkillCard
                icon={<SiNetlify />}
                name='Netlify'
                level={78}
                color='#00C7B7'
              />
              <SkillCard
                icon={<SiFirebase />}
                name='Firebase'
                level={75}
                color='#FFCA28'
              />
            </SkillCategory>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, delay: 0.3 }}
            className='col-span-1 lg:col-span-2 order-1 lg:order-2 flex flex-col items-center'
          >
            {/* Globe Container */}
            <div className='sticky top-20 self-start w-full mb-8'>
              <motion.div
                suppressHydrationWarning
                className='w-full aspect-square max-h-[500px] relative rounded-full overflow-hidden shadow-lg'
                animate={{
                  boxShadow: [
                    '0 0 10px 2px rgba(59, 130, 246, 0.3)',
                    '0 0 20px 2px rgba(59, 130, 246, 0.4)',
                    '0 0 10px 2px rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className={
                    theme === 'dark'
                      ? 'absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-black z-10'
                      : 'absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-white z-10'
                  }
                />
                <div suppressHydrationWarning className='w-full h-full'>
                  <ClientOnly>
                    {() => (
                      <World
                        key={theme}
                        data={sampleArcs}
                        globeConfig={{
                          ...globeConfig,
                        }}
                      />
                    )}
                  </ClientOnly>
                </div>
              </motion.div>
            </div>

            {/* Soft Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className='w-full'
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 120,
                }}
                className={`text-xl font-bold mb-6 flex items-center ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '2rem' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`inline-block h-0.5 mr-3 ${
                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                  }`}
                ></motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Soft Skills
                </motion.span>
              </motion.h3>
              <div className='grid grid-cols-1 gap-3'>
                {softSkills.map((skill, index) => (
                  <SoftSkillCard
                    key={skill.name}
                    icon={skill.icon}
                    name={skill.name}
                    color={skill.color}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated background decorations */}
      <motion.div
        className='absolute top-1/3 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20'
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute bottom-1/3 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20'
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className='absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10'
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </div>
  )
}

export default Skills

import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext } from 'react'
import profileImage from '../assets/images/profile-pic2.jpg'
import Image from 'next/image'
import { Meteors } from './ui/meteors'
import { Button } from './ui/moving-border'
import Link from 'next/link'
import { AiFillInstagram } from 'react-icons/ai'
import {
  IoIosCheckmarkCircleOutline,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoLinkedin,
} from 'react-icons/io'
import { LinkPreview } from './ui/link-preview'
import { motion } from 'framer-motion'
import { SparklesCore } from './ui/sparkles'
import { BackgroundGradient } from './ui/background-gradient'
import { TextGenerateEffect } from './ui/text-generate-effect'

const AboutMe = () => {
  const { theme } = useContext(ThemeContext)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const whoAmI =
    "I'm born and raised in beautiful Bangladesh 🇧🇩 & I'm a MERN-Stack Developer with experience in building web applications. I'm passionate about learning new technologies and building new things. I'm also a problem solver and have a good understanding of web technologies."

  return (
    <div
      className={
        theme === 'dark'
          ? 'flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white'
          : 'flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black'
      }
      id='about_me'
    >
      <div className='relative w-full'>
        {/* Animated background elements */}
        <div className='absolute inset-0 w-full h-full'>
          <SparklesCore
            id='aboutMeSparks'
            background='transparent'
            minSize={0.4}
            maxSize={1}
            particleDensity={40}
            className='w-full h-full'
            particleColor={theme === 'dark' ? '#ffffff' : '#000000'}
          />
        </div>

        <motion.div
          className='relative z-10 my-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className='text-center lg:text-6xl md:text-4xl text-2xl font-bold'>
            About Me
          </h2>
        </motion.div>
      </div>

      <motion.div
        className='w-11/12 mx-auto max-w-7xl flex gap-8 justify-center flex-col md:flex-row items-center md:items-stretch'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <motion.div
          variants={itemVariants}
          className={
            theme === 'dark'
              ? 'flex flex-col items-center justify-center w-full md:w-5/12 bg-gray-950/60 backdrop-blur-sm py-8 md:py-16 px-4 rounded-3xl relative overflow-hidden border border-gray-800 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300'
              : 'flex flex-col items-center justify-center w-full md:w-5/12 bg-gray-100/60 backdrop-blur-sm py-8 md:py-16 px-4 rounded-3xl relative overflow-hidden border border-gray-200 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300'
          }
        >
          {/* Position meteors as the first element so it appears behind everything */}
          <div className='absolute inset-0 w-full h-full'>
            <Meteors number={20} />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className='relative z-20'
          >
            <Image
              src={profileImage}
              className='mask mask-squircle w-48 z-20'
              alt='Rafi Ferdos'
            />
          </motion.div>

          <motion.h1
            className='text-xl md:text-2xl lg:text-4xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 relative z-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Rafi Ferdos
          </motion.h1>

          <motion.p
            className='opacity-70 mb-8 relative z-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            rafiferdos@gmail.com
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className='relative z-20'
          >
            <Link
              href='https://drive.google.com/file/d/1Yv3WJtdwqYOJ3t7uq7GbKz6ByevbA8zC/view?usp=sharing'
              target='_blank'
            >
              <Button className='animate-shimmer'>
                Resume
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className='divider mt-8 opacity-70 relative z-20'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Social Links
          </motion.div>

          <motion.div
            className='flex items-center justify-center gap-5 relative z-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { href: 'https://github.com/rafiferdos', icon: <IoLogoGithub /> },
              {
                href: 'https://facebook.com/rafiferdos2',
                icon: <IoLogoFacebook />,
              },
              {
                href: 'https://linkedin.com/in/rafiferdos',
                icon: <IoLogoLinkedin />,
              },
              {
                href: 'https://instagram.com/rafiferdos/',
                icon: <AiFillInstagram />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={
                  theme === 'dark'
                    ? 'p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors'
                    : 'p-3 bg-gray-200 rounded-full hover:bg-blue-400 transition-colors'
                }
              >
                <Link href={item.href} target='_blank' className='text-2xl'>
                  {item.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className='flex flex-col w-full md:w-7/12 gap-8'
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className={
              theme === 'dark'
                ? 'flex flex-col w-full bg-gray-950/60 backdrop-blur-sm py-7 px-4 md:px-12 lg:px-16 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300'
                : 'flex flex-col w-full bg-gray-100/60 backdrop-blur-sm py-7 px-4 md:px-12 lg:px-16 rounded-3xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300'
            }
          >
            <h1 className='text-xl md:text-2xl text-left lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
              Who am I?
            </h1>

            <motion.div
              className={
                theme === 'dark'
                  ? 'flex items-center my-5 text-green-400 gap-1'
                  : 'flex items-center my-5 text-green-700 gap-1'
              }
              whileHover={{ x: 5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 2,
                }}
              >
                <IoIosCheckmarkCircleOutline className='text-xl' />
              </motion.div>
              <p>Open to Work</p>
            </motion.div>

            <div className='text-start opacity-80'>
              <TextGenerateEffect words={whoAmI} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={
              theme === 'dark'
                ? 'flex flex-col w-full bg-gray-950/60 backdrop-blur-sm py-7 px-4 md:px-12 lg:px-16 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300'
                : 'flex flex-col w-full bg-gray-100/60 backdrop-blur-sm py-7 px-4 md:px-12 lg:px-16 rounded-3xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300'
            }
          >
            <h1 className='text-xl md:text-2xl text-left lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
              Education
            </h1>

            <motion.div
              className='my-6'
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm'
              >
                2022 - Present
              </motion.p>
              <h2 className='text-lg md:text-xl font-bold my-2'>BSc in CSE</h2>
              <LinkPreview
                url='https://daffodilvarsity.edu.bd/'
                className={
                  theme === 'dark'
                    ? 'text-blue-400 underline font-bold'
                    : 'text-blue-600 underline font-bold'
                }
              >
                Daffodil International University
              </LinkPreview>
              <p className='opacity-70 mt-2'>
                I&apos;m currently studying Computer Science & Engineering with
                my passion and dedication for become a full stack developer.
              </p>
            </motion.div>

            <motion.div
              className='my-6'
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm'
              >
                2018 - 2020
              </motion.p>
              <h2 className='text-lg md:text-xl font-bold my-2'>Science</h2>
              <LinkPreview
                url='https://nawabganjgovcollege.edu.bd/'
                className={
                  theme === 'dark'
                    ? 'text-blue-400 underline font-bold'
                    : 'text-blue-600 underline font-bold'
                }
              >
                Nawabganj Govt College
              </LinkPreview>
              <p className='opacity-70 mt-2'>
                Studied and completed my Higher Secondary School Certificate
                (HSC) in Science. With an amazing experience and memories of my
                college life.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutMe

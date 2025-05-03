import { Button } from './ui/moving-border'
import { BsSend } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'
import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

const Form = () => {
  const { theme } = useContext(ThemeContext)
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    emailjs
      .sendForm('service_kc0mm9g', 'template_iradfho', form.current!, {
        publicKey: 'R0RWxr4SyoqE60P6J',
      })
      .then(
        () => {
          toast.success('Message sent successfully!', {
            style: {
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              background:
                theme === 'dark'
                  ? 'rgba(30, 41, 59, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
              color: theme === 'dark' ? '#fff' : '#000',
              boxShadow:
                theme === 'dark'
                  ? '0 4px 6px rgba(0, 0, 0, 0.2)'
                  : '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
          })
          setFormData({ from_name: '', from_email: '', message: '' })
        },
        (error) => {
          toast.error('Failed to send message!', {
            style: {
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              background:
                theme === 'dark'
                  ? 'rgba(30, 41, 59, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
              color: theme === 'dark' ? '#fff' : '#000',
              boxShadow:
                theme === 'dark'
                  ? '0 4px 6px rgba(0, 0, 0, 0.2)'
                  : '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
          })
        }
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const inputClasses =
    theme === 'dark'
      ? 'w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
      : 'w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <motion.form
      ref={form}
      onSubmit={handleSend}
      className='flex flex-col gap-5 w-full max-w-md mx-auto px-4'
      variants={formVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.div variants={itemVariants}>
        <label className='block text-sm font-medium mb-1 ml-1 opacity-80'>
          Name
        </label>
        <input
          type='text'
          name='from_name'
          placeholder='John Doe'
          value={formData.from_name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className='block text-sm font-medium mb-1 ml-1 opacity-80'>
          Email
        </label>
        <input
          type='email'
          name='from_email'
          placeholder='john@example.com'
          value={formData.from_email}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className='block text-sm font-medium mb-1 ml-1 opacity-80'>
          Message
        </label>
        <textarea
          name='message'
          placeholder='Your message here...'
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      </motion.div>

      <motion.div variants={itemVariants} className='my-6 w-full flex justify-center'>
        <Button
          type='submit'
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          borderRadius='1rem'
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          {!isSubmitting && <BsSend />}
        </Button>
      </motion.div>

      <Toaster position='bottom-right' />
    </motion.form>
  )
}

export default Form

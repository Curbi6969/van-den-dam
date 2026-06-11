'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Wet-paint button: brand-red CTA with animated dripping paint.
// Renders an <a> when `href` is provided, otherwise a <button>.
type WetPaintButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
}

const WetPaintButton = ({ children, className, href }: WetPaintButtonProps) => {
  const content = (
    <>
      {children}
      <Drip left="10%" height={24} delay={0.5} />
      <Drip left="30%" height={20} delay={3} />
      <Drip left="57%" height={10} delay={4.25} />
      <Drip left="85%" height={16} delay={1.5} />
    </>
  )

  const classes = cn(
    'group relative inline-block rounded-md bg-secondary px-8 py-4 font-label font-semibold text-on-secondary transition-opacity hover:opacity-90 ambient-shadow',
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return <button className={classes}>{content}</button>
}

type DripProps = {
  left: string
  height: number
  delay: number
}

const Drip: React.FC<DripProps> = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {/* The main body of the drip */}
      <div style={{ height }} className="w-2 rounded-b-full bg-secondary" />

      {/* SVG for the right-side curve of the drip */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-secondary"
        />
      </svg>

      {/* SVG for the left-side curve of the drip */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-secondary"
        />
      </svg>

      {/* A smaller, detached droplet that falls */}
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-secondary"
      />
    </motion.div>
  )
}

export default WetPaintButton

import React from 'react'
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/button'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const MAIN_SOCIALS = [
    {
        name: "Github",
        icon: faGithub,
        link: "https://github.com/nonoro-official"

    },
    {
        name: "LinkedIn",
        icon: faLinkedin,
        link: "https://www.linkedin.com/in/noah-peñaranda-7b63ba356"
    },
    {
        name: "Email",
        icon: faEnvelope,
        link: "mailto:noah.c.penaranda@gmail.com"
    }
]

const Dock = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-max max-w-[90vw] h-14 bg-sidebar text-sidebar-foreground flex items-center gap-2 px-4 border border-sidebar-border rounded-xl shadow-lg backdrop-blur-md z-50">
        { /* github, linkedin, email links */}
            {MAIN_SOCIALS.map((social) => (
                <Button
                    key={social.name}
                    variant="ghost"
                    size="icon-lg"
                    asChild
                >
                    <a 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name}
                    >
                        <Icon icon={social.icon} size="xl" />
                    </a>
                </Button>
            ))}
    </div>
  )
}

export default Dock
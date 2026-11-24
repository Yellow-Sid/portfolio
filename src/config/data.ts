// Edit everything here. Replace the TODO values with your real details.
export const profile = {
  name: 'Sidhaant Pradhan', initials: 'SP',
  role: 'Software engineer in the making',
  headline: 'Building intelligent solutions through code.',
  intro: 'Final-year B.Tech CSE student who ships full-stack and real-time software, and enjoys the puzzle underneath every feature.',
  location: 'Roorkee, Uttarakhand, India', timeZone: 'Asia/Kolkata',
  status: 'Final-year B.Tech CSE, looking for SDE internships',
  email: 'your.email@example.com', // TODO
  github: 'https://github.com/your-username', // TODO
  linkedin: 'https://www.linkedin.com/in/your-username', // TODO
}
export const nav = ['Home', 'About', 'Projects', 'Skills', 'Contact']
export const about = [
  'I study Computer Science Engineering at Roorkee Institute of Technology and spend most of my time building things end to end: a React front end, a Node or FastAPI service behind it, and the data layer that holds it together.',
  'I like problems where the interesting part is how pieces talk to each other: sockets, queues, graphs, caches. I start from the smallest version that works, then make it fast and clear.',
  'Away from the editor I play and make content around games, and I stay close to my roots in Manipur.',
]
export const interests = ['Full-stack web', 'Real-time systems', 'Applied ML', 'Data structures and algorithms']
export type Project = { name: string; tag: string; blurb: string; problem: string; stack: string[]; features: string[]; github?: string; live?: string }
export const projects: Project[] = [
  { name: 'LifeLane AI', tag: 'Emergency response', blurb: 'Smart emergency response and green corridor system.',
    problem: 'Ambulances lose minutes in traffic; clearing a route ahead of them saves lives.',
    stack: ['React', 'Node.js', 'Python'], features: ['TODO: describe key feature', 'TODO: describe key feature'], github: '#', live: undefined },
  { name: 'Fraud Detection', tag: 'Machine learning', blurb: 'Real-time, graph-based fraud detection.',
    problem: 'Fraud rings hide in relationships between accounts, which row-by-row checks miss.',
    stack: ['FastAPI', 'PostgreSQL', 'Redis'], features: ['TODO: describe key feature', 'TODO: describe key feature'], github: '#' },
  { name: 'SyncWatch', tag: 'Real-time', blurb: 'Watch together, in sync.',
    problem: 'Friends in different places struggle to start a video at the same second.',
    stack: ['React', 'Socket.IO', 'Node.js'], features: ['TODO: describe key feature', 'TODO: describe key feature'], github: '#' },
]
export const skills: Record<string, string[]> = {
  Languages: ['Java', 'JavaScript', 'Python', 'C++'],
  Frontend: ['React', 'HTML', 'CSS', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js', 'FastAPI'],
  Databases: ['MongoDB', 'PostgreSQL', 'Redis'],
  Tools: ['Git', 'GitHub', 'Linux', 'Docker'],
  Foundations: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
}

import Experience from "@/data/experience.json";
import Projects from "@/data/projects.json";

export default class InfoUtil {

    constructor() {}

    getAbout(): string {
        return `## Hey, I'm Pratheek 👋

Software Developer with 2+ years of experience in building scalable web applications, Microservices, REST API's and LLM integrations using Angular, FastAPI and Spring Boot.

Proficient in containerized deployments with Docker and Kubernetes, with a strong focus on clean, maintainable, and testable code. Experienced in collaborating across small and large agile teams to deliver high-quality, production-grade software.`;
    }

    getSkills(): string {
        return `**Languages:** Java, Python, TypeScript, JavaScript, SQL

**Frontend:** Angular, React.js, Next.js, HTML5, CSS3, Tailwind CSS

**Backend:** Spring Boot, FastAPI, Node.js, REST APIs, Microservices

**Databases:** PostgreSQL, MySQL, MongoDB

**DevOps & Tools:** Docker, Kubernetes, Helm, GitHub Workflow, CI/CD, Jenkins

**AI/ML:** LangChain, LangGraph, LLM Integrations, RAG, Generative AI`;
    }

    getContact(): string {
        return `You can reach me at: **+91 9206197044**

Email: [pratheek1101@gmail.com](mailto:pratheek1101@gmail.com)

LinkedIn: [https://www.linkedin.com/in/pratheek-achar-9a290a1b1](https://www.linkedin.com/in/pratheek-achar-9a290a1b1)

GitHub: [https://github.com/Pratheek11](https://github.com/Pratheek11)`;
    }

    getTrainedInfo(): string {
        return `## Chat Bot with Bag-of-Words NLP

A simple, fun chat bot implementation using basic **Bag-of-Words (BoW)** natural language processing. This is a lightweight intent classification system built for my portfolio to demonstrate conversational AI concepts.

### How It Works:

- Each word in the user's message is mapped to a unique numerical ID stored in a bagOfWords map.
- Messages are vectorized by converting words into their corresponding IDs (unknown words become -1).
- Intent matching uses an **overlap score algorithm**:
  - Counts matching keywords between the user query and known operation vectors.
  - Filters out unknown words to avoid noise.
  - Requires minimum overlap threshold to prevent false positives.
  - Returns the intent (GREET, ABOUT, PROJECTS, EXPERIENCE, CONTACT, TRAINED) with the highest match score.

### Features:

- Error handling for unrecognized queries
- Dynamic response rendering with HTML content

**Tech Stack:** React, TypeScript, Next.js, Custom Bag-of-Words NLP, Context API, Tailwind CSS

*This project demonstrates core NLP concepts in a simple, educational way while building a fun interactive chat experience! 🤖*`;
    }

    getExperience(): string {
        let experience = "";
        Experience.forEach((exp: any, index: number) => {
            experience += `### ${exp.role} at ${exp.company}\n\n*${exp.fromTo}*\n\n`;
            experience += exp.description
                .map((resp: string) => `- ${resp.replace(/^\s*-+\s*/, '')}`)
                .join(`\n`);
            experience += `\n\n`;
            if (index < Experience.length - 1) {
                experience += `---\n\n`;
            }
        });
        return experience;
    }

    getProjects(): string {
        let projects = "";
        Projects.forEach((proj: any, index: number) => {
            projects += `### ${proj.title}\n\n${proj.description}\n\n**Tech Stack:**\n`;
            projects += proj.tech.map((tech: string) => `- ${tech}`).join(`\n`);
            projects += `\n\n[View on GitHub](${proj.repo})\n\n`;
            if (index < Projects.length - 1) {
                projects += `---\n\n`;
            }
        });
        return projects;
    }

    getResume(): string {
        return `
            <div>
                <Button icon="pi pi-download" rounded text aria-label="Download Resume" />
                <a href="/pratheek.pdf" data-pr-tooltip="Resume"  download target="#" className="tooltip">
                    <i className="pi pi-file"></i>
                </a>
            </div>
        `;
    }
}
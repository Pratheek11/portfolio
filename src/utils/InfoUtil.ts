import Experience from "@/data/experience.json";
import Projects from "@/data/projects.json";

export default class InfoUtil {

    constructor() {}

    getAbout(): string {
        return `
            Hey, I'm Pratheek,
            <span style="cursor: grab;">
                👋
            </span>
            <br>
            <br>
            Software Developer with 2+ years of experience in building
            scalable web applications, Microservices, REST API's and LLM
            integrations using Angular, FastAPI and Spring Boot.
            Proficient in containerized deployments with Docker and
            Kubernetes, with a strong focus on clean, maintainable, and
            testable code. Experienced in collaborating across small and
            large agile teams to deliver high-quality, production-grade
            software.
        `;
    }

    getSkills(): string {
        return `
            <strong>Languages:</strong> Java, Python, TypeScript, JavaScript, SQL
            <br>
            <br>
            <strong>Frontend:</strong> Angular, React.js, Next.js, HTML5, CSS3, Tailwind CSS
            <br>
            <br>
            <strong>Backend:</strong> Spring Boot, FastAPI, Node.js, REST APIs, Microservices
            <br>
            <br>
            <strong>Databases:</strong> PostgreSQL, MySQL, MongoDB
            <br>
            <br>
            <strong>DevOps & Tools:</strong> Docker, Kubernetes, Helm, GitHub Workflow, CI/CD, Jenkins
            <br>
            <br>
            <strong>AI/ML:</strong> LangChain, LangGraph, LLM Integrations, RAG, Generative AI
            <br>
        `;
    }

    getContact(): string {
        return `
            You can reach me at: +91 9206197044
            <br>
            <br>
            Email: <a href="mailto:pratheek1101@gmail.com" style="color: #3b82f6; text-decoration: underline; cursor: pointer;">pratheek1101@gmail.com</a>
            <br>
            <br>
            LinkedIn: <a href="https://www.linkedin.com/in/pratheek-achar-9a290a1b1" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline; cursor: pointer;">https://www.linkedin.com/in/pratheek-achar-9a290a1b1</a>
            <br>
            <br>
            GitHub: <a href="https://github.com/Pratheek11" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline; cursor: pointer;">https://github.com/Pratheek11</a>
        `;
    }

    getTrainedInfo(): string {
        return `
            <strong>Chat Bot with Bag-of-Words NLP</strong>
            <br>
            <br>
            A simple, fun chat bot implementation using basic <strong>Bag-of-Words (BoW)</strong> natural language processing. This is a lightweight intent classification system built for my portfolio to demonstrate conversational AI concepts.
            <br>
            <br>
            <strong>How It Works:</strong>
            <br>
            • Each word in the user's message is mapped to a unique numerical ID stored in a bagOfWords map.
            <br>
            • Messages are vectorized by converting words into their corresponding IDs (unknown words become -1).
            <br>
            • Intent matching uses an <strong>overlap score algorithm</strong>:
            <br>
            &nbsp;&nbsp;- Counts matching keywords between the user query and known operation vectors.
            <br>
            &nbsp;&nbsp;- Filters out unknown words to avoid noise.
            <br>
            &nbsp;&nbsp;- Requires minimum overlap threshold to prevent false positives.
            <br>
            &nbsp;&nbsp;- Returns the intent (GREET, ABOUT, PROJECTS, EXPERIENCE, CONTACT, TRAINED) with the highest match score.
            <br>
            <br>
            <strong>Features:</strong>
            <br>
            • Error handling for unrecognized queries
            <br>
            • Dynamic response rendering with HTML content
            <br>
            <br>
            <strong>Tech Stack:</strong> React, TypeScript, Next.js, Custom Bag-of-Words NLP, Context API, Tailwind CSS
            <br>
            <br>
            <em>This project demonstrates core NLP concepts in a simple, educational way while building a fun interactive chat experience! 🤖</em>
        `;
    }

    getExperience(): string {
        let experience = "";
        Experience.forEach((exp: any) => {
            experience += `
                <strong>${exp.role}</strong> at <strong>${exp.company}</strong>
                <br>
                <em>${exp.fromTo}</em>
                <br>
                <ul>
            `;
            exp.description.forEach((resp: string) => {
                experience += `<li style="margin: 4px;">* ${resp}</li>`;
            });
            experience += `
                </ul>
                <br>
            `;
        });
        return experience;
    }

    getProjects(): string {
        let projects = "";
        Projects.forEach((proj: any) => {
            projects += `
                <h3>${proj.title}</h3>
                <em>${proj.description}</em>
                <br>
                <ul>
            `;
            proj.tech.forEach((desc: string) => {
                projects += `<li style="margin: 4px;">* ${desc}</li>`;
            });
            projects += `
                </ul>
                <a href="${proj.repo}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline; cursor: pointer;">${proj.repo}</a>
                <br>
                <br>
            `;
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
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Tell Express where the EJS files are located
app.set("views", path.join(__dirname, "views"));

// Serve static files such as CSS, JavaScript and images
app.use(express.static(path.join(__dirname, "public")));

// Parse form submissions (we'll use this for the Contact page)
app.use(express.urlencoded({ extended: true }));

// ================= HOME PAGE =================

app.get("/", (req, res) => {
    res.render("index", {
        activePage: "home"
    });
});

// ================= ABOUT PAGE =================

app.get("/about", (req, res) => {
    res.render("about", { activePage: "about" });
});

// PROJECT DATA for portfolio

const projects = [
    {
        slug: "brainhack",
        title: "Phishing Story",
        category: "Competitions",
        description: "An educational point-and-click adventure game to inform users of scams & how to avoid them",
        technologies: ["CSS", "JavaScript", "Express"],
        image: "/images/phishing.png",
        githubURL: null,

        overview: "This project aims to provide a fun, engaging way for youth to become informed & avoid becoming victims of scams in the future.",

        role: "I was in charge of developing the 3rd scenario of the game, including story writing, coding & visuals (though I had assistance from other members for the design)",

        problem: "To help young Singaporeans actively fight online manipulation and build a more informed and caring online community.",

        solution: "We chose to develop a game, as it is more likely to catch the attention of youth than regular apps. In there, we encourage players to make decisions when put in a scam scenario and to report such incidents to help the community.",

        learning: "The most important thing I learnt was Time Management as I had to juggle my regular coursework with the competition & deal with the high pressure I faced for an extended period of time. I also learned many things in advance of my coursework, such as building wireframes, using Adobe Illustrator, EJS etc."
    },

    {
        slug: "software-app",
        title: "SkillSwap App",
        category: "Web Application",
        description: "An App to find people to conduct Skill Exchanges",
        technologies: ["JavaScript", "Express", "CSS", "SQL"],
        image: "/images/skill.png",
        githubURL: "https://github.com/25039766-AmirBak/C237_CA2_Project",

        overview: "A Web Application designed to make Skill Exchanges more convenient.",

        role: "I was in charge of creating the badges page that users can earn while using the app, creating the SQL database schema & took over code integration in the 2nd half of our time working on the project",

        problem: "We wanted to ease the search for people with the necessary skills to learn from them. ",

        solution: "Our solution is to make every user profile explicitly state what skills they can teach, & what they seek to learn. These can be searched for by other users & clarified through a Chat function.",

        learning: "I learned how to add multiple conditional statements as well as how to implement SQL statements to ensure information is passed to a database."
    },

    {
        slug: "devops-nightmare",
        title: "SharePlate",
        category: "Web Application",
        description: "An application for the planning of meal donation, inventory & delivery to registered needy families", 
        technologies: ["React", "Javascript", "CSS", "Docker", "Ansible", "Kubernetes"],
        image: "/images/nightmare.png",
        githubURL: "https://github.com/25039766-AmirBak/C270-DevOps-FinalProject",

        overview: "An application designed to help centralise the process of Food Donation & Delivery",

        role: "I was in charge of Authentication & Authorisation, hashing passwords & restricting user access based on roles. I created the Login, Register & Admin pages & afterward created Ansible files to automate the process of deploying Docker files",

        problem: "We needed to create a project that was both helpful to the community & could be used to apply DevOps practices. We were inspired by other meal sharing apps to do our own one",

        solution: "We chose to make the app 1 centralized platform where Donors, Recipients & Volunteers could organise, with pages specialised & restricted to each of their roles. Admins could keep track of site activity on their own page",

        learning: "I learned how to hash password well in advance of coursework, the use of many Secret Keys within a file & how to encrypt them. I learnt how to integrate Ansible into a CI/CD Pipeline & this was the project where I started getting used to Github."
    },

    {
        slug: "WIP",
        title: "Work In Progress",
        category: "all",
        description: "This is a Work In Progress, Come Back Later",
        technologies: ["None, this is a Work In Progress"],
        image: "/images/project4.jpg",

        overview: "A work in progress",

        role: "Designed and developed the portfolio website.",

        problem: "<!-- Explain why you decided to create this portfolio. -->",

        solution: "<!-- Describe the website's pages and functionality. -->",

        learning: "<!-- Describe what you learned while building this website. -->"
    }
];


// ============PORTFOLIO OVERVIEW ROUTE===========

app.get("/portfolio", (req, res) => {
    res.render("portfolio", {
        activePage: "portfolio",
        projects: projects
    });
});


// ==========INDIVIDUAL PROJECT ROUTE===========

app.get("/projects/:slug", (req, res) => {

    const project = projects.find(
        p => p.slug === req.params.slug
    );

    if (!project) {
        return res.status(404).send("Project not found.");
    }

    res.render("project-detail", {
        activePage: "portfolio",
        project: project
    });

});

/* CONTACT PAGE */

app.get("/contact", (req, res) => {

    res.render("contact", {
        activePage: "contact",
        success: false,
        error: null
    });

});


/* HANDLE CONTACT FORM SUBMISSION */

app.post("/contact", (req, res) => {

    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {

        return res.status(400).render("contact", {
            activePage: "contact",
            success: false,
            error: "Please complete all fields."
        });

    }

    // For now, display submitted information in the terminal
    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // Display success message
    res.render("contact", {
        activePage: "contact",
        success: true,
        error: null
    });

});

// ================= START SERVER =================

app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
});
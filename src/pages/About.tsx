import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const sections = [
  {
    text: "This study investigates the trace element composition of stylasterid corals across various oceanic conditions. The data is visualized using interactive plots and maps.",
    image: "/about_images/profile_pic.JPG",
    imageAlt: "Stylasterid coral",
    imagePosition: "left",
    externalLink: 'https://www.bristol.ac.uk/people/person/Jackson-Vaughn-0d10fb9c-fe30-401e-b520-6910f64ece4c/'
  },
    {
    text: (
        <>
        Coral samples were collected across multiple depths and analyzed for Mg/Ca, Sr/Ca, and Li/Ca ratios to develop temperature proxies. Learn more at the{' '}
        <a href="https://www.bristol.ac.uk/people/person/Erica-Hendy-cb26a7a9-0d97-4b19-9f9f-7d295682af62/" target="_blank" rel="noopener noreferrer">
            research website
        </a>. Hi
        </>
    ),
    image: "/about_images/coral_pic.jpg",
    imageAlt: "Sampling site",
    imagePosition: "right",
    linkTo: '/map',
    },
  {
    text: "Interactive plots allow for exploration of spatial patterns in trace elements and their correlation with environmental variables like temperature and salinity.",
    image: "/about_images/strom_pic.png",
    imageAlt: "Data visualization",
    imagePosition: "left",
    pdfLink: "/pdfs/VaughnThesis.pdf",
  },
  {
    text: "For full details, you can view the research PDF linked below.",
    image: "/about_images/cv_icon.jpg",
    imageAlt: "PDF link",
    imagePosition: "right",
    pdfLink: "/pdfs/CV_website.pdf",
  },
];
const About: React.FC = () => {
    useEffect(() => {
    document.title = 'About Jackson';
    }, []);

  return (
    <div className="about-container">
      <h1>About This Project</h1>

      {sections.map((section, index) => (
        <div key={index} className={`about-section ${section.imagePosition === 'right' ? 'reverse' : ''}`}>
                <div className="about-image-wrapper">
                {section.externalLink ? (
                    <a href={section.externalLink} target="_blank" rel="noopener noreferrer">
                    <img src={section.image} alt={section.imageAlt} className="about-image" />
                    </a>
                ) : section.linkTo ? (
                    <Link to={section.linkTo}>
                    <img src={section.image} alt={section.imageAlt} className="about-image" />
                    </Link>
                ) : section.pdfLink ? (
                    <a href={section.pdfLink} target="_blank" rel="noopener noreferrer">
                    <img src={section.image} alt={section.imageAlt} className="about-image" />
                    </a>
                ) : (
                    <img src={section.image} alt={section.imageAlt} className="about-image" />
                )}
                </div>
            <div className="about-text">
            {typeof section.text === 'string' ? <p>{section.text}</p> : section.text}
            </div>
        </div>
        ))}
    </div>
  );
};

export default About;

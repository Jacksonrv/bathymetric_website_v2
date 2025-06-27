import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const sections = [
  {
    text: (
        <>
        Hello! My name is Jackson Vaughn, I am currently a Master's by Research student at the {' '}
        <a href="https://www.bristol.ac.uk/earthsciences/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            University of Bristol
        </a>. I hold a Bachelor's of Science from {' '}
        <a href="https://constructor.university/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Constructor University
        </a>{' '} (formerly Jacobs University Bremen). I love research, coding, and the ocean. This website is one of my all too many side projects.
        </>
    ),
    image: "/about_images/profile_pic.JPG",
    imageAlt: "Stylasterid coral",
    imagePosition: "left",
    externalLink: 'https://www.bristol.ac.uk/people/person/Jackson-Vaughn-0d10fb9c-fe30-401e-b520-6910f64ece4c/'
  },
    {
    text: (
        <>
        My Master's project focuses on the development of stylasterids (an under-researched family of deep-sea coral) as paleoproxies under the supervision of {' '}
        <a href="https://www.bristol.ac.uk/people/person/Joseph-Stewart-cb3e25bd-4ef7-4272-beb9-61efd81c301a/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Dr. Joe Stewart
        </a>, {' '}
        <a href="https://www.bristol.ac.uk/people/person/Erica-Hendy-cb26a7a9-0d97-4b19-9f9f-7d295682af62/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Dr. Erica Hendy
        </a>, and{' '}
        <a href="https://www.bristol.ac.uk/people/person/Laura-Robinson-8666f5c1-a1ae-4e00-a1ec-c1e8748bf41c/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Prof. Dr. Laura Robinson
        </a>. My work follows in the footsteps of {' '}
        <a href="https://schmidtocean.org/person/james-kershaw/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Dr. James Kershaw
        </a>, who investigated stylasterids from the global ocean. I have analyzed the trace element composition of 61 stylasterid corals from the Galapagos Islands using ICP-MS. 
        These corals were collected from {' '}
        <a href="https://www.whoi.edu/what-we-do/explore/ships/ships-atlantis/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            R/V Atlantis
        </a> and {' '}
        <a href="https://oceanexplorer.noaa.gov/technology/vessels/falkor/falkor.html" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            R/V Falkor
        </a> cruises in 2023. I am comparing trace element data to hydrographic data to assess the potential of these corals as paleoproxies, and infer biomineralization mechanisms.
        In particular, I am assessing Li/Mg and Sr/Ca as temperature proxies, Ba/Ca as a nutrient proxy, their mineralogy using Mg/Ca, and geochemical differences between species
        and coral part.
        </>
    ),
    image: "/about_images/coral_pic.jpg",
    imageAlt: "Sampling site",
    imagePosition: "right",
    linkTo: '/map',
    },
  {
    text: (
        <>
        My Bachelor's thesis focused on assessing the potential for stromatolites to capture the REY signature of the surrounding water and sediment, to determine 
        their potential as proxies. My supervisors were {' '}
        <a href="https://constructor.university/faculty-member/michael-bau" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Prof. Dr. Michael Bau
        </a> and {' '}
        <a href="https://ut.ee/en/employee/timmu-kreitsmann" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            Dr. Timmu Kreitsmann
        </a>. To view my Bachelor's thesis, click the stromatolite.
        </>
    ),
    image: "/about_images/strom_pic.png",
    imageAlt: "Data visualization",
    imagePosition: "left",
    pdfLink: "/pdfs/VaughnThesis.pdf",
  },
  {
    text: (
        <>
        I am currently in search of a PhD position. If you are located in Germany, and in search of a motivated PhD student in the field of geochemistry, take a look at my{' '}
        <a href="/pdfs/CV_website.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            CV
        </a>. 
        </>
    ),
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
      <h1>About Me</h1>

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

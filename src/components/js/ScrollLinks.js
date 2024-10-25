import { Link } from 'react-scroll';

function ScrollLinks() {
  return (
    <nav>
      <Link to="presentation" smooth={true} duration={500}>
        Presentation
      </Link>
      <Link to="skills" smooth={true} duration={500}>
        Skills
      </Link>
      <Link to="experience" smooth={true} duration={500}>
        Experience
      </Link>
      <Link to="education" smooth={true} duration={500}>
        Education
      </Link>
      <Link to="contact" smooth={true} duration={500}>
        Contact
      </Link>
      <Link to="posts" smooth={true} duration={500}>
        Posts
      </Link>
    </nav>
  );
}

// import IntervalFlowLogo from '../../common/IntervalFlowLogo/IntervalFlowLogo';
import RunnerIcon from '../../common/IntervalFlowLogo/RunnerIcon';
import styles from './Header.module.css';
// import { Github, Linkedin } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Info } from 'lucide-react';


// const links = [
//   { name: 'GitHub', icon: <Github />, url: 'https://github.com/AnnetDev' },
//   { name: 'LinkedIn', icon: <Linkedin />, url: 'https://www.linkedin.com/in/anna-baidikova/' }
// ]

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerIcon}>
        <RunnerIcon />
        Interval Flow
      </div>

      <div className={styles.info}>
        {/* <p className={styles.buildLabel}>Built by</p> */}
        {/* {links.map((item) => {
          return (
            <Link to={item.url} target="_blank" className={styles.link} key={item.name}>
              {item.icon}
            </Link>
          )
        })} */}
      </div>
    </header>
  );
}

export default Header;
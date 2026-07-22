import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import { IoCameraOutline, IoHomeOutline } from 'react-icons/io5';

const NotFoundPage = () => {
  return (
    <>
      <SEO title="Page Not Found | AJ Studio" />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-neutral-950 px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <IoCameraOutline className="w-10 h-10" />
          </div>
          <h1 className="text-6xl font-extrabold gold-gradient-text">404</h1>
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
            Out of Focus
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The page or photograph you are searching for does not exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="gold" className="inline-flex items-center gap-2">
              <IoHomeOutline className="w-4 h-4" />
              Return To Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

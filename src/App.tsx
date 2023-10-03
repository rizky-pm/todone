import Main from './pages/Main';
import Navbar from './components/Navbar';

import SplashScreen from './components/SplashScreen';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import Footer from './components/Footer';

const App = () => {
  const { isLoading } = useFirebaseAuth();

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          <Navbar />
          <Main />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;

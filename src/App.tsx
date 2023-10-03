import Main from './pages/Main';
import Navbar from './components/Navbar';

import SplashScreen from './components/SplashScreen';
import useFirebaseAuth from './hooks/useFirebaseAuth';

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
        </>
      )}
    </>
  );
};

export default App;

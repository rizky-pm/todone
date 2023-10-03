import styled from '@emotion/styled';

import { Typography } from '@mui/material';

const StyledSplashScreen = styled.section`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
`;

const SplashScreen = () => {
  return (
    <StyledSplashScreen>
      <Typography variant='h4' fontWeight={600}>
        Loading ...
      </Typography>
    </StyledSplashScreen>
  );
};

export default SplashScreen;

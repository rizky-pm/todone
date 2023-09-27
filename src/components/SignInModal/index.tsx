import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styled from '@emotion/styled';

import SignInForm from '../SignInForm';
import useUiStore from '../../state/ui/uiStore';

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 32px;
  text-align: center;
`;

const SignInModal = () => {
  const { isSignInModalOpen, setIsSignInModalOpen } = useUiStore();

  const handleCloseModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isSignInModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isSignInModalOpen}>
        <StyledModal>
          <SignInForm />
        </StyledModal>
        {/* <Box sx={style}>
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='transition-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
      </Fade>
    </Modal>
  );
};

export default SignInModal;

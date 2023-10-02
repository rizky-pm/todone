import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styled from '@emotion/styled';

import useUiStore from '../../state/ui/uiStore';
import SignUpForm from '../SignUpForm';

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
  border-radius: 8px;

  @media ${(props) => props.theme.mediaQueries.xs} {
    width: 85%;
  }
`;

const SignUpModal = () => {
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useUiStore();

  const handleCloseModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isSignUpModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isSignUpModalOpen}>
        <StyledModal>
          <SignUpForm />
        </StyledModal>
      </Fade>
    </Modal>
  );
};

export default SignUpModal;

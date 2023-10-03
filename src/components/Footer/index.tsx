import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 0 0 1rem 0;
  font-weight: 400;
  font-size: 0.875rem;

  .link {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    transition: all 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primaryDark};
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Coded by{' '}
        <a
          href='https://rizky-pm.github.io/portofolio/'
          target='_blank'
          className='link'
        >
          Rizky Putra Mahendra
        </a>{' '}
        with 🔥{' '}
      </p>
    </StyledFooter>
  );
};

export default Footer;

import styled from '@emotion/styled';

const Button = styled('buttton')`
  border-radius: 4px;
  background-color: ${p => p.bg || '#2B3038' };
  color: ${p => p.fg || '#ffffff' };
  border: none;
  padding: .65em 1.5em;
  font-size: .7rem;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
import { StyledIcon } from './Styles';

const Icon = ({ children, ...iconProps }) => (
  <StyledIcon {...iconProps}>{children}</StyledIcon>
);

export default Icon;

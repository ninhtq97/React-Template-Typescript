import Spinner from './Spinner';
import { StyledPlaceholderLoading } from './Styles';

const PlaceholderLoading = () => (
  <StyledPlaceholderLoading>
    <Spinner size={70} />
  </StyledPlaceholderLoading>
);

export default PlaceholderLoading;

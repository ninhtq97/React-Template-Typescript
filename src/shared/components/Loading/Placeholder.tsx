import Spinner from './Spinner';
import { StyledPlaceholderLoading } from './styles';

const PlaceholderLoading = () => (
  <StyledPlaceholderLoading>
    <Spinner size={70} />
  </StyledPlaceholderLoading>
);

export default PlaceholderLoading;

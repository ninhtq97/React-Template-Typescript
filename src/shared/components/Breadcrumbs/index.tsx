import { FC, Fragment } from 'react';
import { Container, Divider } from './Styles';

type Props = {
  items: string[];
};

const Breadcrumbs: FC<Props> = ({ items }) => (
  <Container>
    {items.map((item, index) => (
      <Fragment key={item}>
        {index !== 0 && <Divider>/</Divider>}
        {item}
      </Fragment>
    ))}
  </Container>
);

export default Breadcrumbs;

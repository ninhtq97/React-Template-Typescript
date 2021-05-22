import { SearchOutline } from '@styled-icons/evaicons-outline';
import { Fragment, useState } from 'react';
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';
import InputDebounce from 'shared/components/Input/Debounce';
import Select from 'shared/components/Select';
import 'shared/styles/font.css';
import GlobalStyles from 'shared/styles/global';

enum DefaultStatus {
  ALL = 'all',
}

enum CommonStatus {
  CANCEL = 'cancel',
  PAUSE = 'pause',
  WAITING = 'waiting',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}

const CommonStatusView = {
  [DefaultStatus.ALL]: 'Tất cả',
  [CommonStatus.CANCEL]: 'Hủy',
  [CommonStatus.PAUSE]: 'Tạm dừng',
  [CommonStatus.WAITING]: 'Đang chờ',
  [CommonStatus.PROCESSING]: 'Đang thực hiện',
  [CommonStatus.COMPLETED]: 'Hoàn thành',
};

const commonStatusOptions = () => {
  return Object.values(CommonStatus).map((status) => ({
    label: CommonStatusView[status],
    value: status,
  }));
};

function App() {
  const [status, setStatus] = useState();

  const onChange = (data) => {
    setStatus(data);
  };

  return (
    <Fragment>
      <GlobalStyles />
      <Select
        value={status}
        placeholder="Trạng thái"
        onChange={onChange}
        loadOptions={commonStatusOptions}
      />
      <div style={{ marginTop: 8 }}>
        <Button style={{ marginRight: 8 }}>Default Secondary Button</Button>
        <Button variant="primary" style={{ marginRight: 8 }}>
          Primary Button
        </Button>
        <Button variant="success" style={{ marginRight: 8 }}>
          Success Button
        </Button>
        <Button variant="warning" style={{ marginRight: 8 }}>
          Warning Button
        </Button>
        <Button variant="danger">Danger Button</Button>
      </div>
      <div style={{ marginTop: 8 }}>
        <Input placeholder="Input normal" />
      </div>
      <div style={{ marginTop: 8 }}>
        <Input
          icon={<SearchOutline size={18} />}
          placement="left"
          placeholder="Input icon left"
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <Input
          icon={<SearchOutline size={18} />}
          placement="right"
          placeholder="Input icon right"
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <InputDebounce
          value=""
          onChange={() => {}}
          placeholder="Input debounce"
        />
      </div>
    </Fragment>
  );
}

export default App;

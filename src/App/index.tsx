import { SearchOutline } from '@styled-icons/evaicons-outline';
import { Fragment, useState } from 'react';
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';
import InputDebounce from 'shared/components/Input/Debounce';
import Select from 'shared/components/Select';
import SelectTrial from 'shared/components/SelectTrial';
import 'shared/styles/font.css';
import GlobalStyles from 'shared/styles/global';
import {
  ModalRenderContentProps,
  ModalRenderLinkProps,
} from 'shared/types/modal';
import Modal from '../shared/components/Modal';

enum CommonStatus {
  CANCEL = 'cancel',
  PAUSE = 'pause',
  WAITING = 'waiting',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}

const CommonStatusView = {
  [CommonStatus.CANCEL]: 'Hủy',
  [CommonStatus.PAUSE]: 'Tạm dừng',
  [CommonStatus.WAITING]: 'Đang chờ',
  [CommonStatus.PROCESSING]: 'Đang thực hiện',
  [CommonStatus.COMPLETED]: 'Hoàn thành',
};

const commonStatusOptions = () => {
  return Object.values(CommonStatus).map((status: string) => ({
    label: CommonStatusView[status],
    value: status,
  }));
};

function App() {
  const [status, setStatus] = useState();

  const onChange = (data) => {
    setStatus(data);
  };

  const statusOptions = commonStatusOptions();
  const [options, setOptions] = useState(statusOptions);

  return (
    <Fragment>
      <GlobalStyles />
      <SelectTrial
        value={status}
        placeholder="Trạng thái"
        onChange={onChange}
        loadOptions={commonStatusOptions}
      />
      <Select
        options={options}
        onCreate={(newOptionLabel: string, callback) => {
          const value = 'exist';
          const option = { label: newOptionLabel, value };

          setOptions((prev) => [...prev, option]);
          callback(value);
        }}
      />

      <Modal
        renderLink={({ open }: ModalRenderLinkProps) => (
          <Button variant="primary" onClick={open}>
            Show Modal
          </Button>
        )}
        renderContent={({ close }: ModalRenderContentProps) => (
          <div>Modal Content</div>
        )}
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

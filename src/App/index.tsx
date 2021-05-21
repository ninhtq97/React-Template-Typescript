import { Fragment, useState } from 'react';
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
    </Fragment>
  );
}

export default App;

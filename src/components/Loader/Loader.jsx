import { InfinitySpin } from 'react-loader-spinner';
import s from './Loader.module.css'


const Loading = () => {
  return (
    <InfinitySpin
      className={s.loader}
      width="200"
      color="#4fa94d"
    />
  );
};

export default Loading;

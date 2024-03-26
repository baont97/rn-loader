import React, {
  useContext,
  useState,
  useCallback,
  type PropsWithChildren,
} from 'react';
import { LoaderContent, type TLoaderContentProps } from './loader-content';

type TLoaderContext = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
};

const defaultValue: TLoaderContext = {
  isVisible: false,
  show: () => {},
  hide: () => {},
};

const context = React.createContext<TLoaderContext>(defaultValue);
const useLoader = () => useContext(context);

type TLoaderProviderProps = {
  loaderProps?: Omit<TLoaderContentProps, 'visible'>;
} & PropsWithChildren;

const LoaderProvider: React.FC<TLoaderProviderProps> = (props) => {
  const { children, loaderProps } = props;
  const { Provider } = context;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  return (
    <Provider value={{ isVisible, show, hide }}>
      {children}
      <LoaderContent {...loaderProps} visible={isVisible} />
    </Provider>
  );
};

export { useLoader, LoaderProvider };

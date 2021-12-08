import React, {
  FC,
  ChangeEventHandler,
  useCallback,
  ChangeEvent,
  ReactElement,
  cloneElement,
  useMemo,
  useRef,
} from 'react';

interface Prop {
  accept?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
  children: ReactElement;
}

const FileSelect: FC<Prop> = (props) => {
  const { children, accept = 'image/*', onChange, onClick } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }, [onChange]);
  const child = useMemo(() => {
    return cloneElement(children, {
      onClick() {
        inputRef.current?.click();
        if (typeof onClick === 'function') {
          onClick();
        }
      },
    });
  }, [children, onClick]);

  return (
    <>
      {child}
      <input ref={inputRef} style={{ display: 'none' }} type="file" onChange={handleChange} accept={accept}/>
    </>
  );
};

export { FileSelect };

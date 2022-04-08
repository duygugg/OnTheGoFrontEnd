import React, {useState} from 'react';

export const RegisterFormContext = React.createContext();

const RegisterFormContextProvider = props => {
  const [formFilled, IsformFilled] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  const [registerBtnClicked,setRegisterBtnClicked] = useState(false);

  return (
    <RegisterFormContext.Provider
      value={{
        formData: [formFilled, IsformFilled],
        clickedData: [clickedNext, setClickedNext],
        registerBtnData:[registerBtnClicked, setRegisterBtnClicked]
      }}>
      {props.children}
    </RegisterFormContext.Provider>
  );
};

export default RegisterFormContextProvider;

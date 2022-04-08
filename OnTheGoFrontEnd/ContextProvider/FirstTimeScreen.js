import React from 'react';

const firstTimeContex = React.createContext();

const FirstTimeContexProvider = props => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);

//   const updateFirstTime = () => {
//     setIsFirstLaunch(!isFirstLaunch);
//   };
//   React.useEffect(() => {
//     updateFirstTime();
//     console.log("launch? ",isFirstLaunch)
//   }, []);

  return (
    <firstTimeContex.Provider value={[isFirstLaunch, setIsFirstLaunch]}>
      {props.children}
    </firstTimeContex.Provider>
  );
};

export default FirstTimeContexProvider;
const debounce = (func,delay=1000) => {
    let timeOutId;
    return (...args) => {
      // if timeOut is not defined mean input is null
      if (timeOutId) {
        // remove old time out
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
         func.apply(null,args);
       }, delay);
    };
  };